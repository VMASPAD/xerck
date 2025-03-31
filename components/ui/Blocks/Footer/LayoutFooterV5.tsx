import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ChevronUpIcon,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Producto",
    links: [
      { name: "Características", href: "#" },
      { name: "Precios", href: "#" },
      { name: "Integraciones", href: "#" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Blog", href: "#" },
      { name: "Documentación", href: "#" },
      { name: "Comunidad", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Acerca de", href: "#" },
      { name: "Clientes", href: "#" },
      { name: "Carreras", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacidad", href: "#" },
      { name: "Términos", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  },
];

const LayoutFooterV5 = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer className="bg-secondary">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-0">
          <div className="py-10 flex flex-col-reverse md:flex-row justify-between items-start gap-8">
            <div className="w-full md:w-1/3">
              {/* Logo */}
              <svg
                width="120"
                height="40"
                viewBox="0 0 120 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M45.87 15.07H48.87V27.2H45.87V15.07ZM50.06 22.62C50.06 19.62 51.9 17.83 54.74 17.83C57.58 17.83 59.42 19.62 59.42 22.62C59.42 25.62 57.62 27.42 54.74 27.42C51.86 27.42 50.06 25.67 50.06 22.62Z"
                  className="fill-secondary-foreground"
                />
                <path
                  d="M23 8C15.28 8 9 14.28 9 22C9 29.72 15.28 36 23 36C30.72 36 37 29.72 37 22C37 14.28 30.72 8 23 8ZM23 32C17.5 32 13 27.5 13 22C13 16.5 17.5 12 23 12C28.5 12 33 16.5 33 22C33 27.5 28.5 32 23 32Z"
                  className="fill-primary"
                />
              </svg>

              <p className="mt-4 text-secondary-foreground/80">
                Plataforma líder en innovación tecnológica. Ofrecemos soluciones adaptadas a tus necesidades empresariales.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <Link href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                  <InstagramIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h6 className="font-semibold text-secondary-foreground mb-3">{group.title}</h6>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Separator className="bg-secondary-foreground/10" />
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-secondary-foreground/70">
              &copy; {new Date().getFullYear()} Xerck. Todos los derechos reservados.
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full bg-secondary-foreground/10 hover:bg-secondary-foreground/20 border-none"
            >
              <ChevronUpIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutFooterV5;
