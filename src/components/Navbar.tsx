import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = ['Home', 'Serviços', 'Metodologia', 'Sobre', 'Contato'];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  function anchorHref(item: string) {
    const hash = `#${item.toLowerCase()}`;
    return isHome ? hash : `/${hash}`;
  }

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-background/80 backdrop-blur-md"
      >
        <Link to="/" onClick={closeMenu}>
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
              Newsletters
            </Link>
          </li>
        </ul>

        <a href={anchorHref('contato')} className="hidden md:inline-flex text-label text-primary hover:text-foreground transition-colors duration-300">
          Fale Conosco →
        </a>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-8 py-6 flex flex-col gap-5 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={anchorHref(item)}
                onClick={closeMenu}
                className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={closeMenu}
              className="text-label text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Newsletters
            </Link>
            <a
              href={anchorHref('contato')}
              onClick={closeMenu}
              className="text-label text-primary hover:text-foreground transition-colors duration-300 mt-2"
            >
              Fale Conosco →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
