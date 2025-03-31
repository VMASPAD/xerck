import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";

const productLinks = [
  { name: "Descripción general", href: "#" },
  { name: "Características", href: "#" },
  { name: "Soluciones", href: "#" },
  { name: "Tutoriales", href: "#" },
  { name: "Precios", href: "#" },
  { name: "Lanzamientos", href: "#" },
];

const companyLinks = [
  { name: "Acerca de nosotros", href: "#" },
  { name: "Carreras", href: "#" },
  { name: "Prensa", href: "#" },
  { name: "Noticias", href: "#" },
  { name: "Contacto", href: "#" },
];

const legalLinks = [
  { name: "Términos", href: "#" },
  { name: "Privacidad", href: "#" },
  { name: "Cookies", href: "#" },
  { name: "Licencias", href: "#" },
];

const LayoutFooterV6 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
            <div className="space-y-6">
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
                  className="fill-primary-foreground"
                />
                <circle cx="24" cy="24" r="16" className="fill-background" />
              </svg>

              <p className="text-primary-foreground/80">
                Impulsamos la transformación digital con tecnología avanzada y soluciones personalizadas.
              </p>

              <div className="flex items-center gap-4">
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <InstagramIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <YoutubeIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h6 className="font-semibold text-lg mb-4">Productos</h6>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-semibold text-lg mb-4">Empresa</h6>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-semibold text-lg mb-4">Suscríbete</h6>
              <p className="text-primary-foreground/80 mb-4">
                Mantente al día con nuestras últimas novedades y actualizaciones.
              </p>
              <form className="flex items-center">
                <Input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="rounded-r-none bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button 
                  className="rounded-l-none border border-l-0 border-primary-foreground/20"
                  variant="outline"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          <Separator className="bg-primary-foreground/20" />
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} Xerck Technologies. Todos los derechos reservados.
            </span>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutFooterV6;
