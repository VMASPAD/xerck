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

const LayoutFeatureV3 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-screen-xl w-full py-16 px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold sticky top-10">
              Why Our Solution Makes a Difference
            </h2>
            <div className="mt-6 h-2 w-20 bg-primary rounded-full"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover how our powerful features can transform your workflow and drive exceptional results.
            </p>
          </div>
          
          <div className="md:w-2/3 grid md:grid-cols-2 gap-x-8 gap-y-12">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="group">
                <div className="flex items-center gap-4 mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <div className="h-px w-full bg-border group-hover:bg-primary transition-colors duration-300 mb-4"></div>
                <p className="text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutFeatureV3;
