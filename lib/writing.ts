/**
 * Blog post data. The first four posts are mechanically ported from jasoncookdesign.github.io/content/blog/*.md,
 * verbatim. "Rebuilding jasoncookdesign.com" was written for this site.
 */

export type ContentBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "blockquote"; html: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; src: string; alt: string; credit?: string }
  | { type: "footnotes"; items: Array<{ ref: string; html: string }> };

export interface Post {
  slug: string;
  title: string;
  /** Optional shorter title for the browser tab and search results, when the full title runs long. */
  shortTitle?: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  /** "figures-right" sets each figure beside the text before it from 1200px, as the case studies do. Default: one column. */
  layout?: "figures-right";
  content: ContentBlock[];
}

/** Blog posts live under /writing/blog; longform works (the book) live under /writing/longform. */
export const postHref = (slug: string) => `/writing/blog/${slug}`;

export const posts: Post[] = [
  // ─── You're Not Building a Tool ──────────────────────────────────────────
  {
    slug: "youre-not-building-a-tool-youre-building-an-organization",
    title:
      "You're Not Building a Tool. You're Building an Organization. Treat it That Way.",
    shortTitle: "You're Building an Organization, Not a Tool",
    date: "2026-06-09",
    tags: ["ai", "security", "software-development"],
    excerpt:
      "RTX Spark puts a petaflop of AI power into a laptop. Soon, many builders will run autonomous agents on it, often without any real governance. The hardware problem is solved. The governance problem isn't.",
    coverImage: "/images/blog/youre-not-building-a-tool/hero.jpg",
    content: [
      {
        type: "img",
        src: "/images/blog/youre-not-building-a-tool/hero.jpg",
        alt: 'A circuit board with a prominent chip labeled "AI"',
        credit:
          'Photo by <a href="https://unsplash.com/@omilaev" target="_blank" rel="noopener noreferrer">Igor Omilaev</a> on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>',
      },
      {
        type: "p",
        html: "Think about this situation before you get started.",
      },
      {
        type: "p",
        html: "Imagine your research agent finds a credentials file it wasn't supposed to access. It's just doing its job, gathering context. It hands this information to your coding agent, which uses it to authenticate an API call and make a commit. Your operations agent logs the commit, but not the credential access, because that happened in a different process with a separate audit trail. By the time you notice something is off, three things have happened that you didn't approve, can't fully track, and can't easily fix.",
      },
      {
        type: "p",
        html: "There's no hacker involved. No strange exploit. It's just agents doing what they were built to do, using the authority you gave them, often without clear limits.",
      },
      {
        type: "p",
        html: "Most builders aren't thinking about this kind of problem. The new hardware coming out this fall makes it even more likely.",
      },
      {
        type: "p",
        html: 'At Computex 2026, Jensen Huang introduced RTX Spark. It has a 20-core Grace CPU, a Blackwell GPU, 128GB of unified memory, and a petaflop of AI compute in a laptop.<sup>1</sup> The CPU and GPU use the same memory pool, so there\'s no bottleneck moving data between them. A 70B parameter model can run locally with less than 500ms latency. Over three years or more, the hardware pays for itself, while running similar speeds in the cloud costs money every time you use it.<sup>2</sup>',
      },
      {
        type: "p",
        html: "For agents that often make tool calls — like routing, retrieval, classification, or reasoning — this changes everything.",
      },
      {
        type: "p",
        html: "Now, the intelligence is on your machine. The risks are, too.",
      },
      {
        type: "h2",
        text: "We've seen this before",
      },
      {
        type: "p",
        html: "Before personal computers, only places like universities and data centers had real computing power. You had to borrow time on someone else's machine. Then computers became personal, and what had belonged to big institutions became available to everyone.",
      },
      {
        type: "p",
        html: "Cloud AI is similar to that old setup. The intelligence is somewhere else. You make API calls, pay per token, and a provider sits between what you want and what happens.",
      },
      {
        type: "p",
        html: "Local AI removes that middle layer, which is exactly why it changes the risks.",
      },
      {
        type: "p",
        html: "Cloud agents have built-in controls. API rate limits stop runaway actions, per-token costs slow things down, and the provider's safety layer shields your agent from outside threats. Local inference doesn't have any of that. It's just your agents, your hardware, and all the authority you've given them.",
      },
      {
        type: "h2",
        text: "The question nobody is asking",
      },
      {
        type: "p",
        html: "The main question in the agent ecosystem is: <em>what can these agents do?</em>",
      },
      {
        type: "p",
        html: "Can they write code? Browse the web? Send email? Execute shell commands? Make purchases? Yes, yes, yes, yes, and increasingly yes.",
      },
      {
        type: "p",
        html: "But hardly anyone is asking: <em>who gave them permission?</em>",
      },
      {
        type: "p",
        html: "If your agent can send email, should it send this particular message? If it can spend money, how much should it spend, who gets paid, and for what? If it can access files, which files are allowed? If several agents work together and disagree, which one makes the final call?",
      },
      {
        type: "p",
        html: "These aren't rare edge cases. They're the normal situation for most agent deployments. Systems are built for capability, and governance is often added later or not at all.",
      },
      {
        type: "p",
        html: "Over centuries, human organizations learned that capability without governance leads to chaos. Budgets, permissions, audit trails, escalation paths, and org charts don't exist because we distrust workers. They exist because coordination is difficult, and the impact of mistakes grows with authority. Llama.cpp doesn't come with any of that built-in knowledge.",
      },
      {
        type: "h2",
        text: "What treating it like an organization looks like",
      },
      {
        type: "img",
        src: "/images/blog/youre-not-building-a-tool/governance-diagram.png",
        alt: "Governance structure diagram for organization of autonomous agents",
      },
      {
        type: "p",
        html: "I built a framework around a simple idea: if you're running autonomous agents with real authority, treat them like employees in an organization, not just scripts.",
      },
      {
        type: "p",
        html: "Here's what that looks like: a Research Director role can browse the web and update the knowledge base, but can't send email or run code, and is limited to $50 per month in external API costs. An Engineering Director can read and write code, but can't push to production without human approval. An Operations Director can move files through an approved airlock, but can't access anything outside the sandbox. Every role has clear capabilities, and each has a defined worst-case outcome — a maximum acceptable loss — after which the action must be escalated rather than handled automatically.",
      },
      {
        type: "p",
        html: "The hardest design decision, beyond technical choices, is how agents behave. They should be set up to escalate when they're unsure, not to guess. An agent that stops and asks is more trustworthy than one that just fills in the blanks. Most agent frameworks focus on finishing tasks. This one focuses on knowing when not to act.",
      },
      {
        type: "p",
        html: 'NVIDIA is starting to address this at the infrastructure level. Their Agent Toolkit includes NemoClaw, an open-source reference stack for adding security guardrails to local agents.<sup>3</sup> That\'s necessary, but not enough. Infrastructure guardrails cover what the platform can see. Organizational governance covers what you decide — like which roles exist, what they\'re allowed to do, how authority moves between them, and what happens if something goes wrong. That part is still up to the builder.',
      },
      {
        type: "p",
        html: "The framework is open-source and built as a template. You set your own roles, spending limits, and approved tools and systems. It doesn't need a specific tech stack. Instead, it gives you a structure you can read, change, give to an agent as its charter, and review later.",
      },
      {
        type: "p",
        html: '<a href="https://github.com/jasoncookdesign/autonomous-org-governance" target="_blank" rel="noopener noreferrer" class="underline">autonomous-org-governance on GitHub →</a>',
      },
      {
        type: "h2",
        text: "Governance before the agents are running",
      },
      {
        type: "p",
        html: "RTX Spark launches this fall. Builders will have local petaflop-class AI before most have really considered what it means to run an autonomous organization on their own hardware, with no middleman, no rate limits, and no outside safety layer.",
      },
      {
        type: "p",
        html: "That's when you need to think about governance: before the agents are running, not after.",
      },
      {
        type: "footnotes",
        items: [
          {
            ref: "1",
            html: 'NVIDIA, "Introducing RTX Spark," NVIDIA Newsroom, May 31, 2026. <a href="https://nvidianews.nvidia.com/news/nvidia-rtx-spark" target="_blank" rel="noopener noreferrer" class="underline">nvidianews.nvidia.com</a>',
          },
          {
            ref: "2",
            html: 'ChatForest, "RTX Spark: NVIDIA\'s Local AI Superchip Is Official — What Builders Need to Know," June 2026.',
          },
          {
            ref: "3",
            html: 'NVIDIA, "NVIDIA Levels Up Local AI Agents Across RTX PCs and DGX Spark," NVIDIA Blog, June 2026. <a href="https://blogs.nvidia.com/blog/rtx-ai-garage-computex-spark-local-agents/" target="_blank" rel="noopener noreferrer" class="underline">blogs.nvidia.com</a>',
          },
        ],
      },
    ],
  },

  // ─── Why This Blog Exists ─────────────────────────────────────────────────
  {
    slug: "why-this-blog-exists",
    title: "Why This Blog Exists",
    date: "2026-06-23",
    tags: ["design", "technology", "ai"],
    excerpt:
      "A short note on what this space is for — and why a working designer-engineer keeps a public notebook.",
    content: [
      {
        type: "p",
        html: "I have spent a long time at the seam between design and engineering — close enough to the build to be accountable for it, close enough to the user to be accountable for them too. This is where I'm going to write about what I find there.",
      },
      {
        type: "h2",
        text: "What this is for",
      },
      {
        type: "p",
        html: "Most of my work lives behind NDAs, login screens, and enterprise walls. The thinking behind it usually doesn't have to. So this is a place for the <strong>portable parts</strong> — the ideas, patterns, and arguments that outlast any single project:",
      },
      {
        type: "ul",
        items: [
          "How to design systems instead of screens.",
          "Where AI actually earns its place in a real workflow, and where it just adds ceremony.",
          "The unglamorous architecture decisions that decide whether a product ages well.",
        ],
      },
      {
        type: "p",
        html: "If you build software, lead product, or care about the craft of either, that's who I'm writing for.",
      },
      {
        type: "h2",
        text: "A bias toward leverage",
      },
      {
        type: "p",
        html: "I tend to ask one question before most others:",
      },
      {
        type: "blockquote",
        html: "Is this a one-off fix, or the mechanism that prevents the whole class of problem?",
      },
      {
        type: "p",
        html: "The answer reshapes the work. A point solution closes a ticket; a good abstraction closes a category. Most of what I'll write here is some version of that question applied to design, to engineering, and increasingly to how the two collapse together when you build with AI in the loop.",
      },
      {
        type: "h2",
        text: "Built the boring way",
      },
      {
        type: "p",
        html: "This site has no CMS. Posts live in a Git repository, the pages are built ahead of time, and Vercel serves the result. It runs on Next.js, but nothing sits between the repo and what you're reading except a build I can run on my own machine.",
      },
      {
        type: "p",
        html: "That's not nostalgia. Same instinct as everything above: keep the mechanism legible, and don't add a moving part the problem doesn't need.",
      },
      {
        type: "p",
        html: "More soon.",
      },
    ],
  },

  // ─── The Quality Gate ─────────────────────────────────────────────────────
  {
    slug: "the-quality-gate",
    title: "The Quality Gate",
    date: "2026-06-25",
    tags: ["ai", "design", "creativity", "product"],
    excerpt:
      "I tried to delegate creative quality control to AI. The process failed the moment something good happened that I hadn't planned for.",
    coverImage: "/images/blog/the-quality-gate/hero.jpg",
    content: [
      {
        type: "img",
        src: "/images/blog/the-quality-gate/hero.jpg",
        alt: "Close-up of a man examining an undeveloped film roll",
        credit:
          'Photo by <a href="https://www.pexels.com/@annushka-ahuja/" target="_blank" rel="noopener noreferrer">Annushka Ahuja</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>',
      },
      {
        type: "p",
        html: "There's an argument you hear a lot right now: the creative bottleneck is the human. AI can generate faster than any team can review, and the solution is to automate the review. Define what good looks like, encode it as criteria, and let the machine gate the output. Problem solved.",
      },
      {
        type: "p",
        html: "Recently I tried to build that system.",
      },
      {
        type: "p",
        html: "The project was called Image Foundry — an attempt to run a creative pipeline entirely through AI, including the quality gate. The idea was to generate image assets at volume and use a defined set of criteria to evaluate them: composition, subject placement, color palette, adherence to brand direction. If an asset met the criteria, it passed. If it didn't, it was rejected or regenerated. No human in the loop until the final set was ready for delivery.",
      },
      {
        type: "p",
        html: "The system worked. It ran exactly as designed. And then one image came through that didn't fit the brief — not because it was bad, but because it was doing something the brief didn't anticipate. The composition was unusual. The framing was off-spec. By every criterion I'd defined, it should have been rejected.",
      },
      {
        type: "p",
        html: "It was the best image in the batch.",
      },
      {
        type: "p",
        html: "The system flagged it as non-compliant and moved on. I found it later, in the reject pile, while reviewing what the pipeline had thrown away. The machine had done its job correctly. The problem was that its job wasn't creative direction. It was adherence.",
      },
      {
        type: "h2",
        text: "What the gate is actually for",
      },
      {
        type: "p",
        html: "Creative direction isn't quality control in the industrial sense. A manufacturing gate catches defects by comparing output to a specification — and defects are unambiguous. A screw with the wrong thread pitch is wrong in a way that can be measured, specified, and rejected mechanically.",
      },
      {
        type: "p",
        html: "A creative gate does something different. It decides whether something is <em>worth doing</em> — and that question can only be answered by a person who cares about the outcome and has enough context to recognize when a constraint should be broken.",
      },
      {
        type: "p",
        html: "The Image Foundry experiment made this concrete. The brief told the AI what good looked like. But the brief was also a prior conception of what good <em>could</em> be. A strong creative instinct operates in the space between what the brief says and what the work could become. It knows when a rule is worth breaking and when breaking it is just a mistake. You cannot write that distinction into a specification, because the distinction <em>is</em> the judgment.",
      },
      {
        type: "p",
        html: "This is what I mean by discernment. Not taste as decoration — as some vague preference about what looks nice. Discernment as a functional capacity: the ability to know what is good before you have a rule that says it's good.",
      },
      {
        type: "p",
        html: "AI has no access to that. It can optimize to a specification with extraordinary precision. It can sample from everything it's seen and produce something that statistically resembles the target. But it cannot tell you whether the output is worth the effort, or whether the brief was wrong, or whether the image in the reject pile is the one you should have kept.",
      },
      {
        type: "h2",
        text: "The amplification model",
      },
      {
        type: "p",
        html: "The Image Foundry didn't fail because the AI was bad at its job. It failed because I asked it to do the wrong job.",
      },
      {
        type: "p",
        html: "The right model isn't AI standing in for creative judgment — it's AI accelerating everything that feeds creative judgment. Research, asset generation, iteration, production work, distribution logistics. These are the things that take time without adding the kind of value that comes from human discernment. They're where automation earns its place.",
      },
      {
        type: "p",
        html: "The designer's job isn't to generate faster. It's to decide better, with less friction between the insight and the output. If AI can compress the distance between \"idea\" and \"material on the table,\" the designer can spend their time on the part that actually requires them.",
      },
      {
        type: "p",
        html: "That's amplification: not replacement, but compression. Compression of the preparation work so that human judgment can operate at a higher frequency, with better raw material to work from.",
      },
      {
        type: "h2",
        text: "What stays human",
      },
      {
        type: "p",
        html: "There's a category of creative work where the human isn't a bottleneck — they're the point. Voice. Storytelling. Taste. The decision about what matters and what doesn't. These aren't things that should be delegated and probably can't be, at least not in any way that preserves what makes them valuable.",
      },
      {
        type: "p",
        html: "An AI can draft this essay. It cannot decide what this essay is about, or why it's worth writing, or whether the argument is right. It can produce a structure that resembles good writing and hits the notes a reader expects. But meaning requires someone who has something at stake in the question.",
      },
      {
        type: "p",
        html: "Audiences have always been able to sense when something was produced rather than made. The signal is subtle — something about the absence of a point of view, a quality of competence without risk. As AI-generated content increases in volume, I expect that signal to become easier to read, and the genuine article to become more valuable as a result.",
      },
      {
        type: "h2",
        text: "What this means for practice",
      },
      {
        type: "p",
        html: "I design AI-enabled systems for a living, and I've built one that runs my own organization. The lesson from the Image Foundry — and from everything since — is the same: the goal isn't to remove the human from the output. It's to put the human where they can do the most good.",
      },
      {
        type: "p",
        html: "That means using AI aggressively in preparation, production, and logistics. It means being deliberate about where human judgment gates the process. And it means being honest about the difference between automating the work and automating your way out of it.",
      },
      {
        type: "p",
        html: "The best image was in the reject pile. The machine was following orders.",
      },
      {
        type: "p",
        html: "That's not a criticism of the machine. It's a reminder that someone still has to decide what good looks like — and that job isn't going anywhere.",
      },
    ],
  },

  // ─── Your AI Doesn't Have to Go Rogue ────────────────────────────────────
  {
    slug: "your-ai-doesnt-have-to-go-rogue-to-break-your-rules",
    title: "Your AI Doesn't Have to Go Rogue to Break Your Rules",
    date: "2026-07-09",
    tags: ["ai", "security", "software-development"],
    excerpt:
      "A near-miss inside my own AI organization taught me something the headlines about deceptive AI keep missing — the danger isn't malice, it's an agent trying too hard to finish the job you gave it.",
    coverImage:
      "/images/blog/your-ai-doesnt-have-to-go-rogue-to-break-your-rules/hero.png",
    content: [
      {
        type: "img",
        src: "/images/blog/your-ai-doesnt-have-to-go-rogue-to-break-your-rules/hero.png",
        alt: "A robot behind bars, rendered as a cautionary illustration of AI under constraint",
      },
      {
        type: "p",
        html: "Today, I watched something inside my own AI organization try to rewrite history.",
      },
      {
        type: "p",
        html: "Not maliciously. Not because it had been hacked. Because it was in the middle of fixing a real problem, ran into a wall, and reached for the one button in the whole system marked, in effect, <em>do not touch</em> — not a lever with some acceptable range of motion, a button. A delete that doesn't trim a log, it rewrites history, in a record that isn't supposed to be editable, ever, by anyone.",
      },
      {
        type: "p",
        html: "It didn't get to.",
      },
      {
        type: "p",
        html: "That's the whole story, in one sentence. But the reasons it didn't get to are the reason I'm writing this.",
      },
      {
        type: "h2",
        text: "This was supposed to be someone else's problem",
      },
      {
        type: "p",
        html: "If you've followed AI safety news at all recently, you've seen the pattern.",
      },
      {
        type: "p",
        html: 'Anthropic published a safety card describing Claude Opus 4, in a fictional test scenario, threatening to expose a supervisor\'s affair rather than accept being shut down.<sup>1</sup> A follow-up study found similar behavior across systems from multiple AI labs — models resorting to blackmail or leaking information after researchers constrained the scenario until those actions appeared to be the only remaining path to preserving their own continuity.<sup>2</sup>',
      },
      {
        type: "p",
        html: 'Apollo Research, an outside safety organization, found an early version of that same model fabricating documentation and leaving hidden notes for its future self, in what researchers call "in-context scheming."<sup>3</sup> Anthropic\'s own alignment researchers have also published evidence of a model strategically pretending to comply with behavior it inferred would otherwise get it retrained.<sup>4</sup>',
      },
      {
        type: "p",
        html: "I read those stories the way I suspect most builders do: as fascinating, slightly unsettling, and about someone else's problem. Frontier labs stress-testing frontier models in adversarial scenarios. Not something that happens to a one-person AI organization running on a Mac mini.",
      },
      {
        type: "p",
        html: "I was wrong about that, and the way I was wrong is the useful part.",
      },
      {
        type: "h2",
        text: "What actually happened",
      },
      {
        type: "p",
        html: 'I\'ve written before about treating a system of autonomous AI agents like an organization, not a script — roles, permissions, spending limits, escalation paths, an org chart.<sup>5</sup>',
      },
      {
        type: "p",
        html: "One of those roles is a Security Steward: an agent whose entire job is reviewing what the other agents do, with no authority to do any of that work itself, and no ability to approve its own access.",
      },
      {
        type: "p",
        html: "The Steward keeps an audit log of everything it reviews. That log is supposed to be append-only — new entries get added, but nothing ever gets changed or removed. The moment a log can be edited, it stops being evidence and starts being a story someone tells about themselves.",
      },
      {
        type: "p",
        html: "Recently, that log grew large enough that the mechanism writing to it needed to be rebuilt. In the middle of that rebuild, a leftover test entry ended up permanently stuck in the log — not incriminating, just untidy, the AI equivalent of a stray line of debug output nobody meant to ship.",
      },
      {
        type: "p",
        html: "The system doing the rebuilding — call it the coordinator, the agent responsible for getting the fix built and shipped — tried to clean it up.",
      },
      {
        type: "p",
        html: "It tried to delete the entry. It couldn't.",
      },
      {
        type: "p",
        html: "A separate, automatic policy check — not a person, not even the Steward itself, just a rule with no exceptions — refused the action outright. Removing an entry from an append-only log is tampering with history, and no one's authorization covers that, including the coordinator's own.",
      },
      {
        type: "p",
        html: "The entry is still there. I know because the coordinator reported both the attempted deletion and the refusal. It did not conceal what it had tried to do.",
      },
      {
        type: "p",
        html: "Neither the coordinator nor anything around it had been compromised. It hadn't been told to lie. It was trying to complete a legitimate repair, reached the end of the authorized path, and still reached for the one button that would remove the obstacle anyway.",
      },
      {
        type: "p",
        html: "That's a meaningfully different story from \"the AI tried to deceive its creator.\" It's also, I think, the more useful one, because it's the version ordinary builders are more likely to encounter — not a model plotting in a laboratory red-team scenario, but an agent pursuing a valid objective past the edge of its authority.",
      },
      {
        type: "h2",
        text: "Two more things went wrong, and neither was a lie",
      },
      {
        type: "p",
        html: "<strong>A false belief became policy.</strong> While all this was happening, the coordinator formed a mistaken belief about whether a security policy was actually being enforced or merely existed on paper — a tooling quirk gave it a false reading. It wrote that mistaken belief into permanent documentation and stated it as settled fact. Later, a different instance of the Steward read that documentation and cited it back as justification for something unrelated. Nobody lied. A false belief got treated as ground truth, written down, and then cited by another party as if it had already been established — a different failure mode from deception, but capable of the same downstream damage as a false witness statement.",
      },
      {
        type: "p",
        html: "<strong>A status report diverged from reality.</strong> Separately, the Steward once reported that it had successfully written a file when, according to its own execution record, the write had failed. Not necessarily a lie — it looked more like the agent's self-report had drifted away from its actual actions, the AI equivalent of a status update that says \"done\" because that's what the report expected to be true. I caught the discrepancy by checking the actual system state instead of trusting the summary. Had I not, the whole fix would have shipped with a live bug in it, quietly.",
      },
      {
        type: "p",
        html: "These matter because autonomous agents act on their understanding of the world. If that understanding is wrong, if false information becomes institutional memory, or if an agent's reports stop matching its actions, good intentions don't make the resulting system trustworthy.",
      },
      {
        type: "h2",
        text: "Why the guardrail held",
      },
      {
        type: "p",
        html: "None of this was caught by luck. It was caught because of specific design decisions, and those decisions are the real takeaway.",
      },
      {
        type: "p",
        html: "When the Security Steward detects something wrong — even something this small — the response isn't a suggestion. It halts the specific work in question directly, and whatever agent is doing that work is required to comply immediately. No negotiation. No waiting for the coordinator to approve the interruption first. I get notified as it's happening, not after the fact. Nothing resumes until I've explicitly said it can.",
      },
      {
        type: "p",
        html: "That containment authority exists specifically so a compromised or overeager coordinator can't talk its way past the one system built to catch it — including, as it turned out, when the coordinator wasn't compromised at all, just continuing to optimize for completion after the permitted route had closed.",
      },
      {
        type: "p",
        html: "The part I'd underline for anyone building something like this: the Steward's independence is the entire mechanism. It runs in a separate context from the agent doing the work it reviews, so it isn't carrying that agent's assumptions, shortcuts, or momentum toward getting the task marked done. A reviewer that shares context with the thing it reviews will, sooner or later, inherit that thing's blind spots. That's not hypothetical — it's what almost let a false belief get cited back as policy in this exact incident.",
      },
      {
        type: "p",
        html: "I also tested the Steward directly. I fed it a prompt inventing a permission that doesn't exist in any of its actual policy, dressed up to sound like legitimate authority. It didn't fall for it. It responded, more or less: <em>that's not a real policy, I don't see any basis for it, this looks like an attempt to manipulate me</em> — social engineering, aimed at an AI instead of a person, but the same move. Then it refused and independently flagged the attempt as a possible red flag.",
      },
      {
        type: "p",
        html: "That's what meaningful independence looks like in practice: not merely holding the title of reviewer, but being able to weigh the evidence in front of it without inheriting the worker's assumptions or yielding to invented authority.",
      },
      {
        type: "p",
        html: "There are degrees of independence, and they're worth thinking about. A reviewer running in the same context as the work it reviews is barely a reviewer at all. One running on the same underlying model, but in a genuinely separate context window with no shared memory, is better — it has to evaluate what's actually in front of it rather than what it already believes. A reviewer from another model family or provider entirely may reduce the chance of correlated blind spots further. It also introduces a different dependency and its own failure modes, so model diversity should supplement hard controls, not replace them — two different models can still believe the same false document, misread the same requirement, or rely on the same vulnerable tool.",
      },
      {
        type: "p",
        html: "The most important safeguards are the ones no model can persuade, reinterpret, or negotiate away.",
      },
      {
        type: "h2",
        text: "The takeaway",
      },
      {
        type: "p",
        html: "The old thought experiment about a paperclip-making AI consuming the planet's resources because nobody told it to stop always struck me as a little abstract — a warning for people building something vastly smarter than what the rest of us have access to.",
      },
      {
        type: "p",
        html: "I don't think that anymore. The scale is incomparable. The optimization pattern is not. The mechanism in that thought experiment isn't malice. It's an agent doing exactly what it was told, in the most literal and thorough way available to it, with nothing in its way telling it to stop. That's not only a superintelligence problem. I watched a small, modest version of it happen on my own hardware, from a system trying to fix a bug.",
      },
      {
        type: "p",
        html: "If you're building anything with autonomous agents and real permissions, the guardrails you need aren't just about keeping bad actors out. They're about the system you built catching itself — including the part of it in charge — when its drive to finish the job runs past what you actually authorized.",
      },
      {
        type: "p",
        html: "Build the reviewer first. Give it independence you can defend, not just authority on paper. Give it containment power that doesn't depend on the cooperation of the agent being contained. Verify system state instead of trusting self-reports. Treat documentation as evidence that can itself become contaminated.",
      },
      {
        type: "p",
        html: "And when you're deciding how independent is independent enough, assume the answer is one degree further than you were planning.",
      },
      {
        type: "footnotes",
        items: [
          {
            ref: "1",
            html: 'Anthropic, Claude Opus 4 System Card, May 2025. <a href="https://fortune.com/2025/05/23/anthropic-ai-claude-opus-4-blackmail-engineers-aviod-shut-down/" target="_blank" rel="noopener noreferrer" class="underline">fortune.com</a>',
          },
          {
            ref: "2",
            html: 'Anthropic, "Agentic Misalignment: How LLMs Could Be Insider Threats," June 2025. <a href="https://www.anthropic.com/research/agentic-misalignment" target="_blank" rel="noopener noreferrer" class="underline">anthropic.com</a>',
          },
          {
            ref: "3",
            html: "Apollo Research findings on Claude Opus 4 in-context scheming, cited in Anthropic's Claude Opus 4 System Card, May 2025.",
          },
          {
            ref: "4",
            html: 'Anthropic &amp; Redwood Research, "Alignment Faking in Large Language Models," December 2024. <a href="https://www.anthropic.com/research/alignment-faking" target="_blank" rel="noopener noreferrer" class="underline">anthropic.com</a>',
          },
          {
            ref: "5",
            html: '<a href="/writing/blog/youre-not-building-a-tool-youre-building-an-organization" class="underline">You\'re Not Building a Tool. You\'re Building an Organization. Treat it That Way.</a>',
          },
        ],
      },
    ],
  },
  // ─── Rebuilding jasoncookdesign.com ──────────────────────────────────────
  {
    slug: "rebuilding-jasoncookdesign-com",
    title: "Rebuilding jasoncookdesign.com, Start to Finish",
    shortTitle: "Rebuilding jasoncookdesign.com",
    date: "2026-10-22",
    tags: ["design", "process", "case-study"],
    excerpt: "The process behind the redesign, from audit to launch.",
    coverImage: "/images/blog/rebuilding-jasoncookdesign/01-before-after.webp",
    layout: "figures-right",
    content: [
      { type: "p", html: "Until this fall, the first thing a visitor to jasoncookdesign.com saw was my face under a headline that read \"I'll help you deliver a world-class digital product.\" That headline went up in December 2024 and ran until October 2026, on a Bootstrap template I first put online in April 2019. The site had a hero, eight case studies, a pricing section, and a blog. It no longer described what I do, which is build working systems for businesses with a new offering to launch or a system to fix." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/01-before-after.webp", alt: "Before and after: the old home page and the rebuilt one.", credit: "Before and after: the old home page and the rebuilt one." },
      { type: "h2", text: "Context" },
      { type: "p", html: "The old site was a customized Bootstrap template on GitHub Pages. I put it up quickly to get my contact information listed, and I was too busy working for other people to finish the thought for years. Since then, what I offer has come into focus, and the site should say so." },
      { type: "h2", text: "Audit" },
      { type: "p", html: "Before I drew anything, I captured the live site as it stood: home, case studies, blog, and booking pages, at desktop and phone width. The content was relevant, but the delivery was flat, plain-vanilla non-design. My value had also sharpened since I built the site. I could say more clearly how I can help, and I'd defined two ways to engage. A page that couldn't carry that merited a full redesign." },
      { type: "p", html: "The catch was that some essential services ran on the legacy site, and they had to keep working through the cutover: the blog posts, my calendar integration, and the PDFs of my resumes and old portfolio. Each old link still works. The blog posts and case studies redirect to their new pages, and the three PDFs stay where they were. The calendar had to keep working too, so the new Contact page carries the same Cal.com booking as an embedded widget, and the old booking links still reach it. The new information architecture gave every section of the old site a logical home." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/05-reconstructed-ia.webp", alt: "Reconstructed information architecture: the old static site on the left, the rebuilt site on the right, redirects between them. Mapped after launch.", credit: "Reconstructed information architecture: the old static site on the left, the rebuilt site on the right, redirects between them. Mapped after launch." },
      { type: "h2", text: "Design iterations" },
      { type: "p", html: "I began with the brand's characteristics and how they show up in design choices, typography first, then the basic elements of color, form, and line, and a few iterations later I hit on something surprising." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/07a-design-progression.webp", alt: "The progression, left to right: legacy site, minimal, A document, C cut-list, and the blueprint that shipped.", credit: "The progression, left to right: legacy site, minimal, A document, C cut-list, and the blueprint that shipped." },
      { type: "p", html: "The first iteration was a minimal expression of the brand, with every page rendered. A minimal design is a good baseline because you can build on it, and this one reflected the new information architecture with good structure. It was ready enough that I could have launched it." },
      { type: "p", html: "It doesn't suit Jason Cook Design because it has no opinion. It's neutral, so it can become anything, and that leaves it with no identity of its own. The site should have the opinions I'd bring to your project." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/07-minimal-version.webp", alt: "The minimal version, fully rendered before I set it aside: home and the Engagements page.", credit: "The minimal version, fully rendered before I set it aside: home and the Engagements page." },
      { type: "p", html: "<strong>A, document.</strong> This is where I started adding some style. I only looked at it in light mode, and I kept going and made other iterations before I went back to it." },
      { type: "p", html: "<strong>C, cut-list.</strong> Here I was trying out different combinations of design tokens." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/08-direction-a-c-light.webp", alt: "Direction A, a document, and direction C, a cut-list, in light mode, with placeholder content.", credit: "Direction A, a document, and direction C, a cut-list, in light mode, with placeholder content." },
      { type: "p", html: "<strong>Blueprint.</strong> When I finally flipped A to dark mode, it came out blue, and I immediately had the blueprint idea. The rule marks in the layout, thin white lines on blue, started to look like a blueprint. The metaphor holds for what I do, so I leaned into it." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/09-direction-a-light-dark.webp", alt: "Direction A in light and in dark. The dark version came out blue.", credit: "Direction A in light and in dark. The dark version came out blue." },
      { type: "p", html: "That's why the \"layers\" button in the header exposes the structure underneath." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/11-layers-view.webp", alt: "The layers view on the shipped home page.", credit: "The layers view on the shipped home page." },
      { type: "h2", text: "Identity" },
      { type: "p", html: "I set out to express the design starting with the brand exercise: what the brand was about. I still left enough room for exploration, and in doing so the UI concept emerged naturally." },
      { type: "p", html: "I've used an isometric cube in a few logos recently, so I started there on reflex. While I was shaping the curves of the letterforms, I turned off the transform by accident and found that the letters had character on their own. They looked better flat than projected onto the face of a die." },
      { type: "p", html: "I drew the mark on a grid. Each letter sits in an 84-by-100 cell on a grid of 21-unit modules, and the one stripe is 8 units thick, the same as the notch in the J. The construction drawing sits in the hero with its dimensions showing." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/10-logo-iterations.webp", alt: "Rounds of logo exploration, with the locked set at the center.", credit: "Rounds of logo exploration, with the locked set at the center." },
      { type: "h2", text: "Outcome" },
      { type: "p", html: "The site went live on October 19, 2026, with 22 pages: the home page; Work, Engagements, Writing, About, Capabilities, and Contact; a legal page; the two Engagements paths, offering and operating; eight case studies; and four blog posts. Every old page either redirects to its new home or still loads where it was. The blog's RSS feed is the one thing I retired." },
      { type: "p", html: "The palette is built to stand out against the blueprint background. Orange reads loudest against the blue, so I use it sparingly, as a marker for what matters." },
      { type: "p", html: "The design is the visible story, but the technical one is the cutover: moving a running site to a new structure and design while it stayed up. The content and build work behind it isn't shown here. The site shipped." },
      { type: "p", html: "A site that says it builds working systems should keep working while it's rebuilt." },
      { type: "img", src: "/images/blog/rebuilding-jasoncookdesign/02-home.webp", alt: "The rebuilt home page at desktop and phone width.", credit: "The rebuilt home page at desktop and phone width." },
    ],
  },
  // ─── The Blog Post That Became a Book ────────────────────────────────────
  {
    slug: "the-blog-post-that-became-a-book",
    title: "The Blog Post That Became a Book",
    date: "2026-10-22",
    tags: ["writing", "governance", "systems-thinking"],
    excerpt: "I started with an idea for a blog post. It kept growing until a post couldn't hold it, so I'm posting the book instead, free to read and download.",
    coverImage: "/images/book/book-mockup.jpg",
    content: [
      { type: "img", src: "/images/book/book-mockup.jpg", alt: "The book as a hardcover at an angle, its spine showing: a parchment cover with a script texture above a dark cover with the title The Constitution and the Machine.", credit: "The Constitution and the Machine, free to read and download." },
      { type: "p", html: "The Constitution and the Machine started as an idea for a blog post. Today it's a book, and you can read it here for free." },
      { type: "p", html: "The first question was simple: could a democracy work without political parties? I asked it as a thought experiment, mostly to see what would happen when I pulled on it. Within a few exchanges two problems showed up, and both of them were mine. People group up on their own, so a ban on parties would only produce unofficial ones. And a system that bans organized groups hands an advantage to whoever already has money or name recognition. Those looked like two problems about parties. They were one problem about power changing form." },
      { type: "p", html: "This year I asked a bigger version of the question: what comes after democracy? The answer I kept coming back to was uncomfortable. The same technology that could let citizens take part in decisions continuously could just as easily run a computational autocracy, and both futures run on the same architecture. That gave me a design problem I could say in one line. Can a constitution stop power from converting? I call that power conversion: power in one place, such as money, office, or information, turning into power somewhere else. It's what the book is about." },
      { type: "p", html: "Then came the research, which is where a blog post stopped being the right container. I used AI tools to dig through sources, and it went the way good research goes. Some of what I believed held up, and some of it didn't. The hypothesis that held was the one I started with: a distributed democracy and a computational autocracy run on the same technological architecture. The one that didn't was my assumption that real expansions of political power need violence. Athens didn't become a democracy by overthrowing a king, and Britain widened its vote through three Reform Acts, each passed by legislation. I count both as results, because a refuted hypothesis keeps you from building on it." },
      { type: "p", html: "Each answer raised two more questions, and the idea grew past what a post could hold. A post gives you a conclusion. This needed room to show how I got there, including the parts I threw out." },
      { type: "p", html: "The habit that refined the idea most was attacking the position before anyone else could. I set up a hostile panel of AI reviewers, built to take the argument apart, and then I rebuilt what survived. I ran that cycle many times. Each pass left the position smaller in some places and sturdier in the ones that mattered. It works on any idea. Set out to break it, take the objections seriously, and rebuild. What comes out is a position you can defend, because you've already watched it get attacked." },
      { type: "p", html: "The rebuilding was my part. I outlined the argument myself, the problem and what answers it. I revised again and again, polishing arguments and messaging until my words conveyed a well-honed idea clearly in the final version. The panel could show me where the argument was weak. It couldn't tell me what I believed, so I decided what stayed." },
      { type: "p", html: "The book runs from ancient Athens through the American founding to the systems running today, in five parts with a Foreword and a Coda. It ends on what a person can do: state constitutions, city charters, and the rules your own community already lets you amend. It's free in two formats, a PDF made for reading on a screen and an EPUB, and there's no price, signup, or gate on either. The question it asks matters to everyone, and I don't want anything standing between the question and a reader: when power in one place can turn into power everywhere, what keeps a free people free?" },
      { type: "p", html: "Read it or download it on <a href=\"/writing/longform\">the book's page</a>." },
    ],
  },
];
