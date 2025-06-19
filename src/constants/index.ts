import { BarChart, BookOpen, Calendar, Code, Database, DollarSign, FileText, Github, Globe, Headphones, HelpCircle, Instagram, LineChart, Linkedin, Lock, Mail, MapPin, MessageSquare, Paintbrush, Phone, Server, Settings, Shield, Sparkles, Users, Zap } from "lucide-react";

export const DEFAULT_LIMIT = 8

export const featureItems = [
    {
        icon: Shield,
        label: "Security",
        description: "Enterprise-grade protection",
        href: "/features/security",
    },
    {
        icon: BarChart,
        label: "Analytics",
        description: "Insights and reporting",
        href: "/features/analytics",
    },
    {
        icon: Sparkles,
        label: "AI Capabilities",
        description: "Smart automation features",
        href: "/features/ai",
    },
    {
        icon: Zap,
        label: "Performance",
        description: "Optimized for speed",
        href: "/features/performance",
    },
]

export const resourceItems = [
    {
        icon: BookOpen,
        label: "Documentation",
        description: "Detailed guides and references",
        href: "/docs",
    },
    {
        icon: Paintbrush,
        label: "Templates",
        description: "Rich templates for your business.",
        href: "/templates",
    },
    // {
    //     icon: Newspaper,
    //     label: "Blog",
    //     description: "Latest news and updates",
    //     href: "/blog",
    // },
    // {
    //     icon: Code,
    //     label: "API Reference",
    //     description: "Developer documentation",
    //     href: "/api",
    // },
    {
        icon: HelpCircle,
        label: "Help Center",
        description: "FAQs and support",
        href: "/contact",
    },
]

export const FOOTER_SECTIONS = [
    {
        title: "Product",
        links: [
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
            { href: "/integrations", label: "Integrations" },
            { href: "/changelog", label: "Changelog" },
        ],
    },
    {
        title: "Resources",
        links: [
            { href: "/docs", label: "Documentation" },
            { href: "/guides", label: "Guides" },
            { href: "/api", label: "API Reference" },
            { href: "/blog", label: "Blog" },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/about", label: "About" },
            { href: "/career", label: "Careers" },
            { href: "/contact", label: "Contact" },
            { href: "/legal", label: "Legal" },
        ],
    },
] as const;

export const CONTACT_INFO = [
    {
        icon: Mail,
        href: "mailto:zero.business.hub@gmail.com",
        label: "hello@zerohub.site",
    },
] as const;

export const SOCIAL_LINKS = [
    { href: "https://x.com/ashishhh2210", icon: Instagram, label: "Twitter" },
    { href: "https://github.com/Ashish1022", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/company/teamzerohub", icon: Linkedin, label: "LinkedIn" },
] as const;

export const LEGAL_LINKS = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
    { href: "/sitemap", label: "Sitemap" },
] as const;

export const plans = [
    {
        id: 'starter',
        name: "Starter",
        description: "Launch your first storefront with essential tools.",
        monthlyPrice: 300,
        yearlyPrice: 3000,
        features: [
            "1 storefront",
            "Up to 100 products",
            "500MB media storage",
            "2 basic templates",
            "Standard payment integration (Razorpay)",
            "Basic content editor",
            "SEO meta & sitemap support",
            "Basic analytics (views, clicks)",
            "1 admin user",
            "Free SSL certificate",
        ],
        popular: false,
        cta: "Get Started",
        color: "from-blue-500 to-cyan-400",
    },
    {
        id: 'pro',
        name: "Pro",
        description: "Scale your store with powerful tools and more flexibility.",
        monthlyPrice: 500,
        yearlyPrice: 5000,
        features: [
            "1 storefront",
            "Up to 500 products",
            "10GB media storage",
            "10 modern templates",
            "Advanced CMS with reusable blocks",
            "SEO tools & social meta previews",
            "Advanced analytics (sales, referrers)",
            "Marketing tools (banners, discounts)",
            "Priority chat support"
        ],
        popular: true,
        cta: "Get Started",
        color: "from-purple-500 to-blue-500",
    },
    {
        id: 'enterprise',
        name: "Enterprise",
        description: "Premium features, scalability, and dedicated support.",
        monthlyPrice: 1500,
        yearlyPrice: 15000,
        features: [
            "1 storefront",
            "Unlimited products",
            "1TB media storage",
            "All templates + custom design options",
            "White-label branding & theme override",
            "Enterprise CMS (dynamic sections)",
            "Full SEO suite (schema, structured data)",
            "Enterprise analytics dashboard",
            "Unlimited team members",
            "Custom domain support with CDN",
            "24/7 premium support",
        ],
        popular: false,
        cta: "Get Started",
        color: "from-pink-500 to-purple-500",
    },
]

export const FEATURES = [
    { icon: Globe, title: "Global Reach", color: "bg-blue-500" },
    { icon: Lock, title: "Enterprise Security", color: "bg-green-500" },
    { icon: LineChart, title: "Advanced Analytics", color: "bg-purple-500" },
    { icon: Code, title: "API Integration", color: "bg-yellow-500" },
    { icon: Settings, title: "Full Customization", color: "bg-red-500" },
    { icon: Zap, title: "Lightning Fast", color: "bg-indigo-500" }
];

