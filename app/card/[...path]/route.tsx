import { ImageResponse } from "next/og";
import { cardPaths, socialCard } from "@/lib/social-cards";

// One share card per page, at /card/<page path>. Only paths in the card registry render, so the domain cannot be
// made to draw arbitrary text. A post's card exists from its date; the route is regenerated hourly like the post.
export const revalidate = 3600;

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
  if (!card) return new Response("Not found", { status: 404 });
  const titleSize = card.title.length > 70 ? 54 : card.title.length > 44 ? 64 : 76;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: BG, color: INK, padding: "64px 72px", borderLeft: `12px solid ${SIGNAL}` }}>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: SIGNAL }}>{card.kicker}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: titleSize, lineHeight: 1.12, fontWeight: 600 }}>{card.title}</div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.35, color: MUTED, marginTop: 28 }}>{clip(card.description, 150)}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: MUTED }}>Jason Cook Design · jasoncookdesign.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
