export default function Footer() {
  return (
    <footer className="border-t px-6 pb-8 pt-16 md:px-12"
            style={{ background: '#030512', borderColor: 'rgba(100,56,232,0.18)' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 border-b pb-12 md:grid-cols-[2fr_1fr_1fr_1fr]"
           style={{ borderColor: 'rgba(100,56,232,0.14)' }}>
        <div>
          <div className="mb-5">
            <img
              src="/images/juurava-logo.png"
              alt="Juurava Systems"
              style={{ height: '122px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'rgba(184,196,234,0.6)' }}>
            AI-assisted decision-support infrastructure for high-stakes work - in the field and at the bedside.
          </p>
        </div>

        {[
          { h: 'Products', links: [{ label: 'Pelturi - Agritech', href: '/products' }, { label: 'Dalili - Healthtech', href: '/products' }] },
          { h: 'Company',  links: [{ label: 'About', href: '/company' }, { label: 'Approach', href: '/approach' }, { label: 'Contact', href: '/contact' }] },
          { h: 'Connect',  links: [{ label: 'hello@juurava.com', href: 'mailto:hello@juurava.com' }] },
        ].map(col => (
          <div key={col.h}>
            <h5 className="mb-4 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: '#D21B9C', fontFamily: 'JetBrains Mono, monospace' }}>{col.h}</h5>
            {col.links.map(l => (
              <a key={l.label} href={l.href} className="block py-1.5 text-sm transition hover:text-bone"
                 style={{ color: 'rgba(184,196,234,0.65)' }}>{l.label}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-2 font-mono text-[11px] tracking-wider md:flex-row"
           style={{ color: 'rgba(184,196,234,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>
        <span>(c) {new Date().getFullYear()} JUURAVA SYSTEMS - ALL RIGHTS RESERVED</span>
        <span>BUILT FOR HIGH-STAKES WORK - ONLINE OR OFFLINE</span>
      </div>
    </footer>
  );
}
