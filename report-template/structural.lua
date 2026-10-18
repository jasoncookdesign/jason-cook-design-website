-- Structural Markdown filter: maps custom blocks to lib.typ calls and lints authoring limits.

local function warn(msg) io.stderr:write("LINT: " .. msg .. "\n") end

local function typ(inlines)
  local s = pandoc.write(pandoc.Pandoc({ pandoc.Plain(inlines) }), "typst")
  return (s:gsub("%s+$", ""))
end

local function raw(s) return pandoc.RawBlock("typst", s) end

local function wrap(open, blocks, close)
  local out = { raw(open) }
  for _, b in ipairs(blocks) do out[#out + 1] = b end
  out[#out + 1] = raw(close)
  return out
end

function Header(h)
  if h.level == 2 and select(2, pandoc.utils.stringify(h.content):gsub("%S+", "")) > 22 then
    warn("action title over 22 words: " .. pandoc.utils.stringify(h.content):sub(1, 60))
  end
end

function Table(t)
  local n = #t.colspecs
  if n < 2 then return end
  local first = n > 2 and 0.3 or 0.5
  for i, spec in ipairs(t.colspecs) do
    spec[2] = (i == 1) and first or (1 - first) / (n - 1)
  end
  return t
end

function HorizontalRule() return pandoc.RawBlock("typst", "#pagebreak(weak: true)") end

function Str(s)
  local pre, kind, post = s.text:match("^(%p*)%[(%a+)%](%p*)$")
  if kind == "Observed" or kind == "Inference" or kind == "Speculation" or kind == "Unverified" then
    return { pandoc.Str(pre), pandoc.RawInline("typst", '#chip("' .. kind .. '")'), pandoc.Str(post) }
  end
end

function Para(p)
  local n = select(2, pandoc.utils.stringify(p.content):gsub("%S+", ""))
  if n > 120 then warn("paragraph over 120 words: " .. pandoc.utils.stringify(p.content):sub(1, 50)) end
  local first = p.content[1]
  if first and first.t == "Strong" then
    local lw = select(2, pandoc.utils.stringify(first.content):gsub("%S+", ""))
    if lw > 8 then warn("lead-in over 8 words") end
    local rest = {}
    for i = 2, #p.content do rest[#rest + 1] = p.content[i] end
    local out = { pandoc.RawInline("typst", "#leadin[" .. typ(first.content) .. "]") }
    for _, r in ipairs(rest) do out[#out + 1] = r end
    return pandoc.Para(out)
  end
end

local function read_csv(path)
  -- sidecar annotation coordinates are read by typst; this only checks existence
  local f = io.open(path, "r")
  if f then f:close() return true end
  return false
end

function Div(d)
  local cls = d.classes[1]
  if cls == "governing" then
    return wrap("#governing[", d.content, "]")
  elseif cls == "insight" then
    local n = select(2, pandoc.utils.stringify(d.content):gsub("%S+", ""))
    if n > 60 then warn("insight over 60 words (" .. n .. ")") end
    return wrap("#insight[", d.content, "]")
  elseif cls == "note" then
    return wrap("#note[", d.content, "]")
  elseif cls == "stats" then
    local items = {}
    for _, b in ipairs(d.content) do
      if b.t == "BulletList" then
        for _, item in ipairs(b.content) do
          local para = item[1]
          local val = para.content[1]
          if not val or val.t ~= "Strong" then warn("stats item needs a bold value: " .. pandoc.utils.stringify(para):sub(1, 40)) goto continue end
          local label = {}
          for i = 2, #para.content do label[#label + 1] = para.content[i] end
          items[#items + 1] = "([" .. typ(val.content) .. "], [" .. typ(label) .. "])"
          ::continue::
        end
      end
    end
    if #items == 0 then warn("empty stats block") return {} end
    return raw("#stats((" .. table.concat(items, ", ") .. ",))")
  elseif cls == "exhibit" then
    local blocks = d.content
    local title, source = blocks[1], blocks[#blocks]
    if #blocks < 2 or title.t ~= "Para" then warn("exhibit must start with a title paragraph") return d.content end
    if not (source.t == "Para" and pandoc.utils.stringify(source):match("^Source")) then
      warn("exhibit has no trailing Source: paragraph")
      source = pandoc.Para({})
    else
      table.remove(blocks)
    end
    table.remove(blocks, 1)
    return wrap("#exhibit([" .. typ(title.content) .. "], [" .. typ(source.content) .. "])[", blocks, "]")
  elseif cls == "figure" then
    local src = d.attributes["src"]
    if not src then warn("figure missing src") return {} end
    local alt = d.attributes["alt"]
    if not alt or alt == "" then warn("figure missing alt text: " .. tostring(src)) end
    local tier = d.attributes["width"] or "full"
    local sidecar = src:gsub("%.%w+$", ".notes.csv")
    local has_sidecar = read_csv(sidecar)
    if not has_sidecar then warn("figure sidecar missing: " .. sidecar) end
    local caption, items = {}, {}
    for _, b in ipairs(d.content) do
      if b.t == "Para" and #caption == 0 then caption = b.content
      elseif b.t == "OrderedList" then
        for _, item in ipairs(b.content) do items[#items + 1] = "[" .. typ(item[1].content) .. "]" end
      end
    end
    if #items == 0 then warn("figure has no numbered annotation list") end
    if tier ~= "full" and tier ~= "two-thirds" and tier ~= "half" then warn("figure width must be full, two-thirds or half: " .. tier) end
    local coords = has_sidecar and ('csv("' .. sidecar .. '")') or "()"
    return raw(string.format('#ui-figure("%s", "%s", "%s", [%s], (%s), %s)',
      src, (alt or ""):gsub('"', '\\"'), tier, typ(caption), #items > 0 and (table.concat(items, ", ") .. ",") or "", coords))
  end
end
