import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { name: "Inicio", href: "#" },
  { name: "Características", href: "#" },
  { name: "Precios", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contacto", href: "#" },
  { name: "Términos", href: "#" },
  { name: "Privacidad", href: "#" },
];

const LayoutFooterV3 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer className="bg-background">
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col items-center justify-center text-center px-6 xl:px-0 space-y-8">
            {/* Logo */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM45.5 32.5H32.5V45.5H27.5V32.5H14.5V27.5H27.5V14.5H32.5V27.5H45.5V32.5Z"
                className="fill-primary"
              />
            </svg>

            <h3 className="text-xl font-semibold">Xerck</h3>

            <nav>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <YoutubeIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <Separator />
          <div className="py-6 text-center px-6 xl:px-0">
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Xerck. Todos los derechos reservados.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutFooterV3;