export const TECH_STACKS = {
    left: ['React', 'Node.js', 'GraphQL', 'AWS'],
    right: ['Analytics', 'Security', 'APIs', 'Mobile']
};

export const CORNER_NODES = [
    { Icon: Server, color: "text-blue-400", bgColor: "bg-blue-500/30", position: "top-12 sm:top-5 left-4 sm:left-12", delay: 1 },
    { Icon: Database, color: "text-green-400", bgColor: "bg-green-500/30", position: "bottom-28 sm:bottom-11 left-4 sm:left-12", delay: 1.3 },
    { Icon: Shield, color: "text-red-400", bgColor: "bg-red-500/30", position: "top-12 sm:top-5 right-4 sm:right-12", delay: 1.6, isRight: true },
    { Icon: LineChart, color: "text-purple-400", bgColor: "bg-purple-500/30", position: "bottom-28 sm:bottom-11 right-4 sm:right-12", delay: 1.9, isRight: true }
];

export const contactMethods = [
    {
        icon: Mail,
        title: "Email Support",
        description: "Get help via email",
        value: "zero.business.hub@gmail.com",
        action: "Send Email",
    },
]

export const supportOptions = [
    {
        icon: Headphones,
        title: "Technical Support",
        description: "Get help with technical issues and implementation",
        availability: "24/7",
    },
    {
        icon: FileText,
        title: "Sales Inquiries",
        description: "Learn about pricing, plans, and custom solutions",
        availability: "Mon-Fri 9AM-6PM PST",
    },
    {
        icon: MessageSquare,
        title: "General Questions",
        description: "Ask about features, integrations, or anything else",
        availability: "24/7",
    },
]

export const stats = [
    { label: "Years in Business", value: "2+", icon: Calendar },
    { label: "Happy Customers", value: "10+", icon: Users },
    { label: "Countries Served", value: "12+", icon: Globe },
    { label: "Uptime Guarantee", value: "99.9%", icon: Shield },
]

export const team = [
    {
        name: "Ashish Jadhav",
        role: "Founder & CEO",
        bio: "Former VP of Engineering at TechCorp with 15+ years in enterprise software.",
        image: "/placeholder.png",
        social: {
            linkedin: "https://www.linkedin.com/in/ashish-jadhav-zero/",
            twitter: "https://x.com/ashishhh2210",
            github: "https://github.com/Ashish1022",
            email: "ashishjadhav9900@gmail.com",
        },
    },
]

