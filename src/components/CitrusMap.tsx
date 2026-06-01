import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    d3?: any;
    topojson?: any;
  }
}

type DetectionType = 'alert' | 'early' | 'clear';

type SelectedState = {
  id: string;
  name: string;
  load: number;
};

const SEVERITY_BY_YEAR: Record<number, Record<string, number>> = {
  2022: {
    '01': 12, '02': 0, '04': 10, '05': 4, '06': 18, '08': 0, '09': 0, '10': 0, '11': 0, '12': 72,
    '13': 18, '15': 2, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 3, '22': 28, '23': 0,
    '24': 0, '25': 0, '26': 0, '27': 0, '28': 10, '29': 2, '30': 0, '31': 0, '32': 5, '33': 0,
    '34': 0, '35': 6, '36': 0, '37': 5, '38': 0, '39': 0, '40': 4, '41': 0, '42': 0, '44': 0,
    '45': 8, '46': 0, '47': 3, '48': 32, '49': 0, '50': 0, '51': 2, '53': 0, '54': 0, '55': 0,
    '56': 0, '72': 0,
  },
  2023: {
    '01': 16, '02': 0, '04': 13, '05': 6, '06': 22, '08': 0, '09': 0, '10': 0, '11': 0, '12': 79,
    '13': 24, '15': 3, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 4, '22': 35, '23': 0,
    '24': 0, '25': 0, '26': 0, '27': 0, '28': 13, '29': 3, '30': 0, '31': 0, '32': 7, '33': 0,
    '34': 0, '35': 8, '36': 0, '37': 8, '38': 0, '39': 0, '40': 5, '41': 0, '42': 0, '44': 0,
    '45': 12, '46': 0, '47': 4, '48': 41, '49': 0, '50': 0, '51': 3, '53': 0, '54': 0, '55': 0,
    '56': 0, '72': 0,
  },
  2024: {
    '01': 19, '02': 0, '04': 15, '05': 8, '06': 26, '08': 0, '09': 0, '10': 0, '11': 0, '12': 86,
    '13': 30, '15': 4, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 5, '22': 39, '23': 0,
    '24': 0, '25': 0, '26': 0, '27': 0, '28': 14, '29': 4, '30': 0, '31': 0, '32': 9, '33': 0,
    '34': 0, '35': 10, '36': 0, '37': 10, '38': 0, '39': 0, '40': 7, '41': 0, '42': 0, '44': 0,
    '45': 15, '46': 0, '47': 5, '48': 49, '49': 0, '50': 0, '51': 4, '53': 0, '54': 0, '55': 0,
    '56': 0, '72': 0,
  },
  2025: {
    '01': 21, '02': 0, '04': 17, '05': 9, '06': 28, '08': 0, '09': 0, '10': 0, '11': 0, '12': 91,
    '13': 33, '15': 5, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 6, '22': 41, '23': 0,
    '24': 0, '25': 0, '26': 0, '27': 0, '28': 15, '29': 5, '30': 0, '31': 0, '32': 10, '33': 0,
    '34': 0, '35': 12, '36': 0, '37': 12, '38': 0, '39': 0, '40': 8, '41': 0, '42': 0, '44': 0,
    '45': 17, '46': 0, '47': 6, '48': 53, '49': 0, '50': 0, '51': 5, '53': 0, '54': 0, '55': 0,
    '56': 0, '72': 0,
  },
  2026: {
    '01': 22, '02': 0, '04': 18, '05': 10, '06': 30, '08': 0, '09': 0, '10': 0, '11': 0, '12': 95,
    '13': 35, '15': 6, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 7, '22': 42, '23': 0,
    '24': 0, '25': 0, '26': 0, '27': 0, '28': 15, '29': 6, '30': 0, '31': 0, '32': 11, '33': 0,
    '34': 0, '35': 13, '36': 0, '37': 13, '38': 0, '39': 0, '40': 9, '41': 0, '42': 0, '44': 0,
    '45': 18, '46': 0, '47': 7, '48': 55, '49': 0, '50': 0, '51': 6, '53': 0, '54': 0, '55': 0,
    '56': 0, '72': 0,
  },
};

