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
  },
  {
    icon: BookCheck,
    title: "Build Authority",
    description:
      "Create valuable content that resonates, inspires trust, and positions you as an expert.",
  },
  {
    icon: ChartPie,
    title: "Instant Insights",
    description:
      "Gain immediate, actionable insights with a quick glance, enabling fast decision-making.",
  },
  {
    icon: Users,
    title: "Engage with Your Audience",
    description:
      "Boost audience engagement with interactive features like polls, quizzes, and forms.",
  },
  {
    icon: FolderSync,
    title: "Automate Your Workflow",
    description:
      "Streamline your processes by automating repetitive tasks, saving time and reducing effort.",
  },
  {
    icon: Zap,
    title: "Accelerate Growth",
    description:
      "Supercharge your growth by implementing strategies that drive results quickly and efficiently.",
  },
];

const LayoutFeatureV6 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-screen-xl w-full py-16 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Powerful Tools for Modern Teams
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform offers a comprehensive suite of features designed to help your team work smarter, not harder. From automated workflows to advanced analytics, we've got you covered.
            </p>
          </div>
          
          <div className="bg-muted rounded-xl aspect-video lg:aspect-square"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="group">
              <div className="mb-6 relative">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute w-16 h-16 bg-primary/5 rounded-xl -top-2 -right-2 -z-10"></div>
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

export default LayoutFeatureV6;