export const jobs = [
    {
        id: "senior-fullstack-engineer",
        title: "Senior Full-Stack Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$120k - $160k",
        posted: "2 days ago", // Updated from second dataset
        description: "Join our core engineering team to build and scale our platform.",
        about:
            "We're looking for a Senior Full-Stack Engineer to join our Engineering team. You'll work on our core platform, building new features and improving existing ones. You'll collaborate with product managers, designers, and other engineers to deliver high-quality software.",
        responsibilities: [
            "Design, develop, and maintain our core platform features",
            "Write clean, maintainable, and efficient code",
            "Collaborate with cross-functional teams to define and implement new features",
            "Troubleshoot and fix bugs and performance issues",
            "Participate in code reviews and mentor junior engineers",
            "Contribute to technical architecture decisions",
        ],
        requirements: [
            "Experience with tRPC", // Added from second dataset
            "Experience with Node.js and RESTful APIs",
            "5+ years of experience in full-stack development",
            "Strong proficiency in React, Next.js, and TypeScript",
            "Familiarity with database design and SQL/NoSQL databases",
            "Understanding of CI/CD pipelines and DevOps practices",
            "Excellent problem-solving and communication skills",
        ],
        niceToHave: [
            "Experience with GraphQL",
            "Knowledge of AWS or other cloud platforms",
            "Contributions to open-source projects",
            "Experience with microservices architecture",
        ],
        teamSize: "15 engineers",
        manager: "Engineering Director",
        relatedPositions: ["frontend-engineer", "backend-engineer", "devops-engineer"],
    },
    {
        id: "product-designer",
        title: "Senior Product Designer",
        department: "Design",
        location: "Remote", // Updated from second dataset
        type: "Full-time",
        salary: "$110k - $150k",
        posted: "1 week ago", // Updated from second dataset
        description: "Shape the future of our product experience and design system.",
        about:
            "We're looking for a Senior Product Designer to join our Design team. You'll work on creating beautiful, intuitive user experiences for our platform. You'll collaborate with product managers, engineers, and other designers to deliver high-quality designs.",
        responsibilities: [
            "Create user-centered designs by understanding business requirements and user feedback",
            "Design flows, prototypes, and high-fidelity visuals for our platform",
            "Contribute to our design system and ensure consistency across the product",
            "Collaborate with engineers to ensure designs are implemented correctly",
            "Conduct user research and usability testing",
            "Present design concepts to stakeholders and incorporate feedback",
        ],
        requirements: [
            "4+ years of experience in product design",
            "Proficiency in Figma and other design tools",
            "Excellent communication and presentation skills",
            "Strong portfolio demonstrating your design process and solutions",
            "Experience with design systems and component libraries",
            "Understanding of accessibility standards and best practices",
        ],
        niceToHave: [
            "Experience with motion design and animations",
            "Knowledge of front-end development (HTML, CSS)",
            "Experience with user research methodologies",
            "Background in B2B SaaS products",
        ],
        teamSize: "8 designers",
        manager: "Head of Design",
        relatedPositions: ["ux-researcher", "frontend-engineer"],
    },
    {
        id: "frontend-engineer",
        title: "Frontend Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$90k - $130k",
        posted: "5 days ago", // Updated from second dataset
        description: "Create beautiful, responsive, and accessible user interfaces.",
        about:
            "We're looking for a Frontend Engineer to join our Engineering team. You'll work on building beautiful, responsive, and accessible user interfaces for our platform. You'll collaborate with designers, product managers, and other engineers to deliver high-quality features.",
        responsibilities: [
            "Implement responsive and accessible user interfaces using React and Next.js",
            "Collaborate with designers to ensure pixel-perfect implementation",
            "Write clean, maintainable, and efficient code",
            "Optimize applications for maximum speed and scalability",
            "Participate in code reviews and contribute to our frontend architecture",
            "Stay up-to-date with emerging trends and best practices in frontend development",
        ],
        requirements: [
            "Experience with CSS/Tailwind", // Added from second dataset
            "Good problem-solving and communication skills",
            "3+ years of experience in frontend development",
            "Strong proficiency in React, HTML, CSS, and JavaScript/TypeScript",
            "Experience with responsive design and cross-browser compatibility",
            "Understanding of web accessibility standards (WCAG)",
            "Familiarity with modern frontend build tools and workflows",
        ],
        niceToHave: [
            "Experience with Next.js and server components",
            "Knowledge of state management libraries (Redux, Zustand, etc.)",
            "Experience with testing frameworks (Jest, React Testing Library)",
            "Understanding of performance optimization techniques",
        ],
        teamSize: "10 engineers",
        manager: "Frontend Engineering Manager",
        relatedPositions: ["senior-fullstack-engineer", "ux-researcher", "product-designer"],
    },
    {
        id: "devops-engineer",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$110k - $150k", // Estimated based on market rates
        posted: "3 days ago",
        description: "Build and maintain our cloud infrastructure and CI/CD pipelines.",
        about:
            "We're looking for a DevOps Engineer to join our Engineering team. You'll work on building and maintaining our cloud infrastructure, CI/CD pipelines, and ensuring our platform is scalable, reliable, and secure.",
        responsibilities: [
            "Design and maintain cloud infrastructure on AWS/GCP",
            "Build and optimize CI/CD pipelines",
            "Implement monitoring and alerting systems",
            "Manage containerized applications with Kubernetes",
            "Automate infrastructure provisioning with Terraform",
            "Ensure security best practices across the platform",
        ],
        requirements: [
            "Strong experience with AWS or GCP",
            "Experience with Terraform or similar IaC tools",
            "3+ years of experience in DevOps or Infrastructure",
            "Proficiency with Kubernetes and containerization",
            "Knowledge of CI/CD pipelines and automation",
            "Understanding of monitoring and observability tools",
        ],
        niceToHave: [
            "Experience with GitOps workflows",
            "Knowledge of service mesh technologies",
            "Familiarity with security scanning and compliance",
            "Experience with multi-cloud environments",
        ],
        teamSize: "5 engineers",
        manager: "Infrastructure Manager",
        relatedPositions: ["senior-fullstack-engineer", "backend-engineer"],
    },
    {
        id: "backend-engineer",
        title: "Backend Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $140k", // Estimated based on market rates
        posted: "3 days ago",
        description: "Build scalable APIs and services that power our platform.",
        about:
            "We're looking for a Backend Engineer to join our Engineering team. You'll work on building scalable APIs and services that power our platform, ensuring high performance and reliability.",
        responsibilities: [
            "Design and develop RESTful APIs and GraphQL services",
            "Build scalable microservices architecture",
            "Optimize database queries and performance",
            "Implement security best practices",
            "Write comprehensive tests and documentation",
            "Collaborate with frontend engineers on API design",
        ],
        requirements: [
            "Understanding of API design principles",
            "Strong proficiency in Node.js and TypeScript",
            "3+ years of experience in backend development",
            "Experience with PostgreSQL and database design",
            "Knowledge of authentication and authorization",
            "Experience with testing frameworks and methodologies",
        ],
        niceToHave: [
            "Experience with GraphQL",
            "Knowledge of Redis and caching strategies",
            "Familiarity with message queues and event-driven architecture",
            "Experience with performance monitoring and optimization",
        ],
        teamSize: "12 engineers",
        manager: "Backend Engineering Manager",
        relatedPositions: ["senior-fullstack-engineer", "devops-engineer"],
    },
    {
        id: "growth-marketing-manager",
        title: "Growth Marketing Manager",
        department: "Marketing",
        location: "Remote",
        type: "Full-time",
        salary: "$90k - $130k", // Estimated based on market rates
        posted: "2 weeks ago",
        description: "Drive user acquisition and retention through data-driven marketing.",
        about:
            "We're looking for a Growth Marketing Manager to join our Marketing team. You'll drive user acquisition and retention through data-driven marketing strategies, focusing on scaling our B2B SaaS platform.",
        responsibilities: [
            "Develop and execute growth marketing strategies",
            "Manage SEO/SEM campaigns and optimize for conversions",
            "Analyze user data and marketing metrics",
            "Create and optimize landing pages and funnels",
            "Coordinate with product and sales teams",
            "Run A/B tests and experiments to improve performance",
        ],
        requirements: [
            "3+ years of experience in growth marketing",
            "Strong experience with B2B SaaS marketing",
            "Data-driven approach to marketing decisions",
            "Proficiency in analytics tools (Google Analytics, Mixpanel, etc.)",
            "Experience with SEO/SEM and paid advertising",
            "Excellent communication and project management skills",
        ],
        niceToHave: [
            "Experience with marketing automation platforms",
            "Knowledge of conversion rate optimization",
            "Background in content marketing",
            "Familiarity with SQL and data analysis",
        ],
        teamSize: "6 marketers",
        manager: "Head of Marketing",
        relatedPositions: ["customer-success-manager", "sales-development-representative"],
    },
    {
        id: "customer-success-manager",
        title: "Customer Success Manager",
        department: "Customer Success",
        location: "Remote",
        type: "Full-time",
        salary: "$80k - $110k", // Estimated based on market rates
        posted: "1 week ago",
        description: "Ensure our customers achieve their goals using our platform.",
        about:
            "We're looking for a Customer Success Manager to join our Customer Success team. You'll ensure our customers achieve their goals using our platform, driving retention and expansion.",
        responsibilities: [
            "Build and maintain strong customer relationships",
            "Create and deliver customer training and resources",
            "Onboard new customers and ensure successful adoption",
            "Monitor customer health and proactively address issues",
            "Identify expansion opportunities within existing accounts",
            "Collaborate with product team on customer feedback",
        ],
        requirements: [
            "Data-driven approach to customer success",
            "Strong experience with B2B SaaS platforms",
            "Strong communication and presentation skills",
            "2+ years of experience in customer success or account management",
            "Excellent customer onboarding and relationship management skills",
            "Experience with CRM and customer success tools",
        ],
        niceToHave: [
            "Experience with customer health scoring",
            "Knowledge of product analytics",
            "Background in technical support",
            "Experience with enterprise customers",
        ],
        teamSize: "8 customer success managers",
        manager: "Head of Customer Success",
        relatedPositions: ["sales-development-representative", "ux-researcher"],
    },
    {
        id: "ux-researcher",
        title: "UX Researcher",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        salary: "$95k - $125k", // Estimated based on market rates
        posted: "2 weeks ago",
        description: "Conduct user research to inform product decisions.",
        about:
            "We're looking for a UX Researcher to join our Design team. You'll conduct user research to inform product decisions, helping us build better experiences for our users.",
        responsibilities: [
            "Plan and conduct user interviews and usability testing sessions",
            "Design and execute quantitative and qualitative research studies",
            "Analyze research data and present actionable insights",
            "Collaborate with product and design teams on research strategy",
            "Create user personas and journey maps",
            "Advocate for user needs throughout the product development process",
        ],
        requirements: [
            "3+ years of experience in UX research",
            "Excellent communication and presentation skills",
            "Strong experience with user interviews and usability testing",
            "Proficiency in data analysis and research methodologies",
            "Experience with research tools (UserTesting, Hotjar, etc.)",
            "Understanding of statistical analysis and research validation",
        ],
        niceToHave: [
            "Experience with quantitative research methods",
            "Knowledge of A/B testing and experimentation",
            "Background in psychology or behavioral science",
            "Experience with B2B SaaS products",
        ],
        teamSize: "3 researchers",
        manager: "Head of Design",
        relatedPositions: ["product-designer", "frontend-engineer"],
    },
    {
        id: "sales-development-representative",
        title: "Sales Development Representative",
        department: "Sales",
        location: "Remote",
        type: "Full-time",
        salary: "$60k - $80k + commission", // Estimated based on market rates
        posted: "1 week ago",
        description: "Generate and qualify leads for our sales team.",
        about:
            "We're looking for a Sales Development Representative to join our Sales team. You'll generate and qualify leads for our sales team, helping us grow our customer base.",
        responsibilities: [
            "Generate and qualify inbound and outbound leads",
            "Conduct initial discovery calls with prospects",
            "Schedule qualified meetings for Account Executives",
            "Maintain accurate records in CRM system",
            "Collaborate with marketing on lead generation campaigns",
            "Follow up on marketing qualified leads",
        ],
        requirements: [
            "Strong experience with B2B SaaS sales",
            "Goal-oriented and results-driven mindset",
            "Ability to work in a fast-paced environment",
            "1+ years of experience in sales or business development",
            "Proficiency with CRM systems (Salesforce, HubSpot, etc.)",
            "Excellent communication and interpersonal skills",
        ],
        niceToHave: [
            "Experience with sales automation tools",
            "Knowledge of lead qualification frameworks (BANT, MEDDIC)",
            "Background in technology or SaaS",
            "Experience with cold calling and email outreach",
        ],
        teamSize: "12 sales team members",
        manager: "Sales Manager",
        relatedPositions: ["customer-success-manager", "growth-marketing-manager"],
    },
];

