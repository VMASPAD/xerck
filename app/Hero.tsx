import { AuroraText } from "@/components/magicui/aurora-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

interface HeroProps {
  heading?: string;
  description?: string;
}
const poppins = Poppins({
  variable: "--font-poppins",
  weight: [ "800"],
  subsets: ["latin"],
});
const Hero = ({
  heading = "Xerck structure",
  description = "Components & Blocks built with Xerck and Tailwind with their variants and customizable.",
 
}: HeroProps) => {
  return (
    <section className="absolute z-10">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
        <BlurFade delay={0.45} inView>
          <h1 className={`my-6 text-9xl font-bold text-pretty lg:text-6xl xl:text-7xl ${poppins.className}`}>
            <AuroraText>{heading}</AuroraText>
          </h1>
          </BlurFade>
          <BlurFade delay={0.65} inView>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            {description}
          </p>  </BlurFade>
          <a href="https://portfoliotavm.com/xerck"target="_blank" rel="noopener noreferrer">
        <Button>
        View Catalog
        </Button></a>
        </div>
        <div className="flex">
          <img
            src="https://portfoliotavm.com/imagevscode/xerck.svg"
            alt="placeholder hero"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