const STATE_NAMES: Record<string, string> = {
  '01': 'Alabama',
  '02': 'Alaska',
  '04': 'Arizona',
  '05': 'Arkansas',
  '06': 'California',
  '08': 'Colorado',
  '09': 'Connecticut',
  '10': 'Delaware',
  '11': 'D.C.',
  '12': 'Florida',
  '13': 'Georgia',
  '15': 'Hawaii',
  '16': 'Idaho',
  '17': 'Illinois',
  '18': 'Indiana',
  '19': 'Iowa',
  '20': 'Kansas',
  '21': 'Kentucky',
  '22': 'Louisiana',
  '23': 'Maine',
  '24': 'Maryland',
  '25': 'Massachusetts',
  '26': 'Michigan',
  '27': 'Minnesota',
  '28': 'Mississippi',
  '29': 'Missouri',
  '30': 'Montana',
  '31': 'Nebraska',
  '32': 'Nevada',
  '33': 'New Hampshire',
  '34': 'New Jersey',
  '35': 'New Mexico',
  '36': 'New York',
  '37': 'North Carolina',
  '38': 'North Dakota',
  '39': 'Ohio',
  '40': 'Oklahoma',
  '41': 'Oregon',
  '42': 'Pennsylvania',
  '44': 'Rhode Island',
  '45': 'South Carolina',
  '46': 'South Dakota',
  '47': 'Tennessee',
  '48': 'Texas',
  '49': 'Utah',
  '50': 'Vermont',
  '51': 'Virginia',
  '53': 'Washington',
  '54': 'West Virginia',
  '55': 'Wisconsin',
  '56': 'Wyoming',
  '72': 'Puerto Rico',
};

const DETECTIONS: {
  x: number;
  y: number;
  type: DetectionType;
  label: string;
  detail: string;
}[] = [
  { x: 560, y: 332, type: 'alert', label: 'Polk County', detail: 'HLB signature - 94% confidence' },
  { x: 578, y: 356, type: 'alert', label: 'Hillsborough', detail: 'Stage 2 infection - act now' },
  { x: 542, y: 372, type: 'alert', label: 'Manatee', detail: 'Rapid spread detected' },
  { x: 598, y: 312, type: 'early', label: 'Orange County', detail: 'Early psyllid sign - monitor' },
  { x: 568, y: 392, type: 'early', label: 'Charlotte', detail: 'Psyllid detected - stage 1' },
  { x: 620, y: 348, type: 'early', label: 'Brevard', detail: 'New grove flagged' },
  { x: 472, y: 308, type: 'clear', label: 'Pinellas', detail: 'Scan clear - no threats' },
  { x: 608, y: 272, type: 'clear', label: 'Volusia', detail: 'No detection - all clear' },
];

const DOT_COLOR: Record<DetectionType, string> = {
  alert: '#FF3DA8',
  early: '#F5A316',
  clear: '#33D17A',
};

function severityToColor(load: number) {
  if (load >= 80) return '#7A1B1D';
  if (load >= 60) return '#B93628';
  if (load >= 40) return '#EE8520';
  if (load >= 20) return '#F5A316';
  if (load >= 5) return '#2C4070';
  return '#18213D';
}

function severityLabel(load: number) {
  if (load >= 80) return 'Critical';
  if (load >= 60) return 'Severe';
  if (load >= 40) return 'Moderate';
  if (load >= 20) return 'Low';
  if (load >= 5) return 'Monitored';
  return 'Not affected';
}

function stateId(id: string | number) {
  return String(id).padStart(2, '0');
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (src.includes('d3') && window.d3) {
      resolve();
      return;
    }
    if (src.includes('topojson') && window.topojson) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.head.appendChild(script);
  });
}

