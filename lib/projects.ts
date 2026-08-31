export type DivisionId = "ai" | "automation" | "products" | "web";

export type ProjectStatus = "LIVE" | "IN PROGRESS" | "BUILDING" | "EXPERIMENT" | "CASE STUDY";

export interface Division {
    id: DivisionId;
    index: string;
    title: string;
    tagline: string;
    color: string;
    textColor: string;
}

/** The four divisions reflecting the AI → Automation → Products → Web hierarchy */
export const divisions: Division[] = [
    {
        id: "ai",
        index: "01",
        title: "Generative AI",
        tagline: "Conversational agents, structured prompt systems, and generative intelligence.",
        color: "bg-acid",
        textColor: "text-ink",
    },
    {
        id: "automation",
        index: "02",
        title: "Automation & Pipelines",
        tagline: "n8n workflows, webhook integrations, APIs, and multi-stage AI pipelines.",
        color: "bg-electric",
        textColor: "text-cream",
    },
    {
        id: "products",
        index: "03",
        title: "Full-Stack Products",
        tagline: "Complete product builds connecting modern frontend and intelligent backend services.",
        color: "bg-hotpink",
        textColor: "text-cream",
    },
    {
        id: "web",
        index: "04",
        title: "Frontend & Web",
        tagline: "Responsive web experiences, clean user interfaces, and interaction design.",
        color: "bg-vivid",
        textColor: "text-cream",
    },
];

export interface Project {
    id: string;
    slug: string;
    title: string;
    status: ProjectStatus;
    category: string;
    description: string;
    longDescription: string;
    tech: string[];
    signals: { label: string; value: string }[];
    color: string;
    textColor: string;
    division: DivisionId;
    /** GitHub repo URL */
    link?: string;
    /** Live demo / production URL */
    liveDemo?: string;
    featured?: boolean;
    problem: string;
    approach: string;
    architecture?: string;
    technologies: string[];
    outcomes: string[];
}

