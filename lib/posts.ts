import fs from "fs";
import path from "path";
import { isPublished, type Post } from "@/lib/writing";

/** One JSON file per post. Server-only: this module reads the file system. */
const POSTS_DIR = path.join(process.cwd(), "data", "posts");

const text = (v: unknown) => typeof v === "string" && v.length > 0;
const strings = (v: unknown) => Array.isArray(v) && v.length > 0 && v.every(text);
const BLOCK_CHECKS: Record<string, (b: Record<string, unknown>) => boolean> = {
  p: (b) => text(b.html),
  h2: (b) => text(b.text),
  blockquote: (b) => text(b.html),
  ul: (b) => strings(b.items),
  ol: (b) => strings(b.items),
  img: (b) => text(b.src) && text(b.alt),
  footnotes: (b) =>
    Array.isArray(b.items) && b.items.length > 0 && b.items.every((i) => i && text(i.ref) && text(i.html)),
};

const isCalendarDate = (v: unknown): boolean => {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
};

const REQUIRED: Array<[keyof Post, (v: unknown) => boolean]> = [
  ["slug", (v) => typeof v === "string" && v.length > 0],
  ["title", (v) => typeof v === "string" && v.length > 0],
  ["date", isCalendarDate],
  ["tags", (v) => Array.isArray(v) && v.every((t) => typeof t === "string")],
  ["excerpt", (v) => typeof v === "string"],
  ["content", Array.isArray],
];

/** Oldest first, ties by slug, so the order never depends on file names. */
export function loadPosts(dir: string): Post[] {
  if (!fs.existsSync(dir)) throw new Error(`Posts folder not found: ${dir}`);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      let post: Post;
      try {
        post = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
      } catch (e) {
        throw new Error(`${file}: not valid JSON (${(e as Error).message})`);
      }
      for (const [field, ok] of REQUIRED) {
        if (!ok(post[field])) throw new Error(`${file}: missing or invalid field "${field}"`);
      }
      post.content.forEach((block, i) => {
        const b = block as unknown as Record<string, unknown>;
        const check = BLOCK_CHECKS[typeof b?.type === "string" ? b.type : ""];
        if (!check || !check(b)) {
          throw new Error(`${file}: content block ${i + 1} is not a known block with its fields`);
        }
      });
      if (`${post.slug}.json` !== file) throw new Error(`${file}: slug "${post.slug}" must match the file name`);
      return post;
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
}

/** Every post on disk, published or not. Pages use publishedPosts(). */
export const posts: Post[] = loadPosts(POSTS_DIR);

/** The posts whose date has arrived, evaluated at call time. */
export const publishedPosts = (now: Date = new Date()): Post[] => posts.filter((p) => isPublished(p, now));