export default function CitrusMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const topoRef = useRef<any>(null);
  const [year, setYear] = useState(2026);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState<SelectedState | null>(null);
  const [selected, setSelected] = useState<SelectedState>({
    id: '12',
    name: 'Florida',
    load: SEVERITY_BY_YEAR[2026]['12'],
  });
  const [detectionTip, setDetectionTip] = useState<{ label: string; detail: string; type: DetectionType } | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializeMap() {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js');
        const us = await window.d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');

        if (!cancelled) {
          topoRef.current = us;
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setError('Map data unavailable');
        }
      }
    }

    initializeMap();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !topoRef.current || !window.d3 || !window.topojson) return;

    const d3 = window.d3;
    const topojson = window.topojson;
    const svg = d3.select(svgRef.current).select('g.citrus-map__states');
    const severityData = SEVERITY_BY_YEAR[year];
    const projection = d3.geoAlbersUsa().scale(840).translate([310, 178]);
    const path = d3.geoPath(projection);
    const features = topojson.feature(topoRef.current, topoRef.current.objects.states).features;

    svg
      .selectAll('path.state')
      .data(features)
      .join(
        (enter: any) => enter.append('path').attr('class', 'state'),
        (update: any) => update,
        (exit: any) => exit.remove(),
      )
      .attr('d', path)
      .attr('stroke', (d: any) => (selected?.id === stateId(d.id) ? '#F3F4FB' : 'rgba(123,92,255,0.35)'))
      .attr('stroke-width', (d: any) => (selected?.id === stateId(d.id) ? 1.35 : 0.65))
      .attr('cursor', (d: any) => (STATE_NAMES[stateId(d.id)] ? 'pointer' : 'default'))
      .attr('tabindex', (d: any) => (STATE_NAMES[stateId(d.id)] ? 0 : -1))
      .attr('role', (d: any) => (STATE_NAMES[stateId(d.id)] ? 'button' : 'img'))
      .attr('aria-label', (d: any) => {
        const id = stateId(d.id);
        const name = STATE_NAMES[id];
        const load = severityData[id] ?? 0;
        return name ? `${name}: ${load}% disease load, ${severityLabel(load)}` : 'State not monitored';
      })
      .on('mouseover', (_event: any, d: any) => {
        const id = stateId(d.id);
        const name = STATE_NAMES[id];
        if (name) setHovered({ id, name, load: severityData[id] ?? 0 });
      })
      .on('mouseout', () => setHovered(null))
      .on('click', (_event: any, d: any) => {
        const id = stateId(d.id);
        const name = STATE_NAMES[id];
        if (name) setSelected({ id, name, load: severityData[id] ?? 0 });
      })
      .on('keydown', (event: KeyboardEvent, d: any) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const id = stateId(d.id);
        const name = STATE_NAMES[id];
        if (!name) return;
        event.preventDefault();
        setSelected({ id, name, load: severityData[id] ?? 0 });
      })
      .transition()
      .duration(420)
      .attr('fill', (d: any) => severityToColor(severityData[stateId(d.id)] ?? 0));
  }, [loading, selected?.id, year]);

  useEffect(() => {
    setSelected((current) => ({
      ...current,
      load: SEVERITY_BY_YEAR[year][current.id] ?? 0,
    }));
  }, [year]);

  const inspected = hovered ?? selected;
  const floridaLoad = SEVERITY_BY_YEAR[year]['12'];

  return (
    <div className="citrus-map">
      <div className="citrus-map__topbar">
        <div className="citrus-map__title">
          <span className="citrus-map__status" />
          <span>Pelturi - Citrus disease surveillance</span>
          <span className="citrus-map__chip">HLB - citrus greening</span>
        </div>
        <span className="citrus-map__date">May 2026 - season active</span>
      </div>

      <div className="citrus-map__body">
        <div className="citrus-map__stage">
          {(loading || error) && (
            <div className="citrus-map__loading">
              {error || 'Loading disease map...'}
            </div>
          )}

          <svg ref={svgRef} viewBox="0 0 640 420" className="citrus-map__svg">
            <g className="citrus-map__states" />
            {!loading && !error && DETECTIONS.map((detection) => (
              <g
                key={`${detection.label}-${detection.type}`}
                transform={`translate(${detection.x - 30},${detection.y - 10})`}
                className="citrus-map__detection"
                onMouseEnter={() => setDetectionTip(detection)}
                onMouseLeave={() => setDetectionTip(null)}
              >
                {detection.type === 'alert' && <circle r="7" fill="none" stroke={DOT_COLOR.alert} strokeWidth="1.2" className="citrus-map__pulse" />}
                <circle r={detection.type === 'alert' ? 4.5 : 3.5} fill={DOT_COLOR[detection.type]} stroke="#08091A" strokeWidth="1.2" />
              </g>
            ))}
          </svg>

          {!loading && !error && (
            <>
              <div className="citrus-map__tooltip citrus-map__tooltip--state">
                <span>{inspected.name}</span>
                <strong>{inspected.load}% disease load</strong>
                <small>{severityLabel(inspected.load)} - click any state for details</small>
              </div>

              {detectionTip && (
                <div className="citrus-map__tooltip citrus-map__tooltip--detection" style={{ borderColor: `${DOT_COLOR[detectionTip.type]}80` }}>
                  <span style={{ color: DOT_COLOR[detectionTip.type] }}>{detectionTip.type} - {detectionTip.label}</span>
                  <small>{detectionTip.detail}</small>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="citrus-map__panel">
          <div className="citrus-map__panel-block">
            <h3>Selected state</h3>
            <strong className="citrus-map__load">{selected.load}%</strong>
            <span>{selected.name} disease load</span>
            <small>{severityLabel(selected.load)} pressure across monitored citrus areas.</small>
          </div>

          <div className="citrus-map__panel-block">
            <h3>Infection severity</h3>
            {[
              { c: '#7A1B1D', l: 'Critical >=80%' },
              { c: '#B93628', l: 'Severe 60-80%' },
              { c: '#EE8520', l: 'Moderate 40-60%' },
              { c: '#F5A316', l: 'Low 20-40%' },
              { c: '#2C4070', l: 'Monitored <20%' },
              { c: '#18213D', l: 'Not affected' },
            ].map((row) => (
              <div className="citrus-map__legend-row" key={row.l}>
                <span style={{ background: row.c }} />
                {row.l}
              </div>
            ))}
          </div>

          <div className="citrus-map__panel-block">
            <h3>Pelturi detections</h3>
            {[
              { c: DOT_COLOR.alert, l: 'Alert - act now' },
              { c: DOT_COLOR.early, l: 'Early detection' },
              { c: DOT_COLOR.clear, l: 'Scan clear' },
            ].map((row) => (
              <div className="citrus-map__legend-row" key={row.l}>
                <span className="citrus-map__dot" style={{ background: row.c }} />
                {row.l}
              </div>
            ))}
          </div>

          <div className="citrus-map__panel-block citrus-map__stats">
            <strong>{floridaLoad}%</strong>
            <span>FL trees infected</span>
            <strong>1,247</strong>
            <span>Active alerts</span>
            <strong>3.2 days</strong>
            <span>Avg early-detection lead</span>
          </div>
        </aside>
      </div>

      <div className="citrus-map__timeline">
        <div>
          <span>Spread timeline - drag to explore</span>
          <strong>{year}</strong>
        </div>
        <input
          aria-label="Disease spread year"
          type="range"
          min={2022}
          max={2026}
          step={1}
          value={year}
          onChange={(event) => setYear(Number(event.target.value))}
        />
        <div className="citrus-map__years">
          {[2022, 2023, 2024, 2025, 2026].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setYear(item)}
              className={item === year ? 'is-active' : ''}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="citrus-map__footer">
        <span>Demo disease-load model - Pelturi AI scan overlay - click states and dots for detail</span>
        <span>Advisory only - grower confirms all responses</span>
      </div>
    </div>
  );
}
