import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  GlobeIcon,
  HeartIcon,
  ShieldIcon,
  ZapIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Productos",
    links: [
      { name: "Plataforma", href: "#" },
      { name: "Análisis", href: "#" },
      { name: "CRM", href: "#" },
      { name: "Comercio", href: "#" },
      { name: "Integraciones", href: "#" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Centro de soporte", href: "#" },
      { name: "Documentación", href: "#" },
      { name: "Guías", href: "#" },
      { name: "API", href: "#" },
      { name: "Comunidad", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Acerca de", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contacto", href: "#" },
      { name: "Medios", href: "#" },
    ],
  },
];

const features = [
  {
    icon: ZapIcon,
    text: "Rápido y fiable",
  },
  {
    icon: ShieldIcon,
    text: "Seguro por defecto",
  },
  {
    icon: GlobeIcon,
    text: "Disponible globalmente",
  },
  {
    icon: HeartIcon,
    text: "Con atención al detalle",
  },
];

const LayoutFooterV7 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer className="bg-accent text-accent-foreground">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-0">
          <div className="pt-16 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-8">
                {/* Logo */}
                <svg
                  width="140"
                  height="40"
                  viewBox="0 0 140 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.87 15.07H48.87V27.2H45.87V15.07ZM50.06 22.62C50.06 19.62 51.9 17.83 54.74 17.83C57.58 17.83 59.42 19.62 59.42 22.62C59.42 25.62 57.62 27.42 54.74 27.42C51.86 27.42 50.06 25.67 50.06 22.62Z"
                    className="fill-accent-foreground"
                  />
                  <path
                    d="M28 8C16.95 8 8 16.95 8 28C8 39.05 16.95 48 28 48C39.05 48 48 39.05 48 28C48 16.95 39.05 8 28 8ZM28 44C19.18 44 12 36.82 12 28C12 19.18 19.18 12 28 12C36.82 12 44 19.18 44 28C44 36.82 36.82 44 28 44Z"
                    className="fill-primary"
                  />
                </svg>

                <p className="text-accent-foreground/80 max-w-md">
                  Plataforma completa para el crecimiento de tu negocio. Todo lo que necesitas para escalar con confianza.
                </p>

                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.text} className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-accent-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h6 className="font-semibold text-lg mb-4">{section.title}</h6>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-accent-foreground/70 hover:text-accent-foreground transition-colors flex items-center group"
                          >
                            {link.name}
                            <ArrowUpRightIcon className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="bg-accent-foreground/10" />
          
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
              <Link
                href="#"
                className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors"
              >
                Términos
              </Link>
              <Link
                href="#"
                className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors"
              >
                Cookies
              </Link>
            </div>

            <form className="flex items-center gap-2 w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Suscríbete al newsletter" 
                className="max-w-xs bg-accent-foreground/5 border-accent-foreground/10"
              />
              <Button variant="outline">
                Suscribir
              </Button>
            </form>

            <span className="text-sm text-accent-foreground/60 order-first md:order-last">
              &copy; {new Date().getFullYear()} Xerck
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutFooterV7;