export const projects: Project[] = [
    {
        id: "001",
        slug: "legal-ai-agent",
        division: "ai",
        featured: true,
        status: "LIVE",
        category: "Generative AI · Conversational AI",
        title: "Legal AI Agent",
        description: "An experimental conversational AI assistant designed to explore structured interactions and question-answering workflows around legal information.",
        longDescription: "Legal AI Agent is an experimental conversational application built with Python and Streamlit that explores prompt-driven reasoning and structured response generation for legal information queries. It allows users to interact with conversational AI workflows that synthesize legal concepts into clear, structured explanations without serving as a replacement for legal counsel.",
        tech: ["Python", "Streamlit", "Generative AI", "Prompt Engineering", "Conversational AI", "Structured Outputs"],
        signals: [
            { label: "Status", value: "Live Application" },
            { label: "Deployment", value: "Streamlit Cloud" },
            { label: "Architecture", value: "Prompt-Driven" },
        ],
        color: "bg-acid",
        textColor: "text-ink",
        link: "https://github.com/nandu-reddy-kalluri/legal-ai-agent",
        liveDemo: "https://legal-ai-agent-vdypr3xqmd6cvk7tr8d2r9.streamlit.app/",
        problem: "Legal terminology and information structures are notoriously dense and difficult for everyday users to navigate without structured guidance and accessible interfaces.",
        approach: "Built a dedicated conversational interface with disciplined prompt constraints that parses legal queries, structures responses systematically, and provides contextual explanations in an accessible UI.",
        architecture: "User Query → Streamlit Frontend → Prompt Processing Layer → Generative AI Model → Response Structuring & Formatting → Interactive UI Display",
        technologies: ["Python", "Streamlit", "Generative AI", "Prompt Engineering", "Conversational AI API"],
        outcomes: [
            "Deployed live application running on Streamlit Cloud with public access",
            "Public open-source repository on GitHub with clean modular code",
            "Structured response templates ensuring coherent, categorized explanations",
            "Clear informational posture designed specifically for educational and exploratory workflows",
        ],
    },
    {
        id: "002",
        slug: "wearrange",
        division: "products",
        featured: true,
        status: "BUILDING",
        category: "Full-Stack Product · Wedding Technology",
        title: "WeArrange",
        description: "A modern wedding venue discovery and booking platform focused on helping users discover, compare, and evaluate wedding venues seamlessly.",
        longDescription: "WeArrange is a full-stack product engineered to streamline the fragmented wedding-planning experience. It features intelligent venue discovery, multi-attribute venue comparisons, transparent pricing breakdowns, and structured wedding planning workflows. The platform is designed as an end-to-end product architecture spanning vendor management, venue listing, and user decision tools.",
        tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Full-Stack Architecture"],
        signals: [
            { label: "Status", value: "Building / In Progress" },
            { label: "Focus", value: "Venue Discovery" },
            { label: "Scope", value: "Full-Stack Web App" },
        ],
        color: "bg-hotpink",
        textColor: "text-cream",
        problem: "Finding, comparing, and coordinating wedding venues is currently fragmented across outdated directories, hidden pricing models, and disorganized communication channels.",
        approach: "Developing a unified product platform with modern discovery filters, side-by-side venue evaluation, structured pricing information, and intelligent planning workflows.",
        architecture: "Client (Next.js / React) → API Routes & Backend Services → Database / Storage Layer → Venue Catalog & Workflow Management",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
        outcomes: [
            "Engineered complete venue discovery and comparison UI components",
            "Structured venue detail hierarchies and pricing calculation workflows",
            "Designed scalable component architecture for vendor and venue data management",
            "Built with responsive, mobile-first design principles for all screen sizes",
        ],
    },
    {
        id: "003",
        slug: "whatsapp-ai-chatbot",
        division: "automation",
        featured: true,
        status: "IN PROGRESS",
        category: "Generative AI · Automation",
        title: "AI WhatsApp Product Bot",
        description: "An AI-powered conversational system on WhatsApp helping users discover products, check pricing, and receive purchase links via automated workflows.",
        longDescription: "An intelligent automation system integrating WhatsApp messaging with Google Gemini AI and n8n workflow orchestration. Users can converse naturally on WhatsApp to request product recommendations, compare pricing, and receive direct purchase links. The system manages webhook ingestion, context-aware prompt parsing, product catalog lookup, and rapid conversational response generation.",
        tech: ["Google Gemini AI", "Twilio WhatsApp API", "n8n", "Webhooks", "API Integration", "Prompt Engineering"],
        signals: [
            { label: "Status", value: "Workflow Automation" },
            { label: "Integration", value: "Twilio + n8n" },
            { label: "Model", value: "Google Gemini" },
        ],
        color: "bg-electric",
        textColor: "text-cream",
        problem: "Users often want instant product guidance and purchasing links within their default messaging app without browsing cluttered e-commerce catalogues.",
        approach: "Connected WhatsApp webhooks via Twilio into an n8n automation engine that triggers Google Gemini AI with customized product prompts and returns rich conversational responses.",
        architecture: "User ↓ WhatsApp ↓ Twilio ↓ n8n Workflow ↓ Gemini AI ↓ Product Data ↓ Response ↓ WhatsApp",
        technologies: ["Google Gemini AI", "Twilio API", "n8n Workflow Automation", "Webhooks", "REST APIs", "Prompt Engineering"],
        outcomes: [
            "Designed end-to-end automated workflow from WhatsApp message trigger to AI reply",
            "Structured prompt templates for product matching and pricing delivery",
            "Configured webhook handling and payload parsing inside n8n",
            "Created reusable conversational pipeline adaptable to multiple product domains",
        ],
    },
    {
        id: "004",
        slug: "cup-cozy",
        division: "web",
        featured: true,
        status: "LIVE",
        category: "Frontend · Web Development",
        title: "Cup Cozy",
        description: "A modern responsive web project focused on creating a polished product experience with strong visual presentation and responsive frontend development.",
        longDescription: "Cup Cozy is a dedicated web experience built to demonstrate strong frontend execution, responsive layout craftsmanship, and interactive user interface design. Deployed live on Vercel with source available on GitHub, the project emphasizes clean semantic structure, fluid mobile-to-desktop transitions, and visual storytelling.",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Web Design", "UI/UX Design", "Vercel"],
        signals: [
            { label: "Status", value: "Live on Vercel" },
            { label: "Repo", value: "Open Source" },
            { label: "Focus", value: "Responsive UI/UX" },
        ],
        color: "bg-vivid",
        textColor: "text-cream",
        link: "https://github.com/nandu-reddy-kalluri/CUP-COZY",
        liveDemo: "https://cup-cozy-site.vercel.app/",
        problem: "Translating brand aesthetics into a lightweight, fast-loading, and completely responsive web interface across diverse mobile and desktop screen sizes.",
        approach: "Built a responsive web experience with deliberate visual hierarchy, fluid CSS grid and flexbox layouts, and optimized client performance.",
        architecture: "Client Web Interface → Responsive DOM Structure → Dynamic Styling & Layout Engine → Vercel Edge Hosting",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Vercel Deployment"],
        outcomes: [
            "Deployed live production site on Vercel",
            "Maintained open-source repository on GitHub",
            "Achieved full responsiveness across mobile (375px+), tablet, and desktop screens",
            "Clean layout structure with modern typography and visual hierarchy",
        ],
    },
    {
        id: "005",
        slug: "ai-public-safety-monitoring",
        division: "ai",
        featured: false,
        status: "EXPERIMENT",
        category: "AI / Experiments · Computer Vision",
        title: "AI Public Safety Monitoring",
        description: "An AI-based monitoring concept exploring automated detection, threat identification, and severity analysis for public safety scenarios.",
        longDescription: "An AI monitoring concept exploring automated analysis of safety-related incidents in urban environments. The research concept investigates workflows for automated event detection, risk classification, and severity scoring across scenarios including fire hazards, violence detection, women's safety alerts, and street incident monitoring.",
        tech: ["Python", "AI Monitoring Workflows", "Event Detection Concepts", "Risk Modeling", "Severity Analysis"],
        signals: [
            { label: "Status", value: "Research Concept" },
            { label: "Domain", value: "Public Safety" },
            { label: "Scope", value: "Incident Analysis" },
        ],
        color: "bg-acid",
        textColor: "text-ink",
        problem: "Manual incident monitoring in public areas lacks automated triage for fast threat classification and escalation.",
        approach: "Formulated conceptual AI pipelines that classify incoming surveillance feeds into structured event categories with severity indicators.",
        architecture: "Video / Sensor Feed → Ingestion Pipeline → Event Detection & Anomaly Model → Severity Classifier → Alert Dispatch Concept",
        technologies: ["Python", "Event Detection", "Risk Classification", "AI Pipeline Concepts"],
        outcomes: [
            "Documented safety monitoring classification taxonomy across 4 critical risk scenarios",
            "Designed pipeline workflow for automated severity scoring and alert triggers",
            "Explored integration points with notification systems and dashboard monitoring",
        ],
    },
    {
        id: "006",
        slug: "ai-workflow-experiments",
        division: "automation",
        featured: false,
        status: "EXPERIMENT",
        category: "AI / Experiments · Agents & Automation",
        title: "AI Workflow Experiments",
        description: "A collection of experiments exploring AI agents, prompt engineering, workflow automation, and intelligent API-driven processes.",
        longDescription: "A series of engineering experiments focused on autonomous AI agent patterns, multi-step prompt chains, and automated tool integrations. Exploring how models like Claude and Google Gemini interact with webhooks, external APIs, and n8n nodes to execute non-trivial multi-step automated tasks.",
        tech: ["Claude", "Google Gemini", "n8n", "AI Agents", "Prompt Engineering", "Webhooks", "REST APIs"],
        signals: [
            { label: "Status", value: "Active Experiments" },
            { label: "Tools", value: "Gemini · Claude · n8n" },
            { label: "Focus", value: "Agentic Workflows" },
        ],
        color: "bg-electric",
        textColor: "text-cream",
        problem: "Single-prompt LLM interactions fail when tasks require multi-step reasoning, external data retrieval, validation, and action execution.",
        approach: "Structured agent workflows that combine structured prompting, validation gates, and API tools into automated execution graphs.",
        architecture: "Trigger / Prompt → Agent Execution Loop → Tool Calling & API Action → Validation Gate → Structured Result",
        technologies: ["Claude", "Google Gemini", "n8n", "AI Agents", "Prompt Engineering", "API Integration"],
        outcomes: [
            "Built and tested multi-step agent loops with error recovery and retry logic",
            "Configured webhook-driven API triggers connecting LLMs to external services",
            "Evaluated structured output consistency across different prompt architectures",
        ],
    },
];

export const projectCount = projects.length;
export const liveAppCount = projects.filter((p) => p.status === "LIVE").length;
export const inProgressCount = projects.filter((p) => p.status === "BUILDING" || p.status === "IN PROGRESS").length;

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getProjectsByDivision(division: DivisionId): Project[] {
    return projects.filter((p) => p.division === division);
}
