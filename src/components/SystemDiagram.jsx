import { useEffect, useMemo, useRef, useState } from "react";

/**
 * The backend equivalent of a screenshot.
 *
 * A project declares nodes on a grid — `col` runs left to right, `row` top to
 * bottom — and edges between them by id. Everything else (positions, curves,
 * arrowheads, the vertical centring of short columns) is worked out here, so
 * the data stays a description of the system rather than a drawing of one.
 *
 * The flow animation only runs while the diagram is on screen; the global
 * reduced-motion rule in index.css settles it on the first frame.
 */

// a node carries three lines — what it is, what it runs on, and the one
// technical fact worth putting on the picture — so the box has to be tall
// enough for all three without the type dropping below about 9px
const NODE_W = 174;
const NODE_H = 80;
// the gap has to hold a two-line edge label — topic name over delivery detail —
// without it running under either box it joins
const COL_GAP = 114;
const ROW_GAP = 30;
const PAD = 16;
// extra floor for a backward edge to run along, added only to the diagrams
// that have one
const RETURN_LANE = 46;

// how far a bezier leaves its node before turning — as a fraction of the gap.
// below about 0.4 the curve kinks at the node edge instead of easing out of it
const BEND = 0.5;

export default function SystemDiagram({ diagram, name, uid }) {
  const [live, setLive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => buildLayout(diagram), [diagram]);
  if (!layout) return null;

  const { width, height, placed, paths } = layout;
  const arrow = `arrow-${uid}`;

  return (
    <div className={`sysd${live ? " is-live" : ""}`} ref={ref}>
      <div className="sysd-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={`${name} — service architecture`}
          className="sysd-svg"
        >
          <defs>
            {/* one marker per diagram: two on a page would share an id otherwise */}
            <marker
              id={arrow}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 1.5 9 5 0 8.5 2 5Z" className="sysd-arrow" />
            </marker>
          </defs>

          <g className="sysd-edges">
            {paths.map((p, i) => (
              <g key={p.key}>
                <path
                  d={p.d}
                  className={`sysd-edge${p.dashed ? " is-dashed" : ""}`}
                  markerEnd={`url(#${arrow})`}
                />
                {/* the moving dash is a second copy of the same line, so the
                    static one stays readable when the animation is stopped.
                    Staggered, or every edge in the diagram pulses in lockstep */}
                <path d={p.d} className="sysd-flow" style={{ animationDelay: `${i * 0.22}s` }} />
                {p.label && (
                  <text
                    x={p.lx}
                    y={p.note ? p.ly - 6 : p.ly}
                    className="sysd-edge-label"
                    textAnchor="middle"
                  >
                    {p.label}
                    {p.note && (
                      <tspan x={p.lx} dy="11" className="sysd-edge-note">
                        {p.note}
                      </tspan>
                    )}
                  </text>
                )}
              </g>
            ))}
          </g>

          <g className="sysd-nodes">
            {placed.map((n) => (
              <g key={n.id} className={`sysd-node is-${n.kind}`} transform={`translate(${n.x} ${n.y})`}>
                <rect width={NODE_W} height={NODE_H} rx="14" className="sysd-node-box" />
                <text x={NODE_W / 2} y={LINES[n.lines].label} className="sysd-node-label" textAnchor="middle">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={NODE_W / 2} y={LINES[n.lines].sub} className="sysd-node-sub" textAnchor="middle">
                    {n.sub}
                  </text>
                )}
                {n.meta && (
                  <text x={NODE_W / 2} y={LINES[n.lines].meta} className="sysd-node-meta" textAnchor="middle">
                    {n.meta}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>

      <Legend kinds={layout.kinds} />
    </div>
  );
}

// baselines for one, two and three lines of text — a node with no `meta` sits
// lower in the box rather than leaving a gap under it
const LINES = {
  1: { label: 46 },
  2: { label: 36, sub: 53 },
  3: { label: 29, sub: 46, meta: 62 },
};

const KIND_LABELS = {
  client: "Caller",
  service: "Spring Boot service",
  broker: "Broker / topic",
  store: "Datastore",
  guard: "Security / resilience",
  chain: "Blockchain",
  external: "Third party",
};

function Legend({ kinds }) {
  return (
    <ul className="sysd-legend">
      {kinds.map((k) => (
        <li key={k} className={`is-${k}`}>
          <span aria-hidden="true" />
          {KIND_LABELS[k] || k}
        </li>
      ))}
    </ul>
  );
}

function buildLayout(diagram) {
  if (!diagram?.nodes?.length) return null;
  const { nodes, edges = [] } = diagram;

  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  const byCol = Object.fromEntries(nodes.map((n) => [n.id, n.col]));
  const hasReturn = edges.some((e) => byCol[e.to] < byCol[e.from]);

  const width = PAD * 2 + cols * NODE_W + (cols - 1) * COL_GAP;
  const boxes = PAD * 2 + rows * NODE_H + (rows - 1) * ROW_GAP;
  const height = boxes + (hasReturn ? RETURN_LANE : 0);

  // a column holding two nodes out of three rows is centred against the tallest
  // column rather than pinned to the top, which is what stops the diagram
  // looking like it lost a row somewhere
  const placed = nodes.map((n) => {
    const inCol = nodes.filter((o) => o.col === n.col);
    const minR = Math.min(...inCol.map((o) => o.row));
    const maxR = Math.max(...inCol.map((o) => o.row));
    const blockH = (maxR - minR) * (NODE_H + ROW_GAP) + NODE_H;
    // centred against the boxes, not the return lane — otherwise every node
    // drifts down by half a lane it has nothing to do with
    const top = (boxes - blockH) / 2;
    return {
      ...n,
      lines: 1 + (n.sub ? 1 : 0) + (n.meta ? 1 : 0),
      x: PAD + n.col * (NODE_W + COL_GAP),
      y: top + (n.row - minR) * (NODE_H + ROW_GAP),
    };
  });

  const byId = Object.fromEntries(placed.map((n) => [n.id, n]));

  const paths = edges
    .map((e, i) => {
      const a = byId[e.from];
      const b = byId[e.to];
      if (!a || !b) return null;
      const geom = edgeGeometry(a, b, boxes);
      return { key: `${e.from}-${e.to}-${i}`, dashed: e.dashed, label: e.label, note: e.note, ...geom };
    })
    .filter(Boolean);

  // legend order follows the diagram, not the alphabet
  const kinds = [...new Set(placed.map((n) => n.kind))];

  return { width, height, placed, paths, kinds };
}

function edgeGeometry(a, b, boxes) {
  // same column: a straight drop between the two boxes
  if (a.col === b.col) {
    const x = a.x + NODE_W / 2;
    const [top, bottom] = a.y < b.y ? [a, b] : [b, a];
    const y1 = top.y + NODE_H;
    const y2 = bottom.y;
    const down = a.y < b.y;
    return {
      d: down ? `M${x} ${y1} L${x} ${y2}` : `M${x} ${y2} L${x} ${y1}`,
      lx: x,
      ly: (y1 + y2) / 2 + 3,
    };
  }

  // forward: out of the right edge, into the left edge
  if (b.col > a.col) {
    const x1 = a.x + NODE_W;
    const y1 = a.y + NODE_H / 2;
    const x2 = b.x;
    const y2 = b.y + NODE_H / 2;
    const dx = (x2 - x1) * BEND;
    return {
      d: `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`,
      lx: (x1 + x2) / 2,
      // clears the line itself, and leaves room for the second line below it
      ly: (y1 + y2) / 2 - 13,
    };
  }

  // backward (a confirmation coming home): routed under the whole diagram so it
  // never runs back through the nodes it just came from
  const x1 = a.x + NODE_W / 2;
  const y1 = a.y + NODE_H;
  const x2 = b.x + NODE_W / 2;
  const y2 = b.y + NODE_H;
  const floor = boxes + RETURN_LANE * 0.55;
  return {
    d: `M${x1} ${y1} C${x1} ${floor} ${x2} ${floor} ${x2} ${y2}`,
    lx: (x1 + x2) / 2,
    // under the curve rather than on it — the lane exists to keep this clear
    ly: boxes + RETURN_LANE - 6,
  };
}