export const benefits = [
    {
        title: "Competitive Compensation",
        description: "Salary, equity, and performance bonuses",
        icon: DollarSign,
    },
    {
        title: "Remote-First",
        description: "Work from anywhere in the world",
        icon: Globe,
    },
    {
        title: "Team Retreats",
        description: "Quarterly in-person gatherings around the world",
        icon: Users,
    },
]

export const locations = [
    {
        city: "San Francisco",
        country: "United States",
        address: "123 Market Street, San Francisco, CA 94105",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        city: "New York",
        country: "United States",
        address: "456 Broadway, New York, NY 10013",
        image: "/placeholder.svg?height=200&width=300",
    },
    {
        city: "London",
        country: "United Kingdom",
        address: "789 Oxford Street, London W1D 2HG",
        image: "/placeholder.svg?height=200&width=300",
    },
]


// "use client"

// import React, { useState } from 'react'
// import { ArrowRight, CheckCircle, Clock, Globe, Rocket, Shield, Users, Zap, Mail, Key, CreditCard, Store, User, Phone, Lock, Crown, Star, Sparkles, Check, X } from 'lucide-react'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { DocsToc } from '@/modules/docs/ui/components/docs-toc'
// import { DocsHeader } from '@/modules/docs/ui/components/header'
// import { Callout } from '@/modules/docs/ui/components/callout'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { DocsPager } from '@/modules/docs/ui/components/docs-pager'

