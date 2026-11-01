import fs from "fs";
import path from "path";
import { isPublished, type Post } from "@/lib/writing";

/** One JSON file per post. Server-only: this module reads the file system. */
const POSTS_DIR = path.join(process.cwd(), "data", "posts");

const REQUIRED: Array<[keyof Post, (v: unknown) => boolean]> = [
  ["slug", (v) => typeof v === "string" && v.length > 0],
  ["title", (v) => typeof v === "string" && v.length > 0],
  ["date", (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v)],
  ["tags", Array.isArray],
  ["excerpt", (v) => typeof v === "string"],
  ["content", Array.isArray],
];

/** Oldest first, ties by slug, so the order never depends on file names. */
export function loadPosts(dir: string): Post[] {
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
      if (`${post.slug}.json` !== file) throw new Error(`${file}: slug "${post.slug}" must match the file name`);
      return post;
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));
}

/** Every post on disk, published or not. Pages use publishedPosts(). */
export const posts: Post[] = loadPosts(POSTS_DIR);

/** The posts whose date has arrived, evaluated at call time. */
export const publishedPosts = (now: Date = new Date()): Post[] => posts.filter((p) => isPublished(p, now));
