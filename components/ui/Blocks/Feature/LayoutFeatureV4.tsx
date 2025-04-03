import { useState } from "react";
import {
  BookCheck,
  ChartPie,
  FolderSync,
  Goal,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const LayoutFeatureV4 = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-screen-xl w-full py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore Our Key Features
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Built to help you succeed with innovative tools and intelligent solutions
          </p>
        </div>

        <div className="overflow-x-auto pb-2 mb-8">
          <div className="flex space-x-1 min-w-max border-b border-border">
            {features.map(({ title, icon: Icon }, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === index
                    ? "border-primary text-primary"
                    : "border-transparent hover:text-primary/80 hover:border-primary/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4 p-4 inline-flex rounded-full bg-primary/10">
              {/* Destructure the icon component with capital letter for proper JSX usage */}
              {(() => {
                const Icon = features[activeTab].icon;
                return <Icon className="w-8 h-8 text-primary" />;
              })()}
            </div>
            <h3 className="text-3xl font-bold mb-4">{features[activeTab].title}</h3>
            <p className="text-lg text-muted-foreground mb-6">{features[activeTab].description}</p>
            <Button size="lg" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
              Learn More
            </Button>
          </div>
          <div className="bg-muted aspect-video rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LayoutFeatureV4;
