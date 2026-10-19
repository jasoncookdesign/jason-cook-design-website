#!/usr/bin/env bash
# Fails if any term from $CLIENT_TERMS_FILE appears in a tracked file or under .sdlc/.
# Run it after `git add` of every new file: it reads `git ls-files`, so untracked files outside .sdlc are not scanned.
# Prints file:line for each hit and never the term itself. Works with bash 3.2 and BSD tools.
if [ -z "${CLIENT_TERMS_FILE:-}" ]; then
  echo "CLIENT_TERMS_FILE is not set" >&2
  exit 2
fi
if [ ! -f "$CLIENT_TERMS_FILE" ] || [ ! -r "$CLIENT_TERMS_FILE" ]; then
  echo "CLIENT_TERMS_FILE is not a readable file" >&2
  exit 2
fi

patterns=$(mktemp "${TMPDIR:-/tmp}/terms.XXXXXX") || exit 2
trap 'rm -f "$patterns"' EXIT

# Drop CR, trailing whitespace, blank lines, and # comment lines.
tr -d '\r' < "$CLIENT_TERMS_FILE" | sed -e 's/[[:space:]]*$//' | grep -v -e '^$' -e '^#' > "$patterns"
if [ ! -s "$patterns" ]; then
  echo "CLIENT_TERMS_FILE holds no terms" >&2
  exit 2
fi

hits=0
scan() {
  local f="$1" n
  [ -f "$f" ] || return 0
  for n in $(grep -n -I -i -F -f "$patterns" -- "$f" | cut -d: -f1); do
    echo "$f:$n"
    hits=1
  done
}

while IFS= read -r -d '' f; do
  case "$f" in .sdlc/*) continue ;; esac
  scan "$f"
done < <(git ls-files -z)

if [ -d .sdlc ]; then
  while IFS= read -r -d '' f; do
    scan "$f"
  done < <(find .sdlc -type f -print0)
fi

if [ "$hits" -ne 0 ]; then
  echo "client term match found (see file:line above)" >&2
  exit 1
fi
exit 0
