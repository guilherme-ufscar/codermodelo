import { Linkedin, Instagram, Mail } from 'lucide-react';

const servicos = ['Apps', 'Automações', 'Sistemas', 'Sites', 'Softwares', 'Plataformas', 'CRM', 'ERP', 'Dashboards', 'Inteligência Artificial'];
const empresa = ['Sobre', 'Metodologia', 'Newsletter'];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/axyr-tecnologia/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/axyr.tecnologia', label: 'Instagram' },
  { icon: Mail, href: 'mailto:axyrtecnologia@gmail.com', label: 'Email' },
  { icon: WhatsAppIcon, href: 'https://wa.me/5551984663786', label: 'WhatsApp' },
];

export default function FooterSection() {
  return (
    <footer className="bg-secondary pt-16 md:pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div>
            <img src="/images/logo-branca.svg" alt="Axyr" className="h-8 w-auto" />
            <p className="text-sm text-secondary-foreground/50 mt-2 leading-relaxed">Execução Avançada</p>
            <div className="flex gap-3 mt-6">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-secondary-foreground/20 flex items-center justify-center text-secondary-foreground/50 hover:border-primary hover:text-primary transition-colors duration-300"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-label text-secondary-foreground/80 mb-4">Serviços</h4>
            <ul className="space-y-2">
              {servicos.map(s => (
                <li key={s}>
                  <a href="#" className="text-sm text-secondary-foreground/50 hover:text-secondary-foreground transition-colors duration-300">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-secondary-foreground/80 mb-4">Empresa</h4>
            <ul className="space-y-2">
              {empresa.map(e => (
                <li key={e}>
                  <a href="#" className="text-sm text-secondary-foreground/50 hover:text-secondary-foreground transition-colors duration-300">{e}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-secondary-foreground/80 mb-4">Newsletter</h4>
            <p className="text-sm text-secondary-foreground/60 leading-relaxed mb-4">
              Transforme sua empresa com insights semanais.
            </p>
            <h4 className="text-label text-secondary-foreground/80 mb-2 mt-6">Contato</h4>
            <p className="text-sm text-secondary-foreground/50 leading-relaxed">axyrtecnologia@gmail.com</p>
            <p className="text-sm text-secondary-foreground/50 leading-relaxed mt-1">(51) 98466-3786</p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/30 text-center md:text-left">© 2026 Axyr Tecnologia. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-secondary-foreground/30 hover:text-secondary-foreground/60 transition-colors">Termos</a>
            <a href="#" className="text-xs text-secondary-foreground/30 hover:text-secondary-foreground/60 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