// const DocsPage = () => {
//     const [selectedPlan, setSelectedPlan] = useState('pro')

//     const plans = [
//         {
//             id: 'starter',
//             name: 'Starter',
//             price: '$9',
//             period: '/month',
//             description: 'Perfect for new sellers getting started',
//             icon: Rocket,
//             color: 'green',
//             features: [
//                 'Up to 100 products',
//                 'Basic analytics',
//                 'Standard support',
//                 'Mobile app access',
//                 '2% transaction fee',
//                 'Basic themes'
//             ],
//             limitations: [
//                 'Limited customization',
//                 'Basic reporting only'
//             ]
//         },
//         {
//             id: 'pro',
//             name: 'Professional',
//             price: '$29',
//             period: '/month',
//             description: 'Most popular choice for growing businesses',
//             icon: Crown,
//             color: 'blue',
//             popular: true,
//             features: [
//                 'Unlimited products',
//                 'Advanced analytics',
//                 'Priority support',
//                 'Mobile app access',
//                 '1.5% transaction fee',
//                 'Premium themes',
//                 'SEO optimization',
//                 'Marketing tools',
//                 'Abandoned cart recovery'
//             ],
//             limitations: []
//         },
//         {
//             id: 'enterprise',
//             name: 'Enterprise',
//             price: '$99',
//             period: '/month',
//             description: 'Advanced features for established businesses',
//             icon: Sparkles,
//             color: 'purple',
//             features: [
//                 'Everything in Professional',
//                 'White-label solution',
//                 'API access',
//                 'Dedicated account manager',
//                 '1% transaction fee',
//                 'Custom integrations',
//                 'Advanced reporting',
//                 'Multi-store management',
//                 'Custom domain'
//             ],
//             limitations: []
//         }
//     ]

//     return (
//         <div className="container mx-auto px-2 md:px-6">
//             <DocsHeader
//                 heading="Choose Your Subscription Plan"
//                 text="Select the perfect plan for your business needs and complete your account verification to start selling with ZEROHUB's powerful e-commerce platform."
//                 badge="Subscription & Verification"
//             />

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
//                 <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
//                     <CardHeader>
//                         <div className="flex items-center gap-2">
//                             <CreditCard className="h-5 w-5 text-blue-400" />
//                             <CardTitle className="text-lg">Choose Plan</CardTitle>
//                         </div>
//                         <CardDescription>Select the subscription that fits your needs</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-500/10">
//                             View Plans
//                             <ArrowRight className="h-4 w-4" />
//                         </Button>
//                     </CardContent>
//                 </Card>

//                 <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
//                     <CardHeader>
//                         <div className="flex items-center gap-2">
//                             <Shield className="h-5 w-5 text-green-400" />
//                             <CardTitle className="text-lg">Secure Payment</CardTitle>
//                         </div>
//                         <CardDescription>Complete your purchase with secure checkout</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <Button variant="ghost" className="w-full justify-between group-hover:bg-green-500/10">
//                             Pay Securely
//                             <ArrowRight className="h-4 w-4" />
//                         </Button>
//                     </CardContent>
//                 </Card>

