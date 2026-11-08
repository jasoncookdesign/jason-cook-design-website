import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { cardPaths, socialCard } from "@/lib/social-cards";

// One share card per page, at /card/<page path>. Only paths in the card registry render, so the domain cannot be
// made to draw arbitrary text. A post's card exists from its date; the route is regenerated hourly like the post.
export const revalidate = 3600;

// Newsreader is the site's serif; the files are vendored in lib/fonts (ImageResponse cannot read WOFF2).
const FONTS = join(process.cwd(), "lib/fonts");
const regular = readFileSync(join(FONTS, "Newsreader-Regular.woff"));
const semiBold = readFileSync(join(FONTS, "Newsreader-SemiBold.woff"));

const BG = "#0D2438";
const INK = "#E8EFF5";
const MUTED = "#A9BDCD";
const SIGNAL = "#E8723C";

const clip = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`);

export async function generateStaticParams() {
  return cardPaths().map((p) => ({ path: p.slice(1).split("/") }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const card = socialCard("/" + path.join("/"));
  if (!card) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
  const titleSize = card.title.length > 70 ? 60 : card.title.length > 44 ? 70 : 84;
  return new ImageResponse(
    (
      <div style={{ fontFamily: "Newsreader", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: BG, color: INK, padding: "64px 72px", borderLeft: `12px solid ${SIGNAL}` }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: SIGNAL, fontWeight: 600 }}>{card.kicker}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.12, fontWeight: 600 }}>{card.title}</div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.35, color: MUTED, marginTop: 28 }}>{clip(card.description, card.title.length > 70 ? 100 : 150)}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: MUTED }}>Jason Cook Design · jasoncookdesign.com</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Newsreader", data: regular, weight: 400, style: "normal" },
        { name: "Newsreader", data: semiBold, weight: 600, style: "normal" },
      ],
    }
  );
}
