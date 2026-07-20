import type { ProductPageConfig, ProductSlug } from "../components/product/productPage.types";

export const productPages = {
  pro: {
    slug: "pro",
    hero: {
      productName: "Jibe Pro",
      productLabel: "Pro",
      descriptor: "Customer Experience Performance",
      // COPY REVIEW — PRO-01 / D-01: agent-centered hero draft requires final approval.
      line1: "Make every agent",
      line2: "the voice of the customer.",
      description:
        "Jibe Pro connects frontline predictions, customer feedback, and operational performance so leaders can focus quality, coach with evidence, and prove what changed.",
      // COPY REVIEW / BLOCKED — CONTACT-01 / D-10: interim label only; duration and direct scheduling are not approved.
      primaryHref: "/contact?product=pro",
      primaryLabel: "Start a conversation",
      secondaryHref: "#overview",
      secondaryLabel: "Explore Jibe Pro",
      // COPY REVIEW — PRO-02 / D-02A: keep these static until anchor behavior is approved.
      proofPoints: [
        "Agent survey predictions",
        "Compare where customer responses are available",
        "Broader predicted coverage",
        "Evidence for QA and CX",
      ],
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
            "Where a customer survey response is available, compare it with the earlier frontline prediction",
            "Keep participation, coverage, and data quality visible",
          ],
        },
        {
          id: "improve",
          label: "Improve",
          // COPY REVIEW — PRO-04: behavior-and-empathy lead draft.
          title: "Help agents represent the customer more deliberately.",
          description:
            "Making a structured prediction asks agents to consider how the customer experienced the interaction. Leaders can then connect prediction patterns, available customer feedback, QA evidence, and coaching actions to focus improvement.",
          outcomes: [
            "Prioritize QA around risk and opportunity instead of random sampling",
            "Encourage closer attention to customer cues and established QA guidance",
            "Give agents a personal view of progress, prediction accuracy, and coaching actions",
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
            "Use the evidence to recommend whether to expand, adjust, or stop",
          ],
        },
      ],
    },
    media: {
      // VERIFY / BLOCKED — G-03: review every name, date, figure, and test-data field in these screenshots before release.
      eyebrow: "Jibe Pro in action",
      title: "One customer signal. The right view for every role.",
      description:
        "Managers, supervisors, agents, QA teams, coaches, and reporting users see the level of detail their work requires.",
      items: [
        {
          id: "manager",
          label: "Manager home",
          eyebrow: "Program performance",
          title: "See the whole program—and the drivers behind it.",
          description:
            "Compare teams, monitor participation and prediction accuracy, and surface the positive and negative drivers that need attention.",
          src: "assets/jibe-pro/screens/manager-home.png",
          alt: "Jibe Pro manager home view showing NPS, resolution, participation, team rankings, performance drivers, and team detail.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "supervisor",
          label: "Supervisor home",
          eyebrow: "Team action",
          title: "Turn today’s team signals into the next coaching priority.",
          description:
            "See which sessions are required, which agents are changing, and which customer issues deserve focused review.",
          src: "assets/jibe-pro/screens/supervisor-home.png",
          alt: "Jibe Pro supervisor home view showing team performance, required Jibing sessions, agent insights, and customer impact.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "agent",
          label: "Agent home",
          eyebrow: "Personal performance",
          title: "Give every agent a clear view of progress and recognition.",
          description:
            "Personal metrics, prediction accuracy, recognition, and focused improvement guidance make performance tangible.",
          src: "assets/jibe-pro/screens/agent-home.png",
          alt: "Jibe Pro agent home view showing achievements, personal outcomes, prediction accuracy, insights, and interaction detail.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "best-practice",
          label: "Best practice finder",
          eyebrow: "Performance intelligence",
          title: "Find the behaviors behind top performance.",
          description:
            "Identify high-performing agents for a contact reason, compare volume, handle time, and NPS, and move directly into the supporting interactions.",
          src: "assets/jibe-pro/screens/best-practice-agents.png",
          alt: "Jibe Pro best-practice identifier showing top agents for billing issues with interaction volume, handle time, and NPS.",
          orientation: "landscape",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "evidence",
          label: "Interaction evidence",
          eyebrow: "Transcript-level evidence",
          title: "Move from the pattern to the exact customer interaction.",
          description:
            "Review the performance summary, recent interactions, transcript summaries, and the exact evidence behind a best-practice recommendation.",
          src: "assets/jibe-pro/screens/interaction-transcripts.png",
          alt: "Jibe Pro interaction evidence view showing an agent performance summary, recent interactions, transcript summaries, and transcript controls.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
        {
          id: "reporting",
          label: "Reporting hub",
          eyebrow: "Configurable reporting",
          title: "Build and share the KPI view each stakeholder needs.",
          description:
            "Choose the measures, time horizon, and comparison that fit the decision without disconnecting the result from its source data.",
          src: "assets/jibe-pro/screens/reporting-hub.png",
          alt: "Jibe Pro reporting hub showing configurable KPI cards, volume measures, trend charts, and metric controls.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Configurations and metrics vary by program.",
        },
      ],
    },
    workflow: {
      eyebrow: "The Jibe Pro loop",
      // COPY REVIEW — PRO-07 / D-03: four-step presentation retained pending the four-versus-five decision.
      title: "A continuous loop from agent prediction to measurable action.",
      description:
        "Each interaction can add frontline context. Where customer feedback is available, teams can compare it with the earlier prediction and use the combined evidence to focus improvement.",
      steps: [
        {
          number: "01",
          label: "Predict",
          title: "Agent Prediction",
          description:
            "Immediately after an interaction, the frontline employee predicts the customer's responses against the client's current structured survey or KPI model.",
        },
        {
          number: "02",
          label: "Audit",
          title: "Customer Audit",
          description:
            "Where an actual customer survey response is available, compare it with the earlier agent prediction to make alignment and blind spots measurable.",
        },
        {
          number: "03",
          label: "Behavior",
          title: "Agent Behavior",
          description:
            "Responsibility for representing the customer's voice can encourage closer attention to QA guidance and help agents surface fixable process, policy, product, or interaction problems.",
        },
        {
          number: "04",
          label: "Improve",
          title: "Turn evidence into focused action",
          description:
            "Broader predicted-outcome coverage and contact-reason analysis can surface specific opportunities. Teams can act on those insights, measure what changes, and carry the evidence into the next cycle.",
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
          description: "Support rollout with access controls, hierarchy management, governance, and data-quality visibility.",
        },
      ],
    },
    proof: {
      eyebrow: "Evidence by design",
      // COPY REVIEW — PRO-09 / D-04: data-led headline draft requires final approval.
      title: "Your data should lead to a decision—not a debate.",
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
      // COPY REVIEW / BLOCKED — CONTACT-01 / D-10.
      href: "/contact?product=pro",
      label: "Start a conversation",
    },
  },

  retail: {
    slug: "retail",
    hero: {
      productName: "Jibe Retail",
      productLabel: "Retail",
      descriptor: "In-Venue Surveys & E-commerce",
      line1: "Survey, E-commerce",
      line2: "or both.",
      description:
        "Jibe Retail helps venues collect feedback, find missing merchandise, and continue purchases for home delivery through a branded survey, an ecommerce experience, or both.",
      // COPY REVIEW / BLOCKED — CONTACT-01 / D-10: interim label only; duration and direct scheduling are not approved.
      primaryHref: "/contact?product=retail",
      primaryLabel: "Start a conversation",
      secondaryHref: "#overview",
      secondaryLabel: "Explore Jibe Retail",
      proofPoints: ["Branded surveys", "Extended-aisle e-commerce", "Connected journeys", "Item-level insight"],
    },
    pathways: {
      eyebrow: "Two connected capabilities",
      title: "Recover the sale.\nUnderstand what\nstopped it.",
      description:
        "Use ecommerce to keep a purchase moving, use survey to learn why a shopper did not buy, or connect the two in one branded experience.",
      items: [
        {
          id: "ecommerce",
          label: "Ecommerce",
          // COPY REVIEW — RET-03: revenue-first ecommerce draft.
          title: "Recover the sale when the shelf cannot.",
          description:
            "When a product or size is unavailable—or the shopper would rather have it delivered—help them find the item, continue on their phone, and choose home delivery.",
          outcomes: [
            "Keep an unavailable product or size from ending the purchase journey",
            "Guide shoppers to the relevant item, variation, and delivery option",
            "Continue the basket by QR on the shopper's phone",
          ],
        },
        {
          id: "survey",
          label: "Survey",
          // COPY REVIEW — RET-04: nonpurchase-focused survey draft.
          title: "When shoppers cannot find it, let them tell you why.",
          description:
            "Ask a concise, branded question about the purchase that did not happen. Capture whether availability, product, size, or another merchandise need prevented the shopper from buying what they wanted.",
          outcomes: [
            "Understand whether the shopper found the product they came to buy",
            "Organize missing merchandise demand by product, variation, and size",
            "Use the answer to reveal a relevant follow-up or product-discovery path",
          ],
        },
      ],
    },
    media: {
      layout: "gallery",
      // VERIFY / BLOCKED — RET-09 / D-08: all Fan Town, MLB, NHL, team, venue, catalog, and podium assets require written public-use approval.
      eyebrow: "Jibe Retail in action",
      title: "Designed around the venue, the brand, and the shopper.",
      description:
        "The same responsive experience can support a podium, kiosk, mobile device, survey flow, merchandise journey, or connected deployment.",
      items: [
        {
          id: "mlb-front",
          label: "MLB survey entry",
          eyebrow: "MLB NYC / Branded survey",
          title: "Turn a store visit into a measurable customer signal.",
          description:
            "Invite shoppers into a fast, branded survey with a clear incentive—creating feedback the venue can connect to follow-up behavior and conversion.",
          src: "assets/jibe-retail/screens/mlb-front.png",
          alt: "MLB NYC Jibe Retail survey entry screen inviting shoppers to start a survey for a store discount.",
          orientation: "portrait",
          disclosure: "Representative branded experience. Incentives and survey configurations vary by deployment.",
        },
        {
          id: "mlb-instore",
          label: "MLB in-store result",
          eyebrow: "MLB NYC / Assisted fulfillment",
          title: "Close the loop when the item is available in the venue.",
          description:
            "Confirm that the requested item is available, direct the shopper to an associate, and preserve a home-delivery option when carrying the purchase is inconvenient.",
          src: "assets/jibe-retail/screens/mlb-instore.png",
          alt: "MLB Jibe Retail screen confirming a New York Mets jersey is available in store and offering assisted home delivery.",
          orientation: "portrait",
          disclosure: "Representative branded experience. Inventory and fulfillment options vary by deployment.",
        },
        {
          id: "nhl-front",
          label: "NHL ecommerce entry",
          eyebrow: "NHL / Extended aisle",
          title: "Give every shopper another path to the merchandise they want.",
          description:
            "A venue-branded entry point moves shoppers from an unavailable shelf to more teams, sizes, and styles—with online checkout and delivery built into the journey.",
          src: "assets/jibe-retail/screens/nhl-front.png",
          alt: "NHL Jibe Retail ecommerce entry screen inviting shoppers to find NHL gear for home delivery.",
          orientation: "portrait",
          disclosure: "Representative branded experience. Catalogs and fulfillment options vary by deployment.",
        },
        {
          id: "checkout",
          label: "NHL cart & QR checkout",
          eyebrow: "NHL / Continue the purchase",
          title: "Move the basket to the shopper's phone for checkout and delivery.",
          description:
            "A shopper can review the selected items, scan a QR code, continue checkout on their own device, and have the order shipped home.",
          src: "assets/jibe-retail/screens/nhl-cart.png",
          alt: "Updated Jibe Retail NHL cart showing a selected Boston Bruins jersey and a QR code to complete checkout for home delivery.",
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
              screenSrc: "assets/jibe-retail/screens/mlb-front.png",
              videoSrc: "assets/jibe-retail/videos/mlb-podium.mp4",
              screenVariant: "mlb",
            },
            {
              src: "assets/podiums/jibe-retail-nhl.png",
              alt: "Jibe Retail podium with an NHL wrap and an ecommerce home-delivery experience on screen.",
              label: "NHL",
              screenSrc: "assets/jibe-retail/screens/nhl-front.png",
              videoSrc: "assets/jibe-retail/videos/nhl-podium.mp4",
              screenVariant: "nhl",
            },
            {
              src: "assets/podiums/jibe-retail-fan-town.png",
              alt: "Jibe Retail podium with a Fan Town wrap and a Spanish-language product finder on screen.",
              label: "Fan Town Mexico",
              screenSrc: "assets/jibe-retail/sport-selector.png",
              videoSrc: "assets/jibe-retail/videos/fan-town-podium.mp4",
              screenVariant: "fan-town",
            },
          ],
          orientation: "portrait",
          disclosure: "Representative MLB-, NHL-, and Fan Town-branded podium visualizations.",
        },
      ],
    },
    reporting: {
      eyebrow: "Retail intelligence",
      title: "See performance. Prove the return.",
      description:
        "Connect survey participation, QR redirects, purchase conversions, item demand, audience segments, and location patterns in one measurable operating view.",
      featured: [
        {
          id: "roi-dashboard",
          eyebrow: "Executive ROI dashboard",
          title: "Connect survey engagement to attributed conversion revenue.",
          src: "assets/jibe-retail/analytics/roi-dashboard.png",
          alt: "Jibe Retail NHL Shop NYC dashboard showing survey ROI, converted sales, redirects, conversion rate, order value, missing merchandise, and survey outcomes.",
        },
        {
          id: "location-dashboard",
          eyebrow: "Location intelligence",
          title: "See where responses originate and where demand is concentrated.",
          src: "assets/jibe-retail/analytics/location-dashboard.png",
          alt: "Jibe Retail NHL Shop NYC dashboard mapping survey responses by city and market alongside ROI and survey outcome summaries.",
        },
      ],
      reports: [
        {
          id: "segment-report",
          eyebrow: "Customer segments",
          title: "Compare redirect, conversion, order value, and revenue by audience.",
          src: "assets/jibe-retail/analytics/roi-by-segment.png",
          alt: "Jibe Retail ROI report comparing survey redirects, conversions, conversion rates, order values, and revenue by customer segment.",
        },
        {
          id: "conversion-report",
          eyebrow: "Conversion performance",
          title: "Identify the teams, products, days, and hours driving revenue.",
          src: "assets/jibe-retail/analytics/conversion-performance.png",
          alt: "Jibe Retail conversion report ranking teams by revenue and comparing conversions by day of week and time of day.",
        },
        {
          id: "executive-report",
          eyebrow: "Executive ROI report",
          title: "Package attributed revenue and the conversion funnel for leadership.",
          src: "assets/jibe-retail/analytics/roi-report.png",
          alt: "Jibe Retail executive ROI report showing attributed revenue, redirects, conversions, conversion rate, and survey-to-purchase funnel.",
        },
      ],
      note: "Product interface shown with demonstration data. Figures shown are illustrative and are not customer results or performance claims.",
    },
    workflow: {
      eyebrow: "The Jibe Retail flow",
      // COPY REVIEW — RET-06 / D-06: paired capability-to-outcome draft requires final label approval.
      title: "Understand the need. Save the sale.",
      description:
        "Jibe Retail supports two connected paths: one keeps a purchase moving; the other turns customer feedback into a useful operating signal.",
      layout: "paired",
      steps: [
        {
          number: "01",
          label: "Transact",
          title: "Keep the purchase moving.",
          description:
            "When stock, size, carrying, or delivery creates friction, guide the shopper toward a relevant product and continue the basket on their phone.",
        },
        {
          number: "02",
          label: "Increased Revenue",
          title: "Create another path to purchase.",
          description:
            "An extended-aisle journey gives the shopper another way to complete a purchase that might otherwise end when the item is unavailable or inconvenient to carry.",
        },
        {
          number: "03",
          label: "Understand",
          title: "Learn what shaped the visit.",
          description:
            "Ask about product, service, staff engagement, checkout, and the specific reason the shopper did not find or buy what they wanted.",
        },
        {
          number: "04",
          label: "Actionable Insights",
          title: "Turn feedback into a specific operating signal.",
          description:
            "Organize feedback and unmet demand by venue, product, category, size, experience issue, and time so the team can see where attention is warranted.",
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
          eyebrow: "Localized venue journey",
          title: "Fit the market without changing the platform underneath it.",
          description:
            "Language, brand, sport, and journey logic can be configured for a venue while preserving the same survey, product-discovery, and reporting foundation.",
        },
        {
          eyebrow: "Item-level demand",
          title: "Make unmet merchandise demand visible.",
          description:
            "Recorded shopper intent can expose patterns across merchandise category, product availability, sizing, and navigation—signals that do not appear in completed transaction data.",
        },
        {
          eyebrow: "Connected ecommerce journey",
          title: "Keep an unavailable item from ending the purchase journey.",
          description:
            "Guided product discovery, cart review, and QR handoff can move the basket to the shopper's phone and continue the configured commerce journey.",
        },
      ],
    },
    cta: {
      eyebrow: "Build the right Retail experience",
      title: "Start with surveys, ecommerce, or the power of both.",
      description:
        "Show us the venue, customer journey, and commerce environment. We will demonstrate how Jibe Retail can fit the moment and the brand around it.",
      // COPY REVIEW / BLOCKED — CONTACT-01 / D-10.
      href: "/contact?product=retail",
      label: "Start a conversation",
    },
  },

  ai: {
    slug: "ai",
    hero: {
      productName: "Jibe AI",
      productLabel: "AI",
      descriptor: "Structured Survey Intelligence",
      // COPY REVIEW — AI-01 / D-09: autonomy is explicitly bounded to transcript analysis and prediction generation.
      line1: "Autonomous, AI‑driven",
      line2: "survey prediction.",
      description:
        "Jibe AI is an autonomous, AI-driven analysis layer that turns available interaction transcripts into AI-generated predictions against a structured survey model. It organizes the evidence behind changing patterns and recommends what to examine next. These predictions are not actual customer responses; where responses are available, teams can compare the two.",
      // COPY REVIEW / BLOCKED — CONTACT-01 / D-10: interim label only; duration and direct scheduling are not approved.
      primaryHref: "/contact?product=ai",
      primaryLabel: "Start a conversation",
      secondaryHref: "#overview",
      secondaryLabel: "Explore Jibe AI",
      proofPoints: [
        "Autonomous transcript analysis",
        "AI-generated survey predictions",
        "Evidence-linked root cause",
        "Recommended next actions",
      ],
    },
    pathways: {
      eyebrow: "What Jibe AI does",
      title: "From structured prediction to evidence and action.",
      description:
        "Jibe AI organizes interaction transcripts into structured survey predictions, explains what is driving a change, and keeps recommended next actions connected to evidence.",
      items: [
        {
          id: "understand",
          label: "Understand",
          // COPY REVIEW — AI-03: more-than-sentiment differentiator draft.
          title: "Go beyond binary sentiment with a structured survey prediction.",
          description:
            "Jibe AI produces an AI-generated prediction against a structured survey model. That prediction is not an actual customer response; where a response is available, the two can be compared without blurring the distinction.",
          outcomes: [
            "Generate a structured survey prediction from an interaction transcript",
            "Organize contact reason, root cause, resolution, and trend movement",
            "Compare with an actual customer response where one is available",
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
      // VERIFY / BLOCKED — AI-02 / D-09: screenshots contain visible accuracy and demonstration values; sanitize or approve them before release.
      eyebrow: "Jibe AI in action",
      title: "From portfolio signal to root cause to a better response.",
      description:
        "Each view moves the user closer to the evidence and the decision it can support.",
      items: [
        {
          id: "overview",
          label: "Executive overview",
          eyebrow: "Autonomous portfolio analysis",
          title: "See the signal, its impact, and the priority in one view.",
          description:
            "Jibe AI brings predicted CSAT and resolution, quartile performance, contact-reason impact, and ranked opportunities into one operating view.",
          src: "assets/jibe-ai/workspace-overview.png",
          alt: "Jibe AI executive workspace showing predicted CSAT and resolution, quartile performance, contact-reason impact, and ranked drivers.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Figures shown are not customer results or performance claims.",
        },
        {
          id: "best-practices",
          label: "Best practices",
          eyebrow: "Automated root-cause analysis",
          title: "Turn a detected issue into an evidence-backed response.",
          description:
            "Jibe AI explains what is driving the change, compares quartiles, and surfaces the behaviors associated with stronger outcomes.",
          src: "assets/jibe-ai/automated-best-practices.png",
          alt: "Jibe AI root-cause analysis for blackouts showing performance measures, quartile analysis, and automatically identified best practices.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Figures shown are not customer results or performance claims.",
        },
        {
          id: "agent-impact",
          label: "Agent impact",
          eyebrow: "Behavior-level evidence",
          title: "See who is succeeding—and what they do differently.",
          description:
            "Move from a portfolio pattern to top performers, recent interactions, and transcript-linked behaviors without losing the evidence trail.",
          src: "assets/jibe-ai/agent-impact-detail.png",
          alt: "Jibe AI agent-impact analysis showing a top performer, success analysis, recent interactions, and transcript links.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Figures shown are not customer results or performance claims.",
        },
        {
          id: "transcripts",
          label: "Transcripts",
          eyebrow: "Source evidence",
          title: "Keep every recommendation connected to the conversation.",
          description:
            "Review the interactions behind an issue, compare outcomes and resolution status, and open the full transcript when deeper validation is needed.",
          src: "assets/jibe-ai/transcript-library.png",
          alt: "Jibe AI transcript evidence list for blackouts showing interaction outcomes, resolution status, and full-transcript controls.",
          orientation: "tall",
          disclosure: "Product interface shown with demonstration data. Figures shown are not customer results or performance claims.",
        },
      ],
    },
    workflow: {
      eyebrow: "The Jibe AI flow",
      title: "A traceable path from transcript to structured prediction and action.",
      description:
        "The system structures the prediction, explains the evidence, compares available customer feedback, and surfaces the next action the analysis supports.",
      steps: [
        {
          number: "01",
          title: "Ingest",
          description:
            "Bring supported interaction transcripts and approved survey or operating context into the analysis.",
        },
        {
          number: "02",
          title: "Analyze",
          description:
            "Generate structured survey predictions and organize sentiment, contact reason, root cause, resolution, volume, and movement across the available transcript set.",
        },
        {
          number: "03",
          title: "Compare",
          description:
            "Where actual customer survey responses are available, compare them with the earlier AI-generated predictions while keeping the two sources distinct.",
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
      title: "More than sentiment—without losing the conversation behind it.",
      description:
        "Jibe AI connects a structured survey prediction with the evidence needed to understand what changed and decide what to examine next.",
      items: [
        {
          title: "Structured survey prediction",
          description: "Generate an AI prediction against the survey or KPI structure defined for the interaction program.",
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
      // COPY REVIEW — AI-03: explicit prediction-versus-response distinction draft.
      title: "A prediction is not a customer response—and the distinction matters.",
      description:
        "Jibe AI preserves the path from an AI-generated structured survey prediction to the transcript, operating context, and available customer feedback behind the next action.",
      items: [
        {
          eyebrow: "Structured prediction",
          title: "Create a consistent survey-shaped signal from the transcript.",
          description:
            "The prediction follows the defined survey or KPI structure so teams can examine movement across a broader interaction set without presenting it as direct customer feedback.",
        },
        {
          eyebrow: "Customer comparison",
          title: "Use real customer feedback where it is available.",
          description:
            "An actual customer survey response can be compared with the earlier prediction for the same interaction, making agreement and blind spots visible without implying blanket response coverage.",
        },
        {
          eyebrow: "Evidence to action",
          title: "Trace a changing signal to the conversations behind it.",
          description:
            "Contact-reason movement, transcript evidence, and comparison views help teams identify the issues and practices that warrant closer review.",
        },
      ],
    },
    cta: {
      eyebrow: "See Jibe AI in context",
      title: "Turn the conversations you already have into clearer decisions.",
      description:
        "Bring your CX, operations, quality, or coaching question. We will show how Jibe AI connects the signal, evidence, and next action behind it.",
      // COPY REVIEW / BLOCKED — CONTACT-01 / D-10.
      href: "/contact?product=ai",
      label: "Start a conversation",
    },
  },
} satisfies Record<ProductSlug, ProductPageConfig>;

export type ProductPageKey = keyof typeof productPages;