//                 <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
//                     <CardHeader>
//                         <div className="flex items-center gap-2">
//                             <Rocket className="h-5 w-5 text-purple-400" />
//                             <CardTitle className="text-lg">Start Selling</CardTitle>
//                         </div>
//                         <CardDescription>Get full access to your admin dashboard</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <Button variant="ghost" className="w-full justify-between group-hover:bg-purple-500/10">
//                             Access Dashboard
//                             <ArrowRight className="h-4 w-4" />
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div>

//             <DocsToc className="mb-8" />

//             <div className="space-y-12">
//                 <section className='scroll-mt-20' id='subscription-plans'>
//                     <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Subscription Plans</h2>
//                     <p className="text-zinc-300 leading-7">
//                         Choose the plan that best fits your business needs. You can upgrade or downgrade at any time.
//                         All plans include our core e-commerce features with varying limits and additional capabilities.
//                     </p>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
//                         {plans.map((plan) => {
//                             const IconComponent = plan.icon
//                             const isSelected = selectedPlan === plan.id
                            
//                             return (
//                                 <Card 
//                                     key={plan.id}
//                                     className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
//                                         plan.popular 
//                                             ? 'ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/40' 
//                                             : isSelected
//                                                 ? `ring-2 ring-${plan.color}-500/50 bg-gradient-to-br from-${plan.color}-500/10 to-${plan.color}-600/10 border-${plan.color}-500/40`
//                                                 : 'bg-zinc-800/20 border-zinc-700/50 hover:border-zinc-600/50'
//                                     }`}
//                                     onClick={() => setSelectedPlan(plan.id)}
//                                 >
//                                     {plan.popular && (
//                                         <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">
//                                             Most Popular
//                                         </div>
//                                     )}
                                    
//                                     <CardHeader className="text-center pb-2">
//                                         <div className="flex justify-center mb-4">
//                                             <div className={`w-16 h-16 rounded-full bg-${plan.color}-500/20 flex items-center justify-center border border-${plan.color}-500/30`}>
//                                                 <IconComponent className={`h-8 w-8 text-${plan.color}-400`} />
//                                             </div>
//                                         </div>
//                                         <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
//                                         <div className="text-3xl font-bold text-white">
//                                             {plan.price}
//                                             <span className="text-sm font-normal text-zinc-400">{plan.period}</span>
//                                         </div>
//                                         <CardDescription className="text-center">{plan.description}</CardDescription>
//                                     </CardHeader>
                                    
//                                     <CardContent className="space-y-4">
//                                         <div className="space-y-2">
//                                             {plan.features.map((feature, index) => (
//                                                 <div key={index} className="flex items-center gap-2 text-sm">
//                                                     <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
//                                                     <span className="text-zinc-300">{feature}</span>
//                                                 </div>
//                                             ))}
//                                             {plan.limitations.map((limitation, index) => (
//                                                 <div key={index} className="flex items-center gap-2 text-sm">
//                                                     <X className="h-4 w-4 text-red-400 flex-shrink-0" />
//                                                     <span className="text-zinc-400">{limitation}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
                                        
//                                         <Button 
//                                             className={`w-full ${
//                                                 isSelected 
//                                                     ? `bg-${plan.color}-500 hover:bg-${plan.color}-600 text-white` 
//                                                     : `bg-${plan.color}-500/20 hover:bg-${plan.color}-500/30 text-${plan.color}-400 border border-${plan.color}-500/30`
//                                             }`}
//                                             onClick={() => setSelectedPlan(plan.id)}
//                                         >
//                                             {isSelected ? 'Selected' : 'Select Plan'}
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             )
//                         })}
//                     </div>

//                     <Callout className="my-8">
//                         <p>
//                             <strong>Need Help Choosing?</strong> Contact our sales team for a personalized recommendation based on your business requirements. All plans come with a 14-day free trial.
//                         </p>
//                     </Callout>
//                 </section>

//                 <section className='scroll-mt-20' id='purchase-process'>
//                     <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Purchase Process</h2>
//                     <p className="text-zinc-300 leading-7">
//                         After clicking "Purchase Subscription" in your admin dashboard, you'll be redirected to this subscription page.
//                         Here's what happens during the purchase process.
//                     </p>

//                     <div className="my-8">
//                         <h3 className="text-xl font-semibold tracking-tight mb-6 scroll-m-20 flex items-center gap-2">
//                             <CreditCard className="h-5 w-5 text-blue-400" />
//                             Step-by-Step Purchase Flow
//                         </h3>

//                         <div className="space-y-6">
//                             <div className="flex gap-4 p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg border border-blue-500/20">
//                                 <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
//                                     1
//                                 </div>
//                                 <div className="flex-1">
//                                     <h4 className="font-semibold text-white mb-3 text-lg">Plan Selection</h4>
//                                     <p className="text-zinc-300 text-sm mb-4">
//                                         Choose from our three subscription tiers based on your business needs and expected volume.
//                                     </p>

