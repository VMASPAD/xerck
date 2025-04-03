import {
  BookCheck,
  ChartPie,
  FolderSync,
  Goal,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Goal,
    title: "Identify Opportunities",
    description:
      "Easily uncover untapped areas to explore and expand your reach effortlessly and effectively.",
    color: "bg-[var(--chart-1)]",
  },
  {
    icon: BookCheck,
    title: "Build Authority",
    description:
      "Create valuable content that resonates, inspires trust, and positions you as an expert.",
    color: "bg-[var(--chart-2)]",
  },
  {
    icon: ChartPie,
    title: "Instant Insights",
    description:
      "Gain immediate, actionable insights with a quick glance, enabling fast decision-making.",
    color: "bg-[var(--chart-3)]",
  },
  {
    icon: Users,
    title: "Engage with Your Audience",
    description:
      "Boost audience engagement with interactive features like polls, quizzes, and forms.",
    color: "bg-[var(--chart-4)]",
  },
  {
    icon: FolderSync,
    title: "Automate Your Workflow",
    description:
      "Streamline your processes by automating repetitive tasks, saving time and reducing effort.",
    color: "bg-[var(--chart-5)]",
  },
  {
    icon: Zap,
    title: "Accelerate Growth",
    description:
      "Supercharge your growth by implementing strategies that drive results quickly and efficiently.",
    color: "bg-primary",
  },
];

const LayoutFeatureV7 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-screen-xl w-full py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Innovative Features for Forward-Thinking Businesses
          </h2>
          <p className="text-xl text-muted-foreground">
            Our platform provides the tools you need to stay ahead in a rapidly evolving landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <div 
              key={index} 
              className={`group relative rounded-xl p-8 overflow-hidden shadow-sm border border-border hover:border-primary/50 transition-colors`}
            >
              <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
              <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-20 flex items-center justify-center mb-6`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-').replace('-10', '')}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutFeatureV7;
