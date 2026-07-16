import type { ProductPageConfig, ProductSlug } from "../components/product/productPage.types";

export const productPages = {
  pro: {
    slug: "pro",
    hero: {
      productName: "Jibe Pro",
      productLabel: "Pro",
      descriptor: "Customer Experience Performance",
      line1: "Understand every",
      line2: "customer interaction.",
      description:
        "Jibe Pro connects frontline predictions, customer feedback, and operational performance so leaders can focus quality, coach with evidence, and prove what changed.",
      primaryHref: "/demo?product=pro",
      primaryLabel: "Book a Pro demo",
      secondaryHref: "#overview",
      secondaryLabel: "Explore Jibe Pro",
      proofPoints: ["Under-10-second capture", "Role-based views", "Focused QA and coaching", "Measurable program impact"],
    },
    pathways: {
      eyebrow: "What Jibe Pro does",
      title: "From frontline signal to measurable improvement.",
      description:
        "Jibe Pro gives every level of the operation a clearer way to understand performance and act on it.",
      items: [
        {
          id: "measure",
          label: "Measure",
          title: "See beyond the customers who answer a survey.",
          description:
            "Structured frontline predictions add context to customer feedback and operational data, creating a broader view of satisfaction, resolution, and risk across the interaction stream.",
          outcomes: [
            "Increase visibility without replacing valuable customer surveys",
            "Compare frontline judgment with actual customer outcomes",
            "Keep participation, coverage, and data quality visible",
          ],
        },
        {
          id: "improve",
          label: "Improve",
          title: "Focus quality and coaching where they can matter most.",
          description:
            "Supervisors can move from a changing metric to the teams, agents, contact reasons, and interactions behind it—then turn that evidence into a specific coaching action.",
          outcomes: [
            "Prioritize QA around risk and opportunity instead of random sampling",
            "Give agents a personal view of progress and prediction accuracy",
            "Measure whether coaching changed customer and operational results",
          ],
        },
        {
          id: "prove",
          label: "Prove",
          title: "Connect adoption, behavior, and outcomes in one operating view.",
          description:
            "Executives and operators work from the same measurement framework, with the ability to move from enterprise performance to the interaction-level evidence behind it.",
          outcomes: [
            "Establish a defensible baseline before launch",
            "Track performance movement with data-quality context",
            "End pilots with a clear decision to expand, adjust, or stop",
          ],
        },
      ],
    },
    media: {
      eyebrow: "Jibe Pro in action",
      title: "One customer signal. The right view for every role.",
      description:
        "Managers, supervisors, agents, QA teams, coaches, and reporting users see the level of detail their work requires.",
      items: [
        {
          id: "manager",
          label: "Manager",
          eyebrow: "Program performance",
          title: "See where outcomes are moving and what is driving the change.",
          description:
            "Compare teams, monitor participation and accuracy, and surface the positive and negative drivers that need attention.",
          src: "assets/jibe-pro/screens/manager-dashboard.png",
          alt: "Jibe Pro manager dashboard showing NPS, resolution, participation, team rankings, and performance drivers.",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "supervisor",
          label: "Supervisor",
          eyebrow: "Team action",
          title: "Turn live team signals into the next coaching priority.",
          description:
            "See which sessions are required, which agents are changing, and which customer issues deserve focused review.",
          src: "assets/jibe-pro/screens/supervisor-dashboard.png",
          alt: "Jibe Pro supervisor dashboard showing team performance, required coaching sessions, and agent insights.",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "agent",
          label: "Agent",
          eyebrow: "Personal performance",
          title: "Give every agent a clear view of progress.",
          description:
            "Personal metrics, prediction accuracy, recognition, and focused improvement guidance make performance tangible.",
          src: "assets/jibe-pro/screens/agent-dashboard.png",
          alt: "Jibe Pro agent dashboard showing achievements, personal outcomes, prediction accuracy, and performance trends.",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "quality",
          label: "Quality",
          eyebrow: "Quality assurance",
          title: "Direct audit effort toward the interactions that deserve it.",
          description:
            "Balance QA productivity with suggested reviews, quality movement, and the evidence behind each recommendation.",
          src: "assets/jibe-pro/screens/qa-productivity-dashboard.png",
          alt: "Jibe Pro quality dashboard showing audit productivity, QA scores, completed audits, and a suggested review.",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "coaching",
          label: "Coaching",
          eyebrow: "Coaching impact",
          title: "Measure whether coaching changed what happened next.",
          description:
            "Connect session availability, completion speed, and success rate with changes in NPS, resolution, and handle time.",
          src: "assets/jibe-pro/screens/coaching-impact-dashboard.png",
          alt: "Jibe Pro coaching dashboard showing session completion, delivery speed, success rate, and performance change.",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "reporting",
          label: "Reporting",
          eyebrow: "Configurable reporting",
          title: "Build the KPI view each stakeholder needs.",
          description:
            "Choose the measures, time horizon, and comparison that fit the decision without disconnecting the result from its source data.",
          src: "assets/jibe-pro/screens/reporting-metric-builder.png",
          alt: "Jibe Pro reporting workspace showing configurable KPI cards, trends, and metric controls.",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
      ],
    },
    workflow: {
      eyebrow: "The Jibe Pro loop",
      title: "A continuous system for frontline improvement.",
      description:
        "Each interaction adds evidence. Each action creates a new opportunity to validate what worked.",
      steps: [
        {
          number: "01",
          title: "Predict",
          description:
            "Immediately after the interaction, the frontline employee records a fast, structured prediction of satisfaction, resolution, and confidence.",
        },
        {
          number: "02",
          title: "Validate",
          description:
            "Customer feedback and operational results confirm or challenge the prediction, making alignment and blind spots measurable.",
        },
        {
          number: "03",
          title: "Focus",
          description:
            "Jibe Pro connects results with teams, contact reasons, channels, and interactions so leaders can identify the right QA and coaching priority.",
        },
        {
          number: "04",
          title: "Improve",
          description:
            "Teams act, measure the effect, and feed the result into the next cycle—turning isolated interventions into continuous improvement.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Built for the operation",
      title: "Clear enough for leaders. Detailed enough for operators.",
      description:
        "Jibe Pro adapts to the measurement model, team structure, and governance requirements of the program around it.",
      items: [
        {
          title: "Configurable measurement",
          description: "Define KPIs, thresholds, cohorts, rolling windows, and measurement periods around the program design.",
        },
        {
          title: "Role-based views",
          description: "Give executives, operators, supervisors, agents, and QA teams the depth appropriate to their work.",
        },
        {
          title: "Focused quality assurance",
          description: "Prioritize reviews around meaningful risk and opportunity while keeping audit productivity visible.",
        },
        {
          title: "Measurable coaching",
          description: "Connect completed coaching with subsequent movement in customer and operational performance.",
        },
        {
          title: "Enterprise reporting",
          description: "Compare sites, teams, channels, and contact reasons, then deliver leadership-ready reports.",
        },
        {
          title: "Program governance",
          description: "Support structured pilots and rollout with access controls, hierarchy management, and data-quality visibility.",
        },
      ],
    },
    proof: {
      eyebrow: "Evidence by design",
      title: "A program should end with a decision—not a debate over the data.",
      description:
        "Jibe Pro pairs the product with a disciplined implementation and measurement model from the beginning.",
      items: [
        {
          eyebrow: "Program design",
          title: "Start with the decision the evidence must support.",
          description:
            "The team agrees on source data, KPI definitions, historical context, cohorts, exclusions, and minimum volume before interpreting movement.",
        },
        {
          eyebrow: "Operational adoption",
          title: "Keep usage and signal quality visible throughout the program.",
          description:
            "Participation, prediction coverage, ramp, and data completeness stay alongside performance so leaders know when the evidence is dependable.",
        },
        {
          eyebrow: "Executive evidence",
          title: "Connect the result to a clear recommendation.",
          description:
            "Outcome movement is reviewed with data quality and operational context, producing a defensible recommendation to expand, adjust, extend, or stop.",
        },
      ],
    },
    cta: {
      eyebrow: "See Jibe Pro in context",
      title: "Turn more customer interactions into measurable improvement.",
      description:
        "Bring your current CX, quality, coaching, or performance challenge. We will show how Jibe Pro can fit the operating model around it.",
      href: "/demo?product=pro",
      label: "Book a Pro demo",
    },
  },

  retail: {
    slug: "retail",
    hero: {
      productName: "Jibe Retail",
      productLabel: "Retail",
      descriptor: "In-Venue Surveys & Ecommerce",
      line1: "Survey. Ecommerce.",
      line2: "Or both.",
      description:
        "Jibe Retail helps venues collect feedback, find missing merchandise, and continue purchases for home delivery through a branded survey, an ecommerce experience, or both.",
      primaryHref: "/demo?product=retail",
      primaryLabel: "Book a Retail demo",
      secondaryHref: "#overview",
      secondaryLabel: "Explore Jibe Retail",
      proofPoints: ["Branded surveys", "Extended-aisle ecommerce", "Connected journeys", "Item-level insight"],
    },
    pathways: {
      eyebrow: "Choose the experience",
      title: "One platform. Three ways to meet the moment.",
      description:
        "Deploy the capability the venue needs today, then connect survey and commerce when the customer journey calls for both.",
      items: [
        {
          id: "survey",
          label: "Survey",
          title: "Ask while the experience is still fresh.",
          description:
            "Run a fast, branded, multilingual survey at the point of experience. Capture satisfaction, product availability, service, and the specific friction behind the response.",
          outcomes: [
            "Measure satisfaction and the quality of the visit",
            "Understand whether shoppers found what they came to buy",
            "Capture feedback about associate assistance and the reason behind a poor experience",
          ],
        },
        {
          id: "ecommerce",
          label: "Ecommerce",
          title: "Extend the aisle beyond what is available in the venue.",
          description:
            "Help shoppers browse by league, team, category, product, and size. When the basket is ready, a QR code lets the shopper continue checkout on their phone and choose home delivery.",
          outcomes: [
            "Make a broader merchandise catalog available in the store",
            "Guide shoppers directly to the item, variation, and size they want",
            "Continue checkout by QR without creating another register line",
          ],
        },
        {
          id: "combined",
          label: "Both",
          title: "Let the answer determine the next useful step.",
          description:
            "Connect survey and ecommerce in one adaptive journey. A shopper who could not find an item can move directly into product search, while the venue still captures why the sale was at risk.",
          outcomes: [
            "Branch from feedback into the right follow-up or product discovery",
            "Create a cart and a path to purchase while intent is still high",
            "Analyze experience friction and unmet merchandise demand together",
          ],
        },
      ],
    },
    media: {
      eyebrow: "Jibe Retail in action",
      title: "Designed around the venue, the brand, and the shopper.",
      description:
        "The same responsive experience can support a podium, kiosk, mobile device, survey flow, merchandise journey, or connected deployment.",
      items: [
        {
          id: "fan-town-entry",
          label: "Fan Town entry",
          eyebrow: "Fan Town / Localized journey",
          title: "Begin with an experience built for the market around it.",
          description:
            "Fan Town demonstrates a multi-sport entry point for its Mexico retail environment that can lead into a concise survey, product discovery, ecommerce, or a connected journey.",
          src: "assets/jibe-retail/sport-selector.png",
          alt: "Fan Town Jibe Retail experience inviting a shopper to select a sport.",
          orientation: "portrait",
          disclosure: "Representative Fan Town experience. Available steps and configurations vary by deployment.",
        },
        {
          id: "team",
          label: "MLB team discovery",
          eyebrow: "MLB NYC / Guided discovery",
          title: "Make a large catalog feel familiar and easy to navigate.",
          description:
            "Guide shoppers through league and team identities before narrowing the journey to the merchandise that matters to them.",
          src: "assets/jibe-retail/team-selector.png",
          alt: "Jibe Retail Major League Baseball experience inviting a shopper to select a team.",
          orientation: "portrait",
          disclosure: "Representative branded experience. Catalogs and product availability vary by deployment.",
        },
        {
          id: "finder",
          label: "MLB product finder",
          eyebrow: "MLB NYC / Endless aisle",
          title: "Find the merchandise the shopper could not find in store.",
          description:
            "Search and browse by product type, team, style, and item so an unavailable shelf does not have to end the journey.",
          src: "assets/jibe-retail/product-finder.png",
          alt: "Jibe Retail product finder showing a searchable grid of New York Yankees jerseys.",
          orientation: "portrait",
          disclosure: "Representative branded experience. Catalogs and product availability vary by deployment.",
        },
        {
          id: "checkout",
          label: "NHL ecommerce",
          eyebrow: "NHL / Continue the purchase",
          title: "Move the basket to the shopper's phone for checkout and delivery.",
          description:
            "A shopper can review the selected items, scan a QR code, continue checkout on their own device, and have the order shipped home.",
          src: "assets/jibe-retail/cart-recovery.png",
          alt: "Jibe Retail NHL cart showing selected merchandise and a QR code to continue checkout for home delivery.",
          orientation: "portrait",
          disclosure: "Representative branded experience. Checkout and fulfillment options depend on the connected commerce environment.",
        },
        {
          id: "deployments",
          label: "Podium deployments",
          eyebrow: "Branded physical deployment",
          title: "One podium form. Built to belong in different venues.",
          description:
            "The same slim podium can be wrapped for the environment and configured for survey, product discovery, ecommerce, or a connected experience.",
          images: [
            {
              src: "assets/podiums/jibe-retail-mlb.png",
              alt: "Jibe Retail podium with an MLB wrap and a merchandise discovery experience on screen.",
              label: "MLB NYC",
            },
            {
              src: "assets/podiums/jibe-retail-nhl.png",
              alt: "Jibe Retail podium with an NHL wrap and an ecommerce home-delivery experience on screen.",
              label: "NHL",
            },
            {
              src: "assets/podiums/jibe-retail-fan-town.png",
              alt: "Jibe Retail podium with a Fan Town wrap and a Spanish-language product finder on screen.",
              label: "Fan Town Mexico",
            },
          ],
          orientation: "portrait",
          disclosure: "Representative MLB-, NHL-, and Fan Town-branded podium visualizations.",
        },
      ],
    },
    workflow: {
      eyebrow: "The Jibe Retail flow",
      title: "Listen, solve, fulfill, and learn in one journey.",
      description:
        "The deployment can stop after a short survey, operate as ecommerce, or connect both based on the shopper's response.",
      steps: [
        {
          number: "01",
          title: "Engage",
          description:
            "Invite the shopper into a fast, branded experience on a podium, kiosk, mobile device, or another venue touchpoint.",
        },
        {
          number: "02",
          title: "Understand",
          description:
            "Ask what happened, what the shopper was looking for, and which availability, service, or experience issue shaped the visit.",
        },
        {
          number: "03",
          title: "Fulfill",
          description:
            "When commerce is enabled, guide the shopper to the right item and use QR to continue checkout on their phone for home delivery.",
        },
        {
          number: "04",
          title: "Learn",
          description:
            "Organize feedback and unmet demand by venue, product, category, size, experience issue, and time so teams can act at scale.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Built for the venue",
      title: "Flexible at the front end. Useful behind the scenes.",
      description:
        "Jibe Retail adapts to the brand and journey while creating structured experience and demand data for the team operating the venue.",
      items: [
        {
          title: "Branded, multilingual surveys",
          description: "Ask concise questions in the organization's visual language and the shopper's preferred language.",
        },
        {
          title: "Adaptive journey logic",
          description: "Use an answer to reveal the right follow-up, additional feedback prompt, or product finder.",
        },
        {
          title: "Catalog and product discovery",
          description: "Guide shoppers across leagues, teams, categories, products, variations, and sizes.",
        },
        {
          title: "QR checkout continuation",
          description: "Move the selected basket to the shopper's phone to continue checkout and arrange home delivery.",
        },
        {
          title: "Podium, kiosk, and mobile delivery",
          description: "Deploy the experience through the physical and digital touchpoints that fit the venue.",
        },
        {
          title: "Experience and demand reporting",
          description: "See feedback, missing products, category demand, service friction, and follow-up opportunities together.",
        },
      ],
    },
    proof: {
      eyebrow: "Demand made visible",
      title: "See the opportunities that transaction data cannot explain alone.",
      description:
        "Survey responses, product intent, and in-venue behavior create a more complete view of what shoppers wanted and what stood in the way.",
      items: [
        {
          eyebrow: "Fan Town · Mexico",
          title: "Localize the journey without changing the platform underneath it.",
          description:
            "Fan Town shows how language, sport, brand, and journey logic can be configured for the market while preserving the same survey, product-discovery, and reporting foundation.",
        },
        {
          eyebrow: "MLB NYC Flagship Store",
          title: "Captured unmet merchandise demand at item level.",
          description:
            "Recorded shopper intent exposed patterns across merchandise category, product availability, sizing, and navigation—signals that were absent from the transaction record.",
          metrics: [
            { value: "$1.2M", label: "Scaled demand opportunity identified" },
            { value: "3,972", label: "Unfulfilled merchandise requests" },
            { value: "68%", label: "Size-related friction in recorded demand" },
          ],
        },
        {
          eyebrow: "NHL · Ecommerce journey",
          title: "Keep an unavailable item from ending the purchase journey.",
          description:
            "The NHL experience demonstrates guided product discovery, cart review, QR handoff to the shopper's phone, and home delivery through the connected commerce environment.",
        },
      ],
      note:
        "Reporting note: deployment figures describe captured responses, expressed unmet demand, and estimated opportunity identified through Jibe Retail. Dollar values do not represent booked, realized, or recovered revenue.",
    },
    cta: {
      eyebrow: "Build the right Retail experience",
      title: "Start with surveys, ecommerce, or the power of both.",
      description:
        "Show us the venue, customer journey, and commerce environment. We will demonstrate how Jibe Retail can fit the moment and the brand around it.",
      href: "/demo?product=retail",
      label: "Book a Retail demo",
    },
  },

  ai: {
    slug: "ai",
    hero: {
      productName: "Jibe AI",
      productLabel: "AI",
      descriptor: "Interaction Intelligence",
      line1: "Find the signal.",
      line2: "Know the next move.",
      description:
        "Jibe AI turns the interaction stream into explainable intelligence—connecting performance shifts with root causes, evidence, and practical recommendations.",
      primaryHref: "/demo?product=ai",
      primaryLabel: "Book an AI demo",
      secondaryHref: "#overview",
      secondaryLabel: "Explore Jibe AI",
      proofPoints: ["Full-interaction analytics", "Calibrated against feedback", "KPI-to-verbatim drill-down", "Prescriptive recommendations"],
    },
    pathways: {
      eyebrow: "What Jibe AI does",
      title: "Move from a changing metric to a clear next move.",
      description:
        "Jibe AI organizes the wider interaction stream, explains what is driving the result, and keeps every recommendation connected to evidence.",
      items: [
        {
          id: "understand",
          label: "Understand",
          title: "Bring the customer story together across interactions.",
          description:
            "Unify chat, email, case, and voice context around the customer journey, while preserving real survey responses as an important outcome and calibration signal.",
          outcomes: [
            "Create a coherent view across interaction channels",
            "Structure sentiment, emotion, contact reason, root cause, and resolution",
            "Use customer responses to audit and strengthen confidence in predictions",
          ],
        },
        {
          id: "explain",
          label: "Explain",
          title: "Know which issues are moving the outcome and why.",
          description:
            "Move from a portfolio-level change to the contact reasons, volume patterns, agent impact, and verbatims behind it without losing the original evidence.",
          outcomes: [
            "Rank contact reasons by impact and volume",
            "Trace a KPI shift to root cause and affected interactions",
            "Compare quartiles to identify the behaviors associated with better outcomes",
          ],
        },
        {
          id: "act",
          label: "Act",
          title: "Turn analysis into practical guidance for the team.",
          description:
            "Surface focused opportunities and prescriptive best practices grounded in the conversations and behaviors already producing stronger results.",
          outcomes: [
            "Prioritize the issues and teams that deserve attention first",
            "Give QA and coaching a defensible evidence trail",
            "Translate top-performer behavior into a specific next action",
          ],
        },
      ],
    },
    media: {
      eyebrow: "Jibe AI in action",
      title: "From portfolio signal to root cause to a better response.",
      description:
        "Each view moves the user closer to the evidence and the decision it can support.",
      items: [
        {
          id: "overview",
          label: "Portfolio health",
          eyebrow: "Performance overview",
          title: "See the program at a glance.",
          description:
            "Bring CSAT, resolution, interaction volume, response volume, accuracy, and quartile performance into one operating view.",
          src: "assets/jibe-ai/performance-overview.png",
          alt: "Jibe AI overview showing CSAT, resolution, interaction summary, accuracy, and quartile performance.",
          disclosure: "Product interface shown with example program data.",
        },
        {
          id: "impact",
          label: "Driver impact",
          eyebrow: "Contact reason analysis",
          title: "Know which contact reasons are moving the outcome.",
          description:
            "Map volume change against CSAT or resolution impact, then rank the issues that warrant attention first.",
          src: "assets/jibe-ai/contact-reason-impact.png",
          alt: "Jibe AI contact reason impact analysis showing a scatter plot and ranked CSAT drivers.",
          disclosure: "Product interface shown with example program data.",
        },
        {
          id: "opportunity",
          label: "Best practice",
          eyebrow: "Prescriptive analysis",
          title: "Turn a root cause into a practical response.",
          description:
            "Move from performance and quartile analysis to agent impact, transcripts, and best-practice guidance grounded in stronger outcomes.",
          src: "assets/jibe-ai/best-practice-opportunity.png",
          alt: "Jibe AI root cause analysis showing performance, quartile analysis, agent impact, and recommended best practices.",
          orientation: "tall",
          disclosure: "Product interface shown with example program data.",
        },
      ],
    },
    workflow: {
      eyebrow: "The Jibe AI flow",
      title: "A traceable path from conversation to recommendation.",
      description:
        "The system expands context, structures the signal, checks confidence, and surfaces the action the evidence supports.",
      steps: [
        {
          number: "01",
          title: "Ingest",
          description:
            "Bring relevant chat, email, case, voice, survey, and operational context together around the interaction and customer journey.",
        },
        {
          number: "02",
          title: "Analyze",
          description:
            "Structure sentiment, emotion, reason for contact, root cause, resolution, volume, and outcome impact across the interaction stream.",
        },
        {
          number: "03",
          title: "Validate",
          description:
            "Use available customer responses and observed outcomes to audit predictions, compare quartiles, and make confidence visible.",
        },
        {
          number: "04",
          title: "Recommend",
          description:
            "Connect the priority to transcripts, agent impact, and top-performing behaviors, then surface a practical next move for the team.",
        },
      ],
    },
    capabilities: {
      eyebrow: "Structured interaction intelligence",
      title: "Query the pattern without losing the conversation behind it.",
      description:
        "Jibe AI connects the operating signal with the evidence needed to understand and act on it.",
      items: [
        {
          title: "Unified interaction context",
          description: "Organize relevant conversation, case, survey, and operating signals around the customer narrative.",
        },
        {
          title: "Contact-reason impact",
          description: "Rank issues by their relationship to CSAT, resolution, volume, and other program outcomes.",
        },
        {
          title: "Root-cause analysis",
          description: "Move past the top-line symptom to the policy, process, product, or behavior behind it.",
        },
        {
          title: "Traceable evidence",
          description: "Connect portfolio findings with affected interactions, transcripts, and agent-level impact.",
        },
        {
          title: "Quartile intelligence",
          description: "Compare performance groups to identify the behaviors associated with stronger customer outcomes.",
        },
        {
          title: "Prescriptive best practices",
          description: "Translate the evidence into focused guidance for operations, quality, coaching, and process teams.",
        },
      ],
    },
    proof: {
      eyebrow: "Evidence stays attached",
      title: "Every recommendation should show its work.",
      description:
        "Jibe AI is designed to preserve the path from the operating signal to the conversations and comparisons behind the next action.",
      items: [
        {
          eyebrow: "Program signal",
          title: "Start with the outcome that moved.",
          description:
            "A leader can begin with CSAT, resolution, interaction volume, accuracy, or quartile performance and see where the change is concentrated.",
        },
        {
          eyebrow: "Root cause",
          title: "Move from the metric to the reasons and interactions behind it.",
          description:
            "Contact-reason impact, volume, agent effect, and verbatims make the finding explainable rather than leaving it as an isolated score.",
        },
        {
          eyebrow: "Best practice",
          title: "Ground the next move in behavior already producing better outcomes.",
          description:
            "Quartile comparison and transcript evidence reveal practical approaches the organization can reinforce through process, QA, and coaching.",
        },
      ],
    },
    cta: {
      eyebrow: "See Jibe AI in context",
      title: "Turn the conversations you already have into clearer decisions.",
      description:
        "Bring your CX, operations, quality, or coaching question. We will show how Jibe AI connects the signal, evidence, and next action behind it.",
      href: "/demo?product=ai",
      label: "Book an AI demo",
    },
  },
} satisfies Record<ProductSlug, ProductPageConfig>;

export type ProductPageKey = keyof typeof productPages;
