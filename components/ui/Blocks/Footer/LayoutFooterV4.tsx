import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  PhoneIcon,
  MapPinIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";

const productLinks = [
  { name: "Características", href: "#" },
  { name: "Soluciones", href: "#" },
  { name: "Tutoriales", href: "#" },
  { name: "Precios", href: "#" },
  { name: "Lanzamientos", href: "#" },
];

const companyLinks = [
  { name: "Acerca de", href: "#" },
  { name: "Clientes", href: "#" },
  { name: "Equipo", href: "#" },
  { name: "Empleos", href: "#" },
  { name: "Contacto", href: "#" },
];

const resourceLinks = [
  { name: "Blog", href: "#" },
  { name: "Newsletter", href: "#" },
  { name: "Eventos", href: "#" },
  { name: "Centro de ayuda", href: "#" },
  { name: "Tutoriales", href: "#" },
];

const legalLinks = [
  { name: "Términos", href: "#" },
  { name: "Privacidad", href: "#" },
  { name: "Cookies", href: "#" },
  { name: "Licencias", href: "#" },
  { name: "Configuración", href: "#" },
];

const contactInfo = [
  { icon: PhoneIcon, text: "+34 912 345 678" },
  { icon: MailIcon, text: "info@xerck.com" },
  { icon: MapPinIcon, text: "Calle Principal 123, Madrid" },
];

const LayoutFooterV4 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer className="bg-card text-card-foreground">
        <div className="max-w-screen-xl mx-auto px-6 xl:px-0">
          <div className="py-8 px-6 md:px-12 my-12 bg-primary rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground">¿Listo para empezar?</h3>
              <p className="text-primary-foreground/80 mt-2">Únete a más de 10,000 empresas que confían en nosotros</p>
            </div>
            <Button variant="secondary" size="lg">
              Comenzar ahora
            </Button>
          </div>

          <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              {/* Logo */}
              <svg
                width="140"
                height="40"
                viewBox="0 0 140 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50.87 15.07H53.87V27.2H50.87V15.07ZM55.06 22.62C55.06 19.62 56.9 17.83 59.74 17.83C62.58 17.83 64.42 19.62 64.42 22.62C64.42 25.62 62.62 27.42 59.74 27.42C56.86 27.42 55.06 25.67 55.06 22.62Z"
                  className="fill-card-foreground"
                />
                <path
                  d="M30 8C18.95 8 10 16.95 10 28C10 39.05 18.95 48 30 48C41.05 48 50 39.05 50 28C50 16.95 41.05 8 30 8Z"
                  className="fill-primary"
                />
              </svg>

              <p className="mt-6 text-muted-foreground max-w-md">
                Soluciones innovadoras para negocios en crecimiento. Impulsamos el éxito digital con tecnología de vanguardia.
              </p>

              <div className="mt-6 space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <InstagramIcon className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <LinkedinIcon className="h-5 w-5" />
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
                      className="text-muted-foreground hover:text-foreground transition-colors"
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
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="font-semibold text-lg mb-4">Newsletter</h6>
              <p className="text-muted-foreground mb-4">
                Suscríbete para recibir las últimas novedades
              </p>
              <form className="space-y-3">
                <Input 
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full"
                />
                <Button className="w-full">Suscribirse</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Xerck Technologies. Todos los derechos reservados.
            </span>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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

export default LayoutFooterV4;