//                                     <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50 mb-4">
//                                         <h5 className="text-white font-medium mb-3 flex items-center gap-2">
//                                             <Crown className="h-4 w-4" />
//                                             Plan Comparison
//                                         </h5>
//                                         <div className="grid grid-cols-3 gap-2 text-xs">
//                                             <div className="text-center p-2 bg-green-500/10 rounded border border-green-500/20">
//                                                 <div className="text-green-400 font-semibold">Starter</div>
//                                                 <div className="text-zinc-400">$9/month</div>
//                                             </div>
//                                             <div className="text-center p-2 bg-blue-500/10 rounded border border-blue-500/20">
//                                                 <div className="text-blue-400 font-semibold">Professional</div>
//                                                 <div className="text-zinc-400">$29/month</div>
//                                             </div>
//                                             <div className="text-center p-2 bg-purple-500/10 rounded border border-purple-500/20">
//                                                 <div className="text-purple-400 font-semibold">Enterprise</div>
//                                                 <div className="text-zinc-400">$99/month</div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
//                                         <Star className="h-4 w-4 text-blue-400" />
//                                         <span className="text-sm text-blue-300">Professional plan is most popular for growing businesses</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex gap-4 p-6 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/20">
//                                 <div className="flex-shrink-0 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold border border-green-500/30">
//                                     2
//                                 </div>
//                                 <div className="flex-1">
//                                     <h4 className="font-semibold text-white mb-3 text-lg">Secure Checkout</h4>
//                                     <p className="text-zinc-300 text-sm mb-4">
//                                         Complete your purchase using our secure payment gateway with multiple payment options.
//                                     </p>

//                                     <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50 mb-4">
//                                         <h5 className="text-white font-medium mb-3 flex items-center gap-2">
//                                             <Shield className="h-4 w-4" />
//                                             Payment Options
//                                         </h5>
//                                         <div className="grid grid-cols-2 gap-3 text-sm">
//                                             <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
//                                                 <CreditCard className="h-4 w-4 text-blue-400" />
//                                                 <span className="text-zinc-300">Credit/Debit Cards</span>
//                                             </div>
//                                             <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
//                                                 <Globe className="h-4 w-4 text-green-400" />
//                                                 <span className="text-zinc-300">PayPal</span>
//                                             </div>
//                                             <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
//                                                 <Shield className="h-4 w-4 text-purple-400" />
//                                                 <span className="text-zinc-300">Bank Transfer</span>
//                                             </div>
//                                             <div className="flex items-center gap-2 p-2 bg-zinc-800/50 rounded">
//                                                 <Zap className="h-4 w-4 text-amber-400" />
//                                                 <span className="text-zinc-300">Digital Wallets</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
//                                         <Shield className="h-4 w-4 text-green-400" />
//                                         <span className="text-sm text-green-300">256-bit SSL encryption protects your payment data</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex gap-4 p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg border border-purple-500/20">
//                                 <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold border border-purple-500/30">
//                                     3
//                                 </div>
//                                 <div className="flex-1">
//                                     <h4 className="font-semibold text-white mb-3 text-lg">Account Activation</h4>
//                                     <p className="text-zinc-300 text-sm mb-4">
//                                         Once payment is confirmed, your account is automatically activated and you're redirected back to your admin dashboard.
//                                     </p>

//                                     <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50 mb-4">
//                                         <h5 className="text-white font-medium mb-3 flex items-center gap-2">
//                                             <Rocket className="h-4 w-4" />
//                                             Instant Activation
//                                         </h5>
//                                         <div className="space-y-2 text-sm">
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-green-400 rounded-full" />
//                                                 <span className="text-zinc-300">Payment processing (1-2 minutes)</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-blue-400 rounded-full" />
//                                                 <span className="text-zinc-300">Account upgrade activation</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-purple-400 rounded-full" />
//                                                 <span className="text-zinc-300">Feature unlock</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <div className="w-2 h-2 bg-amber-400 rounded-full" />
//                                                 <span className="text-zinc-300">Redirect to admin dashboard</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="flex items-center gap-2 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
//                                         <CheckCircle className="h-4 w-4 text-purple-400" />
//                                         <span className="text-sm text-purple-300">Full access to all subscribed features immediately</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section id="subscription-benefits" className="scroll-mt-20">
//                     <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">What's Included</h2>
//                     <p className="text-zinc-300 leading-7">
//                         All subscription plans include our core e-commerce features with additional benefits based on your selected tier.
//                     </p>

//                     <Tabs defaultValue="features" className="my-8">
//                         <TabsList className="grid w-full grid-cols-3">
//                             <TabsTrigger value="features" className="flex items-center gap-2">
//                                 <Zap className="h-4 w-4" />
//                                 Core Features
//                             </TabsTrigger>
//                             <TabsTrigger value="support" className="flex items-center gap-2">
//                                 <Users className="h-4 w-4" />
//                                 Support & Training
//                             </TabsTrigger>
//                             <TabsTrigger value="analytics" className="flex items-center gap-2">
//                                 <Globe className="h-4 w-4" />
//                                 Analytics & Tools
//                             </TabsTrigger>
//                         </TabsList>

//                         <TabsContent value="features" className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <Card className="bg-zinc-800/20 border-zinc-700/50">
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2 text-lg">
//                                             <Store className="h-5 w-5 text-blue-400" />
//                                             E-commerce Essentials
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-2 text-sm">
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">Product catalog management</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">Order processing system</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">Customer management</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">Inventory tracking</span>
//                                         </div>
//                                     </CardContent>
//                                 </Card>

