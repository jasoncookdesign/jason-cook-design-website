#!/usr/bin/env bash
# Usage: build.sh input.md output.pdf   (png pages: output-{n}.png via PNG=1)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
[ $# -eq 2 ] || { echo "usage: build.sh input.md output.pdf" >&2; exit 2; }
in="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"; out="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
cd "$here"
tmp="$(mktemp "$here/.build-XXXXXX.typ")"
trap 'rm -f "$tmp"' EXIT
pandoc "$in" -f markdown-citations-raw_html -t typst --template="$here/template.typ" --lua-filter="$here/structural.lua" -o "$tmp"
typst compile --root "$here" --ignore-system-fonts --ignore-embedded-fonts --font-path "$here/fonts" "$tmp" "$out"
if [ "${PNG:-}" = 1 ]; then typst compile --root "$here" --ignore-system-fonts --ignore-embedded-fonts --font-path "$here/fonts" --ppi 110 "$tmp" "${out%.pdf}-{n}.png"; fi
