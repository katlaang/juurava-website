export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3 md:px-12"
         style={{ background: 'rgba(5,7,22,0.78)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(100,56,232,0.18)' }}>
      <a href="/" className="flex items-center gap-2">
        <img
          src="/images/juurava-logo.png"
          alt="Juurava Systems"
          style={{ height: '122px', width: 'auto', objectFit: 'contain' }}
        />
      </a>

      <div className="hidden items-center gap-8 text-sm md:flex">
        {['Company','Products','Approach','Contact'].map(l => (
          <a key={l} href={`/${l.toLowerCase()}`}
             className="text-mist/70 transition hover:text-bone" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
            {l}
          </a>
        ))}
      </div>

      <a href="/contact"
         className="rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition"
         style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8)', color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}>
        Get in touch
      </a>
    </nav>
  );
}
