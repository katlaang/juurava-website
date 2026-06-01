import { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CitrusMap from './components/CitrusMap';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  const [mapActive, setMapActive] = useState(false);
  const mapShellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!mapShellRef.current?.contains(event.target as Node)) {
        setMapActive(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const page = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (page && ['company', 'products', 'approach', 'contact'].includes(page)) {
    return <InfoPage page={page} />;
  }

  return (
    <div id="top" style={{ background: '#050716', minHeight: '100vh' }}>
      <Nav />

      {/* HERO */}
      <section className="home-hero" style={{ position: 'relative', overflow: 'hidden', paddingTop: '120px', paddingBottom: '200px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="tech-grid" style={{ position: 'absolute', inset: 0, opacity: 0.8 }} />
        <div className="glow-magenta" style={{ position: 'absolute', top: '-100px', left: '-150px', width: '700px', height: '700px', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div className="glow-cyan" style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '600px', height: '600px', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div className="glow-violet" style={{ position: 'absolute', top: '30%', left: '40%', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #D21B9C, #6438E8, #168FE6, transparent)' }} />

        <div className="home-hero__layout" style={{ position: 'relative', width: '100%', maxWidth: '1360px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '0.86fr 1.14fr', gap: '44px', alignItems: 'center' }}>
          <div className="home-hero__copy">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D21B9C', opacity: 0, animation: 'rise 0.8s ease-out 0.1s forwards' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#D21B9C' }} />
              Juurava Systems · Technology company
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, Inter Tight, sans-serif', fontWeight: 700, fontSize: 'clamp(52px, 7vw, 96px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E7EAF8', marginBottom: '20px' }}>
              AI-ASSISTED<br />
              <span style={{ background: 'linear-gradient(135deg, #D21B9C 0%, #6438E8 50%, #168FE6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DECISION</span><br />
              SUPPORT.
            </h1>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400, fontSize: '18px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(184,196,234,0.6)', marginBottom: '32px' }}>
              FOR HIGH-STAKES WORK
            </div>
            <p style={{ maxWidth: '520px', fontSize: '17px', lineHeight: 1.7, color: 'rgba(184,196,234,0.8)', marginBottom: '44px', fontFamily: 'Inter Tight, sans-serif' }}>
              Juurava builds platforms for agronomists in the field and clinicians at the bedside. Software that works offline, surfaces signals early, and keeps the expert in control.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '40px', background: 'linear-gradient(135deg, #D21B9C, #6438E8)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 0 30px rgba(210,27,156,0.4)' }}>
                See products
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
              <a href="/company" style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '14px', color: 'rgba(184,196,234,0.75)', textDecoration: 'none', borderBottom: '1px solid rgba(184,196,234,0.35)', paddingBottom: '2px' }}>
                About Juurava
              </a>
            </div>
          </div>

          {/* RIGHT — abstract orbital visual */}
          <div
            ref={mapShellRef}
            className={`hero-map-shell ${mapActive ? 'is-active' : ''}`}
            onPointerDown={(event) => {
              event.stopPropagation();
              setMapActive(true);
            }}
          >
            <CitrusMap />
          </div>
        </div>

        {/* AD.019-style indexed strip */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(100,56,232,0.2)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {[
            { n: '01', label: 'Agritech', title: 'Pelturi', desc: 'AI-assisted plant-health scouting and early outbreak detection for greenhouse and specialty-crop operations.' },
            { n: '02', label: 'Healthtech', title: 'Dalili', desc: 'AI-assisted clinical triage — helping frontline care teams identify the severity and urgency of presenting symptoms.' },
            { n: '03', label: 'Philosophy', title: 'Expert-in-the-loop', desc: 'AI surfaces signals and ranks possibilities. The agronomist and the clinician make the call.' },
          ].map((item, i) => (
            <div key={item.n} style={{ padding: '28px 36px', borderRight: i < 2 ? '1px solid rgba(100,56,232,0.2)' : 'none', background: 'rgba(5,7,22,0.75)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: item.title === 'Pelturi' ? '#2FA66A' : '#D21B9C', letterSpacing: '0.2em' }}>{item.n}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(184,196,234,0.4)' }}>{item.label}</span>
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px', color: '#E7EAF8', marginBottom: '6px' }}>{item.title}</div>
              <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '12px', lineHeight: 1.6, color: 'rgba(184,196,234,0.55)' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANY */}
      <section id="company" className="reveal" style={{ padding: '120px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <Label>The company</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'start' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E7EAF8' }}>
            One company.<br/>Two products.<br/>
            <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One philosophy.</span>
          </h2>
          <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '16px', lineHeight: 1.8, color: 'rgba(184,196,234,0.8)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>Juurava Systems builds AI-assisted decision-support platforms for fields where decisions are time-sensitive, consequential, and made by trained experts working under pressure. Today the work spans agriculture and healthcare.</p>
            <p>In both domains, a small number of skilled people make rapid judgements with imperfect information. The cost of a missed signal is high. The cost of a false alarm is also high. The right tools put more information into expert hands — they don't try to take the expert out of the loop.</p>
            <p>We build offline-first because the field and the bedside don't always have signal. We build for the long arc because infrastructure for serious work has to last.</p>
          </div>
        </div>
        <div style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(100,56,232,0.2)', border: '1px solid rgba(100,56,232,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
          {[{ k: 'Founded', v: '2025' },{ k: 'Headquartered', v: 'Texas, US' },{ k: 'Active products', v: 'Pelturi · Dalili' },{ k: 'Architecture', v: 'Offline-first' }].map(s => (
            <div key={s.k} style={{ padding: '28px 32px', background: 'rgba(5,7,22,0.85)' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,196,234,0.4)', marginBottom: '10px' }}>{s.k}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '20px', color: '#E7EAF8' }}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="reveal" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(100,56,232,0.2)', borderBottom: '1px solid rgba(100,56,232,0.2)', background: '#030512', padding: '120px 48px' }}>
        <div className="tech-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>
          <Label>Products</Label>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E7EAF8', marginBottom: '64px', maxWidth: '600px' }}>
            Two platforms.<br/>
            <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8,#168FE6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Same engineering principles.</span>
          </h2>
          <ProductCard id="pelturi" accent="#2FA66A" accentSecondary="#93B83E" glowClass="glow-green"
            label="Agritech · In development" name="Pelturi" tagline="AI-assisted plant-health scouting and early outbreak detection."
            body={["Pelturi is an offline-first agricultural technology platform combining field images, crop observations, location-aware reporting, environmental indicators, and alert workflows — narrowing the gap between what a scout sees and what a grower can act on.","Built for greenhouse, nursery, and specialty-crop operations. Independent agronomic evaluation provided by external reviewers including MOFO, the agritech initiative of Genellien."]}
            ctaLabel="Visit pelturi.com" ctaHref="https://pelturi.com"
            stats={[{k:'Status',v:'In development'},{k:'Stage',v:'Planning & evaluation'},{k:'Operations',v:'Greenhouse · Nursery · Specialty crops'},{k:'Geography',v:'United States'},{k:'Evaluator',v:'MOFO · Genellien'},{k:'Architecture',v:'Offline-first · Edge-tolerant'}]}
          />
          <ProductCard id="dalili" accent="#168FE6" accentSecondary="#6438E8" glowClass="glow-cyan"
            label="Healthtech · In development" name="Dalili"
            etymology="Swahili · noun: a sign, symptom, indication of something underneath"
            tagline="AI-assisted clinical triage for frontline care."
            body={["Dalili is a clinical decision-support platform that helps frontline healthcare workers read the signs of acute illness earlier and more accurately — combining structured symptom intake, patient-history context, and AI-assisted triage prioritization.","Designed for settings where caseloads are high, decision time is short, and connectivity cannot be assumed. Triage suggestions are advisory; the clinician makes the call."]}
            ctaLabel="Talk to us about Dalili" ctaHref="/contact"
            stats={[{k:'Status',v:'In development'},{k:'Stage',v:'Planning & evaluation'},{k:'Setting',v:'Frontline clinical care'},{k:'Use',v:'Triage prioritization'},{k:'Role of AI',v:'Advisory · Clinician decides'},{k:'Architecture',v:'Offline-first · Privacy-first'}]}
          />
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="reveal" style={{ padding: '120px 48px', maxWidth: '1280px', margin: '0 auto' }}>
        <Label>Approach</Label>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#E7EAF8', marginBottom: '64px', maxWidth: '600px' }}>
          Three principles that shape{' '}
          <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>everything.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {[
            { n: '01', title: 'AI assists, experts decide', body: "Our platforms are decision-support tools, not decision-replacement tools. Agronomists and clinicians remain the source of authority. AI surfaces signals and reduces busywork — the call belongs to the person closest to the situation." },
            { n: '02', title: 'Resilience-first engineering', body: "The field doesn't have signal. The clinic loses power. Our software works when conditions are not ideal — offline storage, edge-tolerant sync, graceful degradation. If it only works in good conditions, it doesn't work." },
            { n: '03', title: 'Built with practitioners', body: "Every product is built alongside people who do the work — agronomists for Pelturi, clinicians for Dalili. We design from real workflows outward, not from technical demos inward." },
          ].map(p => (
            <div key={p.n} className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#D21B9C', letterSpacing: '0.2em' }}>{p.n}</span>
                <span style={{ flex: 1, height: '1px', background: 'rgba(100,56,232,0.3)' }} />
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '20px', color: '#E7EAF8', marginBottom: '12px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '14px', lineHeight: 1.7, color: 'rgba(184,196,234,0.7)' }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="reveal" style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(100,56,232,0.2)', padding: '120px 48px', textAlign: 'center' }}>
        <div className="glow-violet" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '600px', filter: 'blur(80px)' }} />
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <Label centered>Get in touch</Label>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#E7EAF8', marginBottom: '24px' }}>
            For partnerships,{' '}
            <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8,#168FE6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>pilots,</span>
            {' '}and serious conversations.
          </h2>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', lineHeight: 1.7, color: 'rgba(184,196,234,0.75)', marginBottom: '44px' }}>
            Juurava Systems works with growers, clinical institutions, and research partners who want infrastructure built for difficult conditions.
          </p>
          <a href="mailto:hello@juurava.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 40px', borderRadius: '40px', background: 'linear-gradient(135deg,#D21B9C,#6438E8,#168FE6)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 0 40px rgba(100,56,232,0.5)' }}>
            hello@juurava.com
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rise { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}

function InfoPage({ page }: { page: string }) {
  return (
    <div id="top" style={{ background: '#050716', minHeight: '100vh' }}>
      <Nav />
      <main style={{ position: 'relative', overflow: 'hidden', padding: '190px 48px 120px' }}>
        <div className="tech-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div className={page === 'products' ? 'glow-green' : 'glow-magenta'} style={{ position: 'absolute', top: '80px', right: '-180px', width: '560px', height: '560px', borderRadius: '50%', filter: 'blur(90px)' }} />
        <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>
          {page === 'company' && <CompanyPage />}
          {page === 'products' && <ProductsPage />}
          {page === 'approach' && <ApproachPage />}
          {page === 'contact' && <ContactPage />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function CompanyPage() {
  return (
    <>
      <Label>The company</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'start' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(44px,6vw,76px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#E7EAF8' }}>
          One company.<br/>Two products.<br/>
          <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>One philosophy.</span>
        </h1>
        <div style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', lineHeight: 1.8, color: 'rgba(184,196,234,0.82)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p>Juurava Systems builds AI-assisted decision-support platforms for fields where decisions are time-sensitive, consequential, and made by trained experts working under pressure. Today the work spans agriculture and healthcare.</p>
          <p>In both domains, a small number of skilled people make rapid judgements with imperfect information. The cost of a missed signal is high. The cost of a false alarm is also high. The right tools put more information into expert hands - they don't try to take the expert out of the loop.</p>
          <p>We build offline-first because the field and the bedside don't always have signal. We build for the long arc because infrastructure for serious work has to last.</p>
        </div>
      </div>
      <StatsGrid />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <Label>Products</Label>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(44px,6vw,76px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#E7EAF8', marginBottom: '64px', maxWidth: '760px' }}>
        Two platforms.<br/>
        <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8,#168FE6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Same engineering principles.</span>
      </h1>
      <ProductCard id="pelturi" accent="#2FA66A" accentSecondary="#93B83E" glowClass="glow-green"
        label="Agritech - In development" name="Pelturi" tagline="AI-assisted plant-health scouting and early outbreak detection."
        body={["Pelturi is an offline-first agricultural technology platform combining field images, crop observations, location-aware reporting, environmental indicators, and alert workflows - narrowing the gap between what a scout sees and what a grower can act on.","Built for greenhouse, nursery, and specialty-crop operations. Independent agronomic evaluation provided by external reviewers including MOFO, the agritech initiative of Genellien."]}
        ctaLabel="Visit pelturi.com" ctaHref="https://pelturi.com"
        stats={[{k:'Status',v:'In development'},{k:'Stage',v:'Planning & evaluation'},{k:'Operations',v:'Greenhouse - Nursery - Specialty crops'},{k:'Geography',v:'United States'},{k:'Evaluator',v:'MOFO - Genellien'},{k:'Architecture',v:'Offline-first - Edge-tolerant'}]}
      />
      <ProductCard id="dalili" accent="#168FE6" accentSecondary="#6438E8" glowClass="glow-cyan"
        label="Healthtech - In development" name="Dalili"
        etymology="Swahili - noun: a sign, symptom, indication of something underneath"
        tagline="AI-assisted clinical triage for frontline care."
        body={["Dalili is a clinical decision-support platform that helps frontline healthcare workers read the signs of acute illness earlier and more accurately - combining structured symptom intake, patient-history context, and AI-assisted triage prioritization.","Designed for settings where caseloads are high, decision time is short, and connectivity cannot be assumed. Triage suggestions are advisory; the clinician makes the call."]}
        ctaLabel="Talk to us about Dalili" ctaHref="/contact"
        stats={[{k:'Status',v:'In development'},{k:'Stage',v:'Planning & evaluation'},{k:'Setting',v:'Frontline clinical care'},{k:'Use',v:'Triage prioritization'},{k:'Role of AI',v:'Advisory - Clinician decides'},{k:'Architecture',v:'Offline-first - Privacy-first'}]}
      />
    </>
  );
}

function ApproachPage() {
  const principles = [
    { n: '01', title: 'AI assists, experts decide', body: "Our platforms are decision-support tools, not decision-replacement tools. Agronomists and clinicians remain the source of authority. AI surfaces signals and reduces busywork - the call belongs to the person closest to the situation." },
    { n: '02', title: 'Resilience-first engineering', body: "The field doesn't have signal. The clinic loses power. Our software works when conditions are not ideal - offline storage, edge-tolerant sync, graceful degradation. If it only works in good conditions, it doesn't work." },
    { n: '03', title: 'Built with practitioners', body: "Every product is built alongside people who do the work - agronomists for Pelturi, clinicians for Dalili. We design from real workflows outward, not from technical demos inward." },
  ];

  return (
    <>
      <Label>Approach</Label>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(44px,6vw,76px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#E7EAF8', marginBottom: '64px', maxWidth: '760px' }}>
        Three principles that shape{' '}
        <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>everything.</span>
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {principles.map(p => (
          <div key={p.n} className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#D21B9C', letterSpacing: '0.2em' }}>{p.n}</span>
              <span style={{ flex: 1, height: '1px', background: 'rgba(100,56,232,0.3)' }} />
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '20px', color: '#E7EAF8', marginBottom: '12px' }}>{p.title}</h2>
            <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '14px', lineHeight: 1.7, color: 'rgba(184,196,234,0.7)' }}>{p.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ContactPage() {
  return (
    <div style={{ maxWidth: '760px' }}>
      <Label>Get in touch</Label>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(44px,6vw,76px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#E7EAF8', marginBottom: '24px' }}>
        For partnerships,{' '}
        <span style={{ background: 'linear-gradient(135deg,#D21B9C,#6438E8,#168FE6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>pilots,</span>
        {' '}and serious conversations.
      </h1>
      <p style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '17px', lineHeight: 1.7, color: 'rgba(184,196,234,0.75)', marginBottom: '44px' }}>
        Juurava Systems works with growers, clinical institutions, and research partners who want infrastructure built for difficult conditions.
      </p>
      <a href="mailto:hello@juurava.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 40px', borderRadius: '40px', background: 'linear-gradient(135deg,#D21B9C,#6438E8,#168FE6)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 0 40px rgba(100,56,232,0.5)' }}>
        hello@juurava.com
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  );
}

function StatsGrid() {
  return (
    <div style={{ marginTop: '72px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(100,56,232,0.2)', border: '1px solid rgba(100,56,232,0.2)', borderRadius: '12px', overflow: 'hidden' }}>
      {[{ k: 'Founded', v: '2025' },{ k: 'Headquartered', v: 'Texas, US' },{ k: 'Active products', v: 'Pelturi - Dalili' },{ k: 'Architecture', v: 'Offline-first' }].map(s => (
        <div key={s.k} style={{ padding: '28px 32px', background: 'rgba(5,7,22,0.85)' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,196,234,0.4)', marginBottom: '10px' }}>{s.k}</div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '20px', color: '#E7EAF8' }}>{s.v}</div>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ id, accent, accentSecondary, glowClass, label, name, etymology, tagline, body, ctaLabel, ctaHref, stats }: {
  id: string; accent: string; accentSecondary: string; glowClass: string;
  label: string; name: string; etymology?: string; tagline: string;
  body: string[]; ctaLabel: string; ctaHref: string;
  stats: { k: string; v: string }[];
}) {
  const rgb = accent === '#2FA66A' ? '47,166,106' : accent === '#D21B9C' ? '210,27,156' : '22,143,230';
  return (
    <div id={id} style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px', border: `1px solid rgba(${rgb},0.25)`, padding: '56px', marginBottom: '24px', background: 'rgba(10,16,48,0.5)', backdropFilter: 'blur(12px)' }}>
      <div className={glowClass} style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${accent}, ${accentSecondary}, transparent)` }} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '56px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: accent }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }} />
            {label}
          </div>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(48px,6vw,80px)', lineHeight: 1.0, letterSpacing: '-0.03em', color: '#E7EAF8', marginBottom: etymology ? '8px' : '16px' }}>{name}</h3>
          {etymology && <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: `${accent}90`, marginBottom: '16px' }}>{etymology}</p>}
          <p style={{ fontSize: '19px', lineHeight: 1.4, color: accent, marginBottom: '28px', fontFamily: 'Inter Tight, sans-serif', fontWeight: 500 }}>{tagline}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            {body.map((p, i) => <p key={i} style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '15px', lineHeight: 1.75, color: 'rgba(184,196,234,0.78)' }}>{p}</p>)}
          </div>
          <a href={ctaHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '40px', background: accent, color: '#030512', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: `0 0 24px ${accent}60` }}>
            {ctaLabel}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 7h10v10M7 17 17 7"/></svg>
          </a>
        </div>
        <div style={{ borderRadius: '12px', padding: '28px', background: 'rgba(3,5,18,0.6)', border: `1px solid ${accent}25` }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: accent, marginBottom: '20px' }}>At a glance</div>
          {stats.map((s, i) => (
            <div key={s.k} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '12px 0', borderBottom: i < stats.length - 1 ? '1px solid rgba(100,56,232,0.15)' : 'none' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(184,196,234,0.45)' }}>{s.k}</span>
              <span style={{ fontFamily: 'Inter Tight, sans-serif', fontSize: '13px', color: '#E7EAF8', textAlign: 'right' }}>{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Label({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#D21B9C', justifyContent: centered ? 'center' : 'flex-start' }}>
      <span style={{ display: 'block', width: '32px', height: '1px', background: '#D21B9C', opacity: 0.7 }} />
      {children}
    </div>
  );
}
