import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = ['Home', 'Serviços', 'Metodologia', 'Sobre', 'Contato'];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  function anchorHref(item: string) {
    const hash = `#${item.toLowerCase()}`;
    return isHome ? hash : `/${hash}`;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-background/80 backdrop-blur-md"
    >
      <Link to="/">
        <img src="/images/logo-roxa.svg" alt="Axyr" className="h-8 w-auto" />
      </Link>
      <ul className="hidden md:flex items-center gap-10">
        {navItems.map((item) => (
          <li key={item}>
            <a href={anchorHref(item)} className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300">
              {item}
            </a>
          </li>
        ))}
        <li>
          <Link to="/blog" className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300">
            Blog
          </Link>
        </li>
      </ul>
      <a href={anchorHref('contato')} className="hidden md:inline-flex text-label text-primary hover:text-foreground transition-colors duration-300">
        Fale Conosco →
      </a>
    </motion.nav>
  );
}
