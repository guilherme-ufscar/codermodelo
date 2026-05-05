import { useState } from 'react';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 1C7.73 1 1 7.73 1 16c0 2.64.69 5.12 1.89 7.28L1 31l7.91-1.85A15 15 0 0 0 16 31c8.27 0 15-6.73 15-15S24.27 1 16 1zm0 27.5a12.44 12.44 0 0 1-6.35-1.74l-.45-.27-4.7 1.1 1.13-4.58-.3-.47A12.5 12.5 0 1 1 16 28.5zm6.86-9.37c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.19-.84.19-.25.37-.96 1.21-1.18 1.46-.22.25-.43.28-.8.09-.37-.19-1.56-.57-2.97-1.83-1.1-.98-1.84-2.19-2.05-2.56-.22-.37-.02-.57.16-.75.17-.17.37-.43.56-.65.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.65-.09-.19-.84-2.03-1.15-2.78-.3-.73-.61-.63-.84-.64l-.71-.01c-.25 0-.65.09-.99.47-.34.37-1.3 1.27-1.3 3.1s1.33 3.6 1.52 3.85c.19.25 2.62 4 6.35 5.61.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.71-.11 2.2-.9 2.51-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
    </svg>
  );
}

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="bg-foreground text-background text-sm font-medium px-4 py-2 rounded-xl shadow-lg whitespace-nowrap">
          Chame a nossa equipe pelo whatsapp
        </div>
      )}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)',
          animation: 'pulse-whatsapp 2s ease-in-out infinite',
        }}
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
