/**
 * Case study data — sourced faithfully from the practice's existing published case studies.
 * Facts, metrics, quotes, and client attributions are unchanged from the original; only the
 * narration is updated. Testimonials are reproduced verbatim as attributed third-party speech.
 */

export type Block =
  | { type: "p"; html: string }
  | { type: "img"; src: string; alt: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "ul-strong"; items: Array<{ label: string; rest: string }> };

export interface CaseStudySection {
  heading: string;
  blocks: Block[];
  /**
   * Optional note for cases where the diagnose-before-build pattern is limited or operates
   * differently than the other seven. Rendered as a visible editorial note.
   */
  diagnosisNote?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  /** Full case study title */
  title: string;
  /** Subtitle from the hero — the brief description of what was done */
  subtitle: string;
  /** One-liner for the /work index — range-proof framing, one sentence */
  indexOneLiner: string;
  backgroundImage: string;
  sections: CaseStudySection[];
  testimonial: Testimonial;
}

export const caseStudies: CaseStudy[] = [
  // ─── cs01 — OSIsoft ────────────────────────────────────────────────────────
  {
    slug: "osisoft",
    client: "OSIsoft",
    title: "OSIsoft Enterprise UI Framework",
    subtitle: "Modernizing 17 years of legacy interfaces",
    indexOneLiner:
      "Unified a fractured product suite spanning 17 years of legacy through user research, novel interaction design, and a comprehensive UI framework.",
    backgroundImage: "/images/background_cs01.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "Legacy user interfaces, some nearly 20 years old, had become an obstacle to the client's growth. No two of their products' interaction models had anything in common — their customers had to learn each product's conventions from scratch.",
          },
          {
            type: "p",
            html: "To meet changing expectations, the client needed their products to become an integrated suite and deliver value on a new generation of devices, especially small-screen touch. Moving from product islands toward a holistic design language required <strong>unifying interactions across diverse products.</strong>",
          },
          {
            type: "p",
            html: "The client asked us to design a comprehensive UI framework to unify their fractured product experiences. This undertaking required more than a simple off-the-shelf template — their applications were filled with bespoke interactions and tailored controls that a commercial UI framework wouldn't handle elegantly.",
          },
          { type: "img", src: "/images/cs01_01.jpg", alt: "UI beauty shot" },
        ],
      },
      {
        heading: "What they had",
        blocks: [
          {
            type: "p",
            html: "Here's an example of the transformative journey their products underwent: from half a dozen different UI stacks, from Win32 to Silverlight, all predating modern, cross-platform, touch-friendly conventions, to a unified, modern, and user-friendly interface.",
          },
          { type: "img", src: "/images/cs01_02.jpg", alt: "old client UIs" },
        ],
      },
      {
        heading: "Understanding user needs",
        blocks: [
          {
            type: "p",
            html: "Through our work with and interactions with their customers, my team deeply empathized with the users of the client's product suite. After countless end-user interviews, we formed a solid understanding of their needs, ensuring that the new UI framework would be user-centric.",
          },
          {
            type: "img",
            src: "/images/cs01_03.jpg",
            alt: "process documents",
          },
        ],
      },
      {
        heading: "Creating consensus with rapid iteration",
        blocks: [
          {
            type: "p",
            html: "We quickly took a representative set of screens across several products, from low-fidelity sketches to high-fidelity prototypes, to prove the validity of the design conventions. This was an essential step to <strong>arriving at agreement among the various product teams</strong> — each team needed to know that the new framework wouldn't negatively impact their product's interactions.",
          },
          {
            type: "img",
            src: "/images/cs01_04.jpg",
            alt: "low-to-high fidelity prototyping artifacts",
          },
        ],
      },
      {
        heading: "Solving interaction challenges",
        blocks: [
          {
            type: "p",
            html: "To improve product consistency, we found opportunities to harmonize disparate user interactions throughout the product suite. In many cases, this required <strong>inventing novel interactions</strong> that didn't exist in commercial off-the-shelf user interface controls. These custom interactions drove many of the UI framework's technical requirements, especially around the UI extensibility model.",
          },
          {
            type: "img",
            src: "/images/cs01_05.jpg",
            alt: "bespoke interactions",
          },
        ],
      },
      {
        heading: "Design for modularity",
        blocks: [
          {
            type: "p",
            html: "We designed a visual language to complement the framework architecture and pair perfectly with the framework's requirements:",
          },
          {
            type: "ul",
            items: [
              "Works in both <strong>keyboard + mouse and multi-touch</strong> environments with minimal adaptation",
              "Offers flexible whitespace options to accommodate <strong>both data-dense and data-sparse screens</strong>",
              "Includes a <strong>runtime extensibility model</strong> to ensure seamless integration of third-party controls",
              "Requires <strong>minimum processing power and bandwidth</strong> to ensure adequate performance on older devices",
              "Supports creating <strong>additional themes</strong> beyond the default light and dark themes I provided",
              "<strong>100% vector implementation</strong> that supports both server-side and client-side rendering",
            ],
          },
          {
            type: "img",
            src: "/images/cs01_06.jpg",
            alt: "light and dark skins",
          },
        ],
      },
      {
        heading: "Engineering specifications",
        blocks: [
          {
            type: "p",
            html: "We provided <strong>full UI specifications and design-time tooling support</strong>, including a matching design library for UX and UI designers in Sketch format. We also provided a design guidebook that describes not just what the framework contains but also when to choose one interaction pattern over another — for example, when to use modal dialogs and when to avoid them.",
          },
          {
            type: "img",
            src: "/images/cs01_08.jpg",
            alt: "design documentation",
          },
          {
            type: "p",
            html: "We also wrote and illustrated engineering documentation to ensure that future engineers and designers would have a comprehensive and shared understanding of how to best use the UI framework in their products, instilling confidence in the successful implementation of the framework.",
          },
          {
            type: "img",
            src: "/images/cs01_09.jpg",
            alt: "engineering documentation",
          },
          {
            type: "p",
            html: "Beyond the written documentation, we provided the engineering team with architectural and interaction guidance to ensure that the final product met the product teams' expectations. We reviewed developer check-ins, helped guide the direction of the codebase, prototyped screens with the emerging codebase to assess real-world performance, and communicated progress with stakeholders across the organization.",
          },
        ],
      },
      {
        heading: "Final delivery",
        blocks: [
          {
            type: "p",
            html: "The result was just what the client had set out to achieve: a harmonization of user interface paradigms and styles across various products that carries the product suite into the next generation.",
          },
          {
            type: "img",
            src: "/images/cs01_07.jpg",
            alt: "unified look and feel across applications",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason has an exceptional ability to quickly digest complex and abstract problems and offer creative solutions. I learned tons about great user experience from him. As did our team. Jason not only is a talented designer, he is also a great teacher.",
      name: "Chris Coen",
      role: "Engineering Department Lead",
    },
  },

  // ─── cs02 — Ford ───────────────────────────────────────────────────────────
  {
    slug: "ford",
    client: "Ford Motor Company",
    title: "Ford Build and Price",
    subtitle: "Creating a global brand's first touch-centric customer experience",
    indexOneLiner:
      "Redesigned Ford's Build and Price from the ground up — from stakeholder diagnosis through an interaction model still in use today.",
    backgroundImage: "/images/background_cs02.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "Like many global brands, Ford Motor Company was eager to respond to the success of the iPad. At the time, their sales tools, primarily written in HTML or Adobe Flash, either performed poorly on touch-based devices or didn't work. They sought a new solution as it became apparent that gestural platforms were too important a platform to ignore.",
          },
          {
            type: "p",
            html: "I led the multidisciplinary team of designers and architects from the front, contributing to the design vision, interaction models, and team leadership to create Ford's first touch-centric customer experience.",
          },
          { type: "img", src: "/images/cs02_01.jpg", alt: "hero shot" },
        ],
      },
      {
        heading: "The opportunity",
        blocks: [
          {
            type: "p",
            html: "Stakeholder interviews quickly revealed that Ford wanted more than simply porting the existing Build and Price tool from Flash to iPad. Ford wanted us to <strong>reinvent the Build and Price customer experience from the ground up</strong>, not just from a technological perspective but also from a customer experience perspective. The goal wasn't to adapt the existing tool to today; the goal was to surpass it in every relevant metric.",
          },
          {
            type: "img",
            src: "/images/cs02_02.jpg",
            alt: "wireframes and comps",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "p",
            html: "The design was so well-received that it led to a <strong>revamped style guide for Ford's entire suite of sales tools</strong>, not only for touch devices but also on the web. Today, Ford's Build and Price product still uses the fundamental interaction models my team designed years earlier.",
          },
          { type: "img", src: "/images/cs02_03.jpg", alt: "product usage" },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason is an incredible UXer. He has an extraordinary ability to make the most complex work simple and clear. He taught me new ways of thinking about my role and acted as a mentor, ensuring we remained on track.",
      name: "Alex Crockett",
      role: "Senior UX Architect",
    },
  },

  // ─── cs03 — Qu POS ─────────────────────────────────────────────────────────
  {
    slug: "qu-pos",
    client: "Qu",
    title: "Qu POS",
    subtitle: "The world's first multi-touch, omnichannel point-of-sale system",
    indexOneLiner:
      "Built the first multi-touch, omnichannel POS prototype for a startup founded by POS industry experts — which secured $10 million in funding and 100% enterprise client retention.",
    backgroundImage: "/images/background_cs03.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "When experts from the world leader in point-of-sale technology left to form a startup, they had lots of big ideas but didn't have a product yet. They brought their vision to my consultancy to <strong>prototype a next-generation point-of-sale system</strong> for in-store, handheld, kiosk, and drive-thru touchpoints.",
          },
          {
            type: "img",
            src: "/images/cs03_04.jpg",
            alt: "architecture diagram and early mockup",
          },
        ],
        diagnosisNote:
          "The diagnose-before-build pattern operates differently here. The founders brought domain expertise as their diagnostic — they left the world's market leader with a clear hypothesis about what the industry needed. What followed was validation through rapid prototyping rather than discovery through research.",
      },
      {
        heading: "The opportunity",
        blocks: [
          {
            type: "p",
            html: "By leveraging new gesture libraries from Microsoft, some of which we developed, we went from concept sketches to a working prototype in record time.",
          },
          {
            type: "img",
            src: "/images/cs03_03.jpg",
            alt: "mockup and running code",
          },
          {
            type: "p",
            html: "The prototype showcased swipe, flick-and-catch, pinch, and zoom interactions — the same ones the iPad generation had become accustomed to — yet ran on the inexpensive commodity Windows devices fast-casual restaurants rely on. It was exactly the solution the industry needed.",
          },
          {
            type: "img",
            src: "/images/cs03_02.jpg",
            alt: "full size screenshot",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "p",
            html: "The client used that prototype to showcase the capabilities of their fledgling company, attract an enthusiastic customer base, and ultimately secure $10 million in funding. Today, the product we designed enables millions of monthly transactions across the US, and the company boasts <strong>100% enterprise client retention</strong>.",
          },
          { type: "img", src: "/images/cs03_01.jpg", alt: "device image" },
        ],
      },
    ],
    testimonial: {
      quote:
        "The amount of dissatisfaction and frustration in restaurants was stronger than we thought. This interface is so easy to use it makes training a breeze. The staff picked it up very quickly. It didn't make them feel dumb. I see people smiling when they use it.",
      name: "Brett Guidry",
      role: "Vice President of Customer Experience",
    },
  },

  // ─── cs04 — Banco Azteca NOC ───────────────────────────────────────────────
  {
    slug: "banco-azteca",
    client: "Banco Azteca",
    title: "Banco Azteca Network Operations Center",
    subtitle: "Redesigning how a bank does business from the inside out",
    indexOneLiner:
      "Redesigned the NOC for one of Latin America's largest banks through ethnographic research, individual user interviews, and a ground-up visualization system — within four hard constraints.",
    backgroundImage: "/images/background_cs04.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "The heart of one of the largest banks in Latin America is its network operations center (NOC), where a team of several dozen engineers monitors billions of data points every day in near-real time. All mission-critical banking operations, from credit card fraud monitoring to bank robbery early warning systems, feed into one highly secure room, with data sources as diverse as AS/400, Tibco Spotfire, OSIsoft PI, Alnova FS, BMC Patrol, and SQL Server to name just a few.",
          },
          {
            type: "p",
            html: "Because NOC engineers spent most of their day monitoring live data streams on ASCII terminals, they quickly reached the limit of human capacity. With finite space in the operations center, they couldn't solve the problem by adding more staff. They had to make the existing staff more effective.",
          },
          {
            type: "img",
            src: "/images/cs04_01.jpg",
            alt: "operations center, before",
          },
          {
            type: "p",
            html: "The client asked my organization to <strong>reinvent their NOC from the ground up</strong> with just four requirements:",
          },
          {
            type: "ol",
            items: [
              "The solution must <strong>use only existing hardware and software</strong> — no new computers, changing operating systems, or even a service pack.",
              "Build upon the engineers' existing skill sets. The new system <strong>cannot require extensive retraining</strong>.",
              "The technologies used must meet preexisting <strong>standards for certified security and auditability</strong>.",
              "Bank staff needed to be able to <strong>maintain and extend the system without ongoing support</strong>.",
            ],
          },
        ],
      },
      {
        heading: "What they had",
        blocks: [
          {
            type: "p",
            html: "The screens the operations center staff stared at were difficult to work with. Each NOC employee was responsible for a specific part of the business, represented by scrolling data streams on their terminal and on a bank of 54 large-format monitors at one end of the room.",
          },
          {
            type: "p",
            html: "We observed that when the engineers' eyes began to tire toward the end of each shift, they would get up from their desks and approach the monitor array at the front of the room to get a better view of the tiny scrolling boxes of text they were required to watch.",
          },
          {
            type: "img",
            src: "/images/cs04_02.jpg",
            alt: "old interface screens before the redesign",
          },
        ],
      },
      {
        heading: "Ethnographic research",
        blocks: [
          {
            type: "p",
            html: "This project afforded an unusual opportunity: since we were designing a system for a very small group of people, we had the chance to interview each user individually and <strong>tailor the system design to their needs</strong> with unprecedented specificity. Rather than generalizing people into personas, we addressed the needs of the actual people in the system design, down to their roles and responsibilities and even the location of their desks within the NOC.",
          },
          {
            type: "img",
            src: "/images/cs04_03.jpg",
            alt: "persona document",
          },
        ],
      },
      {
        heading: "System architecture",
        blocks: [
          {
            type: "p",
            html: "We quickly learned that the operations staff needed an abstract representation of their system, which required first creating a <strong>deep understanding of their system architecture</strong>.",
          },
          {
            type: "img",
            src: "/images/cs04_07.jpg",
            alt: "architectural documents",
          },
        ],
      },
      {
        heading: "Designing visualizations",
        blocks: [
          {
            type: "p",
            html: "On the client side, we worked with several engineers, architects, and IT professionals to arrive at a clear, understandable representation of the things that mattered most.",
          },
          {
            type: "img",
            src: "/images/cs04_06.jpg",
            alt: "diagram sketches",
          },
          {
            type: "p",
            html: "After several rounds of iteration, we landed on a representation that made sense to the users. The next step was to optimize the diagram for presentation on their workstation and monitor bank screens.",
          },
          {
            type: "img",
            src: "/images/cs04_05.jpg",
            alt: "sketches in context",
          },
          { type: "img", src: "/images/cs04_04.jpg", alt: "diagram mockup" },
        ],
      },
      {
        heading: "Increasing fidelity",
        blocks: [
          {
            type: "p",
            html: "Once things looked good as pencil sketches, the following steps were a series of progressive increases in the fidelity of the design — several rounds of wireframes to model what the system would look like on both desktop terminals and the monitor bank.",
          },
          {
            type: "img",
            src: "/images/cs04_09.jpg",
            alt: "fidelity increases in designs",
          },
          { type: "img", src: "/images/cs04_08.jpg", alt: "wireframes" },
        ],
      },
      {
        heading: "Developing a visual language",
        blocks: [
          {
            type: "p",
            html: "Informed by a solid system representation, the next step was to determine the diagrams' appearance. The client selected their favorite of several mood boards that reflected the visual character they liked best.",
          },
          { type: "img", src: "/images/cs04_10.jpg", alt: "mood boards" },
          {
            type: "p",
            html: "We then applied that visual language to the diagrams…",
          },
          {
            type: "img",
            src: "/images/cs04_11.jpg",
            alt: "skinned diagrams",
          },
          {
            type: "p",
            html: "…created an accompanying style guide…",
          },
          { type: "img", src: "/images/cs04_13.jpg", alt: "style guide" },
          {
            type: "p",
            html: "…and a parallel functional specification detailing how to build, maintain, and modify the visualizations.",
          },
          {
            type: "img",
            src: "/images/cs04_12.jpg",
            alt: "functional spec",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "p",
            html: "When all was said and done, the client had a functional, deeply engaging center that <strong>markedly improved their operational effectiveness</strong> and their staff's mental state.",
          },
          {
            type: "img",
            src: "/images/cs04_14.jpg",
            alt: "running system",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason has a unique blend of being a developer, UX architect, and designer — a rare breed. From his mad dev skills, beautifully written documentation (architecture, requirements, workflows, etc), overall understanding of the user experience, then he'll turn around and produce design assets. Beyond awesome, he really sets the bar.",
      name: "Issa Johnson",
      role: "Senior Producer",
    },
  },

  // ─── cs05 — Millennium Systems International / Meevo ──────────────────────
  {
    slug: "millennium-meevo",
    client: "Millennium Systems International",
    title: "Millennium Systems International — Meevo",
    subtitle:
      "Designing the beauty industry's most award-winning business management platform",
    indexOneLiner:
      "Redesigned Millennium Systems International's Meevo platform from a dead-language legacy to a system that's earned over 40 industry awards since launch.",
    backgroundImage: "/images/background_cs05.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "Salons, beauty and medical spas, studios, and gyms use Millennium Systems International (MSI) software to manage business records, scheduling, point-of-sale transactions, and business and marketing goals. When we met, MSI was already an industry leader, so the stakes were high when they asked my team to <strong>redesign their flagship business management software suite from the ground up</strong>.",
          },
        ],
      },
      {
        heading: "What they had",
        blocks: [
          {
            type: "p",
            html: "The platform's ancient user interface had become so unwieldy and cumbersome to understand, maintain, and run that it was beginning to negatively impact sales effectiveness and support costs.",
          },
          {
            type: "p",
            html: "The CEO wrote the existing product himself in Visual FoxPro, a dead language, and their customers often called it \"popup hell.\" New customer expectations like modern user interface design, touch device compatibility, and cloud-based services meant it was time for a change.",
          },
          {
            type: "img",
            src: "/images/cs05_02.jpg",
            alt: "old interface screens before redesign",
          },
        ],
      },
      {
        heading: "The big idea",
        blocks: [
          {
            type: "p",
            html: "The appointment calendar, one of the most challenging, complex parts of the spa/salon back office, led to one of the platform's most <strong>distinctive competitive advantages: fuzzy logic and natural language processing</strong>. The client immediately recognized the power of this invention and patented it, securing their competitive advantage. They even trademarked the name we came up with: \"ConvoBar.\"",
          },
          {
            type: "img",
            src: "/images/cs05_05.jpg",
            alt: "conversational booking",
          },
          {
            type: "p",
            html: "My team went through several rounds of interaction design to enable staff to type, text, or talk in a natural, conversational manner, and the scheduler would \"just get it.\" We recognized that <strong>we had invented a new concept: conversational booking</strong>.",
          },
          {
            type: "img",
            src: "/images/cs05_06.gif",
            alt: "ConvoBar wireframes",
          },
        ],
      },
      {
        heading: "Understanding the client's clients",
        blocks: [
          {
            type: "p",
            html: "Designing for salons and spas presents unique challenges due to the diverse user base. Our primary user research revealed distinct persona segmentations across generational gaps. For instance, younger users are more comfortable with text entry, especially speech-to-text, while older users prefer to navigate through menus with a mouse. This led us to coin the terms \"Texter\" and \"Clicker\" to ensure our system catered to both needs.",
          },
          {
            type: "img",
            src: "/images/cs05_03.jpg",
            alt: "Texter vs Clicker",
          },
        ],
      },
      {
        heading: "Redesigned interactions",
        blocks: [
          {
            type: "p",
            html: "Powered by a strong invention, the rest of the process was a matter of applying UX best practices across the entire functional suite: booking, point of sale, client management, employee management, goal tracking, marketing, reporting, inventory management, and more.",
          },
          {
            type: "img",
            src: "/images/cs05_07.jpg",
            alt: "Meevo wireframes",
          },
        ],
      },
      {
        heading: "Developing a modern look and feel",
        blocks: [
          {
            type: "p",
            html: "We went through several rounds of iteration to find the right design language, producing several sets of mood boards and style compositions.",
          },
          { type: "img", src: "/images/cs05_08.jpg", alt: "Moodboards" },
          { type: "img", src: "/images/cs05_09.jpg", alt: "early comps" },
          {
            type: "p",
            html: "The design we settled on — bold, typography-forward — defined the brand image for the new generation.",
          },
          {
            type: "img",
            src: "/images/cs05_04.gif",
            alt: "ConvoBar live",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "p",
            html: "The redesigned product was a resounding success, <strong>earning over 40 industry awards since launch</strong>, including American Spa Magazine's highest honor eight years in a row: the Professional's Choice Award for Best Software. Since launch, MSI has expanded the platform to a new technology stack to deploy to a wider range of devices, while maintaining the same user experience that propelled them to the forefront of the industry.",
          },
          {
            type: "img",
            src: "/images/cs05_10.gif",
            alt: "manager screen",
          },
          { type: "img", src: "/images/cs05_01.jpg", alt: "awards" },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason was one of the few of my staff that I felt comfortable filling in for me during new client engagements due to his technical knowledge, User Experience and design capabilities and ability to present ideas and opinions in thoughtful and insightful ways. I was continuously impressed with his ability to bring a high level of professional creativity and personal passion to every engagement.",
      name: "Jonah Sterling",
      role: "General Manager of Design",
    },
  },

  // ─── cs06 — Microsoft Surface ──────────────────────────────────────────────
  {
    slug: "microsoft-surface",
    client: "Microsoft",
    title: "Microsoft Surface",
    subtitle: "Designing a tech giant's first gestural user interface",
    indexOneLiner:
      "Helped Microsoft build its first natural user interface story — producing gesture libraries, research applications, and inventions that the Surface brand still reflects today.",
    backgroundImage: "/images/background_cs06.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "When Apple introduced the iPhone, Microsoft's natural user interface (NUI) technology was still in its early research stage. With Apple being the first to market with multi-touch user interfaces, all eyes were on Microsoft's response.",
          },
          {
            type: "img",
            src: "/images/cs06_01.jpg",
            alt: "closeup of table edge",
          },
          {
            type: "p",
            html: "Microsoft relied on my organization to <strong>produce libraries, proofs-of-concept, keynote showcases, and technical demos</strong> to fast-track their NUI story. Ultimately, the patterns and conventions we established and even some of the code we wrote <strong>formed the basis for Microsoft's Surface hardware platform today</strong>.",
          },
        ],
      },
      {
        heading: "A device built for research",
        blocks: [
          {
            type: "p",
            html: "Five years before the tablets and laptops that carry the Surface brand we know today, Microsoft produced an interactive coffee table to facilitate research into natural user interface behavior, developing gesture libraries and forming the basis for a future mass-market consumer story. Microsoft retired the table form factor once they released the Surface Pro in 2013, shortly after rebranding it \"PixelSense\" to disambiguate it from the consumer desktops, tablets, and laptops that would carry the brand name.",
          },
          {
            type: "img",
            src: "/images/cs06_02.jpg",
            alt: "interacting with Surface",
          },
          {
            type: "p",
            html: "The Surface table retailed for about $10,000, so Microsoft primarily sold the device to commercial customers rather than home users. Consequently, the nature of our early work in developing applications for Surface focused on installations in public settings like retail stores, restaurants and hotel lobbies.",
          },
        ],
      },
      {
        heading: "Gridless, omnidirectional interfaces",
        blocks: [
          {
            type: "p",
            html: "The original Surface is unlike any other device we had ever designed for in several ways. Every other screen-based interface we're familiar with has a distinct top and bottom. In contrast, a coffee table is omnidirectional — usable from any side with no sense of top and bottom in the interface. Plus, because of the size of the display, it invited more than one person to use it at a time, often strangers. This created <strong>unique design challenges that led to deeply insightful user research sessions</strong>.",
          },
          {
            type: "img",
            src: "/images/cs06_03.jpg",
            alt: "two people using snowboard app",
          },
          {
            type: "p",
            html: "Microsoft even used an application we designed and developed in their Enterprise Engagement Center, a research facility for large-scale cloud services.",
          },
          {
            type: "img",
            src: "/images/cs06_07.gif",
            alt: "Microsoft Enterprise Engagement Center",
          },
        ],
      },
      {
        heading: "A screen that's looking back at you",
        blocks: [
          {
            type: "p",
            html: "Another aspect that made Surface unique was that its touchscreen used a camera array rather than a capacitor — it was actually \"looking\" at the screen from the inside. This technology made for some <strong>fascinating interaction opportunities through object recognition</strong>.",
          },
          {
            type: "img",
            src: "/images/cs06_04.gif",
            alt: "object recognition",
          },
          {
            type: "p",
            html: "We designed the mechanism that blurred the distinction between the physical and digital realms, creating interactions that hadn't been possible before.",
          },
          {
            type: "img",
            src: "/images/cs06_05.jpg",
            alt: "MobileConnect sketches",
          },
        ],
      },
      {
        heading: "Cutting-edge invention",
        blocks: [
          {
            type: "p",
            html: "In addition to the interactions, we also <strong>invented the way Surface connected to other devices via optical means</strong>, long before Near Field Communication (NFC) was mature enough to initiate a Bluetooth connection. We also wrote the C# and Java libraries that powered these interactions.",
          },
          {
            type: "img",
            src: "/images/cs06_06.gif",
            alt: "MobileConnect in action",
          },
        ],
      },
      {
        heading: "Lasting impact",
        blocks: [
          {
            type: "p",
            html: "While very few people had the opportunity to experience the original Microsoft Surface themselves, the research, designs, inventions, and libraries my team contributed live on today in Microsoft's ongoing natural user interface story.",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason is unquestionably one of the rarest people in the industry. Not only can he develop well structured solutions, but he has astounding ability in analysis and design. That, combined with his deep graphical design background, makes him near perfect for UX projects.",
      name: "Andrew Whiddett",
      role: "Chief Technology Officer",
    },
  },

  // ─── cs07 — Leading Hotels of the World ───────────────────────────────────
  {
    slug: "leading-hotels",
    client: "Leading Hotels of the World",
    title: "Leading Hotels of the World",
    subtitle:
      "Redefining the online experience for the world's finest collection of independent hotels",
    indexOneLiner:
      "Redesigned the LHW online experience — from metrics analysis and booking-flow diagnosis through a conversion-focused design that decreased user drop-off.",
    backgroundImage: "/images/background_cs07.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "The Leading Hotels of the World (LHW) differs from your average travel site. For 90 years, LHW has catered to the tastes of discerning travelers by offering a hand-selected collection of unique properties worldwide that meet their customers' high standards. If you want to book a castle, palace, mountain hideaway, safari camp, or private island, LHW is the white-glove travel concierge of choice.",
          },
          {
            type: "p",
            html: "LHW tapped my team to redefine their online experience, balancing function and inspiration. We researched their customers' needs to strike that balance, designing the beautiful yet intuitive web experience that delivered the client's ultimate goal — increased online conversions.",
          },
          {
            type: "img",
            src: "/images/cs07_01.jpg",
            alt: "full final site",
          },
        ],
      },
      {
        heading: "What they had",
        blocks: [
          {
            type: "p",
            html: "The existing LHW.com site was ill-equipped to meet LHW's customers' expectations. It was starkly unattractive, navigationally confusing, and didn't behave well on touch-based mobile devices. The site was plagued with ambiguity in its visual hierarchy, hamstrung by an unintelligible information architecture, peppered with out-of-date technology like Java applets and Flash widgets, and largely unable to get customers through the booking funnel, the site's primary purpose.",
          },
          { type: "img", src: "/images/cs07_02.jpg", alt: "old site" },
          {
            type: "p",
            html: "The one aspect of the existing site we sought to preserve was LHW's longstanding investment in high-quality photography and copywriting. My goal was to elevate it to the prominence it deserved while simultaneously wrapping it in a seamlessly integrated booking experience.",
          },
        ],
      },
      {
        heading: "Improving information architecture",
        blocks: [
          {
            type: "p",
            html: "The site's first and most essential purpose is to enable customers to book travel. That's why the redesign began with <strong>redesigning the booking flow from first principles</strong>. By studying the client site's metrics, we identified the critical breakdowns in their sales funnel. That intelligence informed the placement of critical gatekeeping features like registration and paywalls, highlighting higher conversion opportunities to upsell services like premium membership.",
          },
          {
            type: "img",
            src: "/images/cs07_03.jpg",
            alt: "booking flow",
          },
        ],
      },
      {
        heading: "Inspiring interaction",
        blocks: [
          {
            type: "p",
            html: "The LHW site is much more than a simple booking site. The brand prides itself on the depth and quality of its curation and local knowledge. Research showed that customers were interested in inspirational content, but unable to find it on the existing site. The redesign focused on doing a better job showcasing LHW's owned media content, especially the expertly written travel guides and photography.",
          },
          { type: "img", src: "/images/cs07_04.jpg", alt: "wireframes" },
          {
            type: "p",
            html: "After several rounds of iteration, we had a finely tuned interaction model that invited exploration while keeping the booking engine close at hand.",
          },
          { type: "img", src: "/images/cs07_05.jpg", alt: "calendar" },
          {
            type: "p",
            html: "Subtle interaction mechanics like an expandable map created a sense of quiet expertise to the site, echoing the brand's persona while providing the essential functionality customers need to complete the task. The functional tools are clearly within reach but out of the way until the customer is ready to use them.",
          },
          {
            type: "img",
            src: "/images/cs07_07.jpg",
            alt: "expandable map",
          },
        ],
      },
      {
        heading: "A suitable style for a luxury brand",
        blocks: [
          {
            type: "p",
            html: "With a solid set of wireframes providing the site's skeleton, the next step was developing a complementary visual aesthetic. The design team applied a conservative, serif-centric typographic treatment and a reserved, flat color palette to the wireframes, inviting customers to immerse themselves in LHW's exemplary writing and photography until they were ready to buy.",
          },
          {
            type: "img",
            src: "/images/cs07_06.jpg",
            alt: "wireframe vs. composition",
          },
        ],
      },
      {
        heading: "The result",
        blocks: [
          {
            type: "p",
            html: "The redesigned website's focus on experiential booking gives discerning travelers the planning experience they expect. It delivers on the ultimate goal of decreasing user drop-off and increasing conversions, driving improvements to the client's bottom line.",
          },
          {
            type: "img",
            src: "/images/cs07_08.jpg",
            alt: "device mockups",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason's understanding, insight and knowledge is profound. With clarity, elegance and joy he demonstrates how UX is both art and science. Jason cares deeply about the people and the projects he works with, always bringing his insight, diligence and skill to everything he touches. He makes the practice of UX fun, intriguing and beautiful.",
      name: "Alex Crockett",
      role: "Senior UX Architect",
    },
  },

  // ─── cs08 — Dell ───────────────────────────────────────────────────────────
  {
    slug: "dell",
    client: "Dell Technologies",
    title: "Dell Unified Contact Us Experience",
    subtitle: "Driving organizational convergence and customer satisfaction",
    indexOneLiner:
      "Unified Dell's fragmented Contact Us pages across 143 countries — reducing misrouted interactions by 16,000 annually and earning the 2023 TSIA STAR Award for Excellence in Organizational Convergence.",
    backgroundImage: "/images/background_cs08.jpg",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "p",
            html: "Dell's Sales and Marketing, Customer Care, and Technical Support departments each operated independently with distinct \"Contact Us\" pages on the Dell website. The siloed approach created customer confusion, leading to disjointed experiences and frequent misdirection across departments. This fragmentation affected customers worldwide across 143 country-specific pages, misrouting 20% of interactions to the wrong queues, such as sales agents handling technical support queries.",
          },
          {
            type: "p",
            html: "With 14 distinct contact channels — far more than Dell's competitors — managing customer interaction across the business grew increasingly complex. Dell needed a unified solution to streamline the customer experience, reduce inefficiencies, and enhance global alignment across its \"Contact Us\" pages.",
          },
          {
            type: "img",
            src: "/images/cs08_01.jpg",
            alt: "disjointed contact us user experiences",
          },
        ],
      },
      {
        heading: "My role and conceptual vision",
        blocks: [
          {
            type: "p",
            html: "The idea for the <strong>Unified Contact Us Experience</strong> was my team's concept, envisioned to guide the entire Dell Technologies brand toward a new generational strategy. By converging organizational silos into a unified framework, we set a path for holistic customer interaction that Dell continues to follow today in other areas of the business.",
          },
          {
            type: "p",
            html: "The organization assigned to this project included two critical functions: the behavioral science team, responsible for validating the idea through rigorous customer research, and the experience design team, tasked with creating an intuitive interaction model and a cohesive look and feel. Together, we crafted an experience that transformed Dell's fragmented contact approach into a seamless, unified platform.",
          },
        ],
      },
      {
        heading: "The solution: a unified global experience",
        blocks: [
          {
            type: "p",
            html: "In late 2022, we began cross-business collaboration, merging the previously disconnected \"Contact Us\" pages into a single, global template. Leveraging the successful design of the Contact Technical Support page, we rolled out a consistent visual and interaction model that spanned Sales, Marketing, Customer Care, and Technical Support. This global implementation marked the first time Dell achieved true alignment across all 143 country- and language-specific pages, eliminating redundancy and centralizing decision-making for updates. We created a governance process to ensure long-term consistency and simplified future updates with an easy-to-manage template.",
          },
          {
            type: "img",
            src: "/images/cs08_02.jpg",
            alt: "unified contact us concept model",
          },
        ],
      },
      {
        heading: "Business impact: measurable results",
        blocks: [
          { type: "p", html: "The solution delivered tangible results for Dell:" },
          {
            type: "ul-strong",
            items: [
              {
                label: "20% reduction in chat pollution:",
                rest: " Fewer customers ended up in the wrong channels, and remote agents no longer had to redirect customers, saving over 5,000 hours annually for sales agents alone.",
              },
              {
                label: "16,000 fewer misrouted customers annually:",
                rest: " By minimizing misdirection, agents became more productive, improving the overall efficiency of Dell's customer support workforce.",
              },
              {
                label: "65% increase in page link engagement:",
                rest: " This uptick equates to 500,000 more engaged interactions per year, enhancing Dell's ability to deliver value through its \"Contact Us\" page.",
              },
              {
                label: "11% increase in weekly visits:",
                rest: " This increase led to over 2.5 million page visits across the globe each year, demonstrating the improved relevance and utility of the unified experience.",
              },
              {
                label: "300 basis point improvement in CSAT:",
                rest: " Customer satisfaction surveys originating from these pages saw a rise from 85% to 88%, reflecting a positive impact for over 80,000 customers annually.",
              },
            ],
          },
          {
            type: "img",
            src: "/images/cs08_03.jpg",
            alt: "unified contact us screenshot",
          },
        ],
      },
      {
        heading: "Industry recognition",
        blocks: [
          {
            type: "p",
            html: `In recognition of this transformative work, Dell was awarded <a href="https://cdn.prod.website-files.com/65932a5f2ab5244b61f0cc94/65dcee572fd6eafc547648ea_Excellence%20in%20Organization%20Convergence%20-%20Dell%20Technologies.pdf" target="_blank" rel="noopener noreferrer" class="underline">the 2023 TSIA STAR Award for Excellence in Organizational Convergence</a> — the only TSIA STAR Award Dell won that year. This prestigious accolade highlights the success of converging sales, marketing, customer care, and technical support into a seamless, customer-first experience.`,
          },
          {
            type: "img",
            src: "/images/cs08_04.jpg",
            alt: "TSIA STAR Award 2023 logo",
          },
        ],
      },
      {
        heading: "Looking forward",
        blocks: [
          {
            type: "p",
            html: "The success of the Unified Contact Us Experience has paved the way for future innovations at Dell, such as an AI-driven \"concierge\" solution, enabled in part by the foundation our vision established, to further elevate the customer experience.",
          },
        ],
      },
    ],
    testimonial: {
      quote:
        "Jason is a standout professional, thought leader, and exceptional experience designer. He consistently impressed with his strategic thinking and customer-focused approach. Jason excels at turning complex challenges into actionable strategies.",
      name: "Kimberly Smith",
      role: "Global Customer Experience Executive",
    },
  },
];