//                                 <Card className="bg-zinc-800/20 border-zinc-700/50">
//                                     <CardHeader>
//                                         <CardTitle className="flex items-center gap-2 text-lg">
//                                             <Shield className="h-5 w-5 text-green-400" />
//                                             Security & Reliability
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-2 text-sm">
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">SSL certificate included</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">99.9% uptime guarantee</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">Daily backups</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Check className="h-3 w-3 text-green-400" />
//                                             <span className="text-zinc-300">PCI DSS compliance</span>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         </TabsContent>

//                         <TabsContent value="support" className="space-y-4">
//                             <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
//                                 <h3 className="text-lg font-semibold text-white mb-4">Support Levels by Plan</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div className="bg-zinc-800/50 rounded-lg p-4">
//                                         <h4 className="text-green-400 font-semibold mb-2">Starter</h4>
//                                         <div className="space-y-1 text-sm text-zinc-300">
//                                             <div>• Email support</div>
//                                             <div>• Knowledge base access</div>
//                                             <div>• Community forums</div>
//                                         </div>
//                                     </div>
//                                     <div className="bg-zinc-800/50 rounded-lg p-4 ring-1 ring-blue-500/30">
//                                         <h4 className="text-blue-400 font-semibold mb-2">Professional</h4>
//                                         <div className="space-y-1 text-sm text-zinc-300">
//                                             <div>• Priority email support</div>
//                                             <div>• Live chat support</div>
//                                             <div>• Video tutorials</div>
//                                             <div>• Phone support</div>
//                                         </div>
//                                     </div>
//                                     <div className="bg-zinc-800/50 rounded-lg p-4">
//                                         <h4 className="text-purple-400 font-semibold mb-2">Enterprise</h4>
//                                         <div className="space-y-1 text-sm text-zinc-300">
//                                             <div>• Dedicated account manager</div>
//                                             <div>• 24/7 priority support</div>
//                                             <div>• Custom training sessions</div>
//                                             <div>• Migration assistance</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </TabsContent>

//                         <TabsContent value="analytics" className="space-y-4">
//                             <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
//                                 <h3 className="text-lg font-semibold text-white mb-4">Analytics & Business Tools</h3>
//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//                                     <div className="p-3 bg-zinc-800/50 rounded-lg">
//                                         <Globe className="h-6 w-6 text-blue-400 mx-auto mb-1" />
//                                         <div className="text-sm font-medium text-white">Sales Analytics</div>
//                                         <div className="text-xs text-zinc-400">Revenue tracking</div>
//                                     </div>
//                                     <div className="p-3 bg-zinc-800/50 rounded-lg">
//                                         <Users className="h-6 w-6 text-green-400 mx-auto mb-1" />
//                                         <div className="text-sm font-medium text-white">Customer Insights</div>
//                                         <div className="text-xs text-zinc-400">Behavior analysis</div>
//                                     </div>
//                                     <div className="p-3 bg-zinc-800/50 rounded-lg">
//                                         <Zap className="h-6 w-6 text-purple-400 mx-auto mb-1" />
//                                         <div className="text-sm font-medium text-white">Performance</div>
//                                         <div className="text-xs text-zinc-400">Site optimization</div>
//                                     </div>
//                                     <div className="p-3 bg-zinc-800/50 rounded-lg">
//                                         <Star className="h-6 w-6 text-amber-400 mx-auto mb-1" />
//                                         <div className="text-sm font-medium text-white">Marketing</div>
//                                         <div className="text-xs text-zinc-400">Campaign tools</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </TabsContent>
//                     </Tabs>
//                 </section>

//                 <section id="important-notes" className="scroll-mt-20">
//                     <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4 scroll-m-20">Important Information</h2>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
//                         <Callout variant="info" className="h-fit">
//                             <p>
//                                 <strong>Free Trial Available:</strong> All plans include a 14-day free trial. You can cancel anytime during the trial period without being charged.
//                             </p>
//                         </Callout>

//                         <Callout className="h-fit">
//                             <p>
//                                 <strong>Flexible Billing:</strong> You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle.
//                             </p>
//                         </Callout>

//                         <Callout variant="info" className="h-fit">
//                             <p>
//                                 <strong>Money-Back Guarantee:</strong> Not satisfied? Get a full refund within 30 days of your first payment, no questions asked.
//                             </p>
//                         </Callout>

//                         <Callout className="h-fit">
//                             <p>
//                                 <strong>Migration Support:</strong> Need help moving from another platform? Our team provides free migration assistance for Professional and Enterprise plans.
//                             </p>
//                         </Callout>
//                     </div>
//                 </section>
//             </div>

//             <DocsPager
//                 prev={{
//                     href: "/docs/account-creation",
//                     title: "Account Creation",
//                 }}
//                 next={{
//                     href: "/docs/admin-dashboard",
//                     title: "Admin Dashboard Guide",
//                 }}
//             />
//         </div>
//     )
// }

// export default DocsPage