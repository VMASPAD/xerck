import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import {
  InstagramIcon,
  LinkedinIcon,
  FacebookIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Productos",
    links: [
      { name: "Características", href: "#" },
      { name: "Precios", href: "#" },
      { name: "Integraciones", href: "#" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Blog", href: "#" },
      { name: "Documentación", href: "#" },
      { name: "Guías", href: "#" },
      { name: "Soporte", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Acerca de", href: "#" },
      { name: "Clientes", href: "#" },
      { name: "Carreras", href: "#" },
      { name: "Contacto", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacidad", href: "#" },
      { name: "Términos", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licencias", href: "#" },
    ],
  },
];

const LayoutFooterV2 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow bg-muted" />
      <footer className="bg-card text-card-foreground">
        <div className="max-w-screen-xl mx-auto">
          <div className="py-16 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 xl:px-0">
            <div>
              {/* Logo */}
              <svg
                width="140"
                height="36"
                viewBox="0 0 140 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M46.87 14.07H49.87V26.2H46.87V14.07ZM51.06 21.62C51.06 18.62 52.9 16.83 55.74 16.83C58.58 16.83 60.42 18.62 60.42 21.62C60.42 24.62 58.62 26.42 55.74 26.42C52.86 26.42 51.06 24.67 51.06 21.62ZM57.41 21.62C57.41 19.97 56.76 19 55.74 19C54.72 19 54.08 20 54.08 21.62C54.08 23.24 54.71 24.22 55.74 24.22C56.77 24.22 57.41 23.3 57.41 21.63V21.62Z"
                  className="fill-card-foreground"
                />
                <path
                  d="M32.48 14.62C31.9711 13.4564 31.2976 12.3719 30.48 11.4C29.2715 9.92034 27.7633 8.71339 26.0547 7.8586C24.3461 7.00382 22.4758 6.52057 20.567 6.44066C18.6582 6.36075 16.7541 6.68599 14.98 7.39499C13.206 8.10398 11.6022 9.18065 10.2742 10.5541C8.94622 11.9276 7.92417 13.5668 7.27532 15.3637C6.62647 17.1606 6.36552 19.0746 6.50966 20.9796C6.65381 22.8847 7.19976 24.7376 8.1116 26.4164C9.02344 28.0953 10.2805 29.562 11.8 30.72C12.775 31.4779 13.8524 32.094 15 32.55C16.609 33.2094 18.3311 33.549 20.07 33.55C23.6594 33.5421 27.0992 32.1113 29.6355 29.5713C32.1717 27.0313 33.5974 23.5894 33.6 20C33.6026 18.1485 33.2213 16.3166 32.48 14.62V14.62Z"
                  className="fill-primary"
                />
              </svg>

              <p className="mt-6 text-muted-foreground max-w-md">
                Potencia tu negocio con nuestras soluciones digitales. Estamos comprometidos con la innovación y la excelencia.
              </p>

              <div className="mt-8">
                <h6 className="font-semibold mb-4">Suscríbete a nuestro newsletter</h6>
                <form className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="w-full sm:w-auto" 
                  />
                  <Button>Suscribirse</Button>
                </form>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h6 className="font-semibold mb-4">{group.title}</h6>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
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
              ))}
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 px-6 xl:px-0">
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Xerck Technologies. Todos los derechos reservados.
            </span>

            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <YoutubeIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutFooterV2;
