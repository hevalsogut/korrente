import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n/index.jsx'
import './HeroScene.css'

/**
 * Hero visual: a fully coded, interactive energy-system diorama.
 * Wind turbines and a solar array feed animated energy flows into an
 * isometric Korrente BESS container — the hub of the system — whose
 * charge indicator visibly fills as power arrives. Hovering a source
 * (or the battery) names it with a small label chip; the whole scene
 * shifts subtly with the pointer for depth.
 *
 * No image assets. All motion is transform / opacity / dash-offset and
 * is fully disabled under prefers-reduced-motion; parallax also skips
 * touch devices. Decorative: aria-hidden.
 */

/* ---- container geometry (all faces share these corners) ----
   Doors (end) face:  FTL(420,280) FTR(510,300) FBR(510,455) FBL(420,430)
   Long side face:    FTR(510,300) BTR(752,242) BBR(752,395) FBR(510,455)
   Roof:              FTL FTR BTR BTL(662,222)
   The side face's top edge slope gives the skew used to keep details
   (logo, screen) in the face's plane: atan(58/242) ≈ 13.5°.           */
const SIDE_SKEW = -13.5

/* One tapered turbine blade pointing up from the hub origin. */
function Blade({ r }) {
  return (
    <path
      d={`M0 0 C 2.8 ${-r * 0.25}, 3.2 ${-r * 0.62}, 1.2 ${-r} L -1.2 ${-r} C -3.2 ${-r * 0.62}, -2.8 ${-r * 0.25}, 0 0 Z`}
      fill="url(#hsBlade)"
      stroke="rgba(155,255,196,0.45)"
      strokeWidth="0.7"
    />
  )
}

function Turbine({ hub, base, r, rotorClass, dim = 1 }) {
  const [hx, hy] = hub
  return (
    <g opacity={dim}>
      <ellipse cx={hx} cy={base + 3} rx={r * 0.45} ry={4} fill="#000" opacity="0.45" />
      <path
        d={`M ${hx - 4} ${base} L ${hx + 4} ${base} L ${hx + 1.4} ${hy + 5} L ${hx - 1.4} ${hy + 5} Z`}
        fill="url(#hsTower)"
        stroke="rgba(155,255,196,0.3)"
        strokeWidth="0.5"
      />
      <rect x={hx - 5.5} y={hy - 3.6} width="11" height="7.2" rx="2.6" fill="#22362A" stroke="rgba(107,194,111,0.45)" strokeWidth="0.6" />
      <g className={rotorClass} transform-origin={`${hx} ${hy}`}>
        <g transform={`translate(${hx} ${hy})`}>
          <Blade r={r} />
          <g transform="rotate(120)"><Blade r={r} /></g>
          <g transform="rotate(240)"><Blade r={r} /></g>
        </g>
      </g>
      <circle cx={hx} cy={hy} r="3" fill="#1E3325" stroke="rgba(155,255,196,0.7)" strokeWidth="0.8" />
      <circle cx={hx} cy={hy} r="1" fill="#9BFFC4" />
    </g>
  )
}

/* One PV panel: dark glass, frame, cell dividers, corner sheen. */
function Panel({ w = 62, h = 38 }) {
  return (
    <g>
      <rect x="0" y="0" width={w} height={h} rx="1.6" fill="url(#hsGlass)" stroke="rgba(155,255,196,0.55)" strokeWidth="1" />
      <path
        d={`M${w / 3} 1 V${h - 1} M${(2 * w) / 3} 1 V${h - 1} M1 ${h / 2} H${w - 1}`}
        stroke="rgba(155,255,196,0.22)"
        strokeWidth="0.7"
      />
      <path d={`M3 ${h - 2} L${w * 0.38} 2 L${w * 0.5} 2 L${w * 0.15} ${h - 2} Z`} fill="url(#hsSheen)" opacity="0.55" />
    </g>
  )
}

/* Energy-flow cable from a source into a battery intake port. The
   gradient runs source→port (dim tail, bright head); the dash motion
   and both travelling pulses move toward the battery. */
function Flow({ id, d, from, to, dur }) {
  return (
    <g className={`hs-flow hs-flow--${id}`}>
      <defs>
        <linearGradient id={`hsF-${id}`} gradientUnits="userSpaceOnUse" x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}>
          <stop offset="0" stopColor="#3BE07A" stopOpacity="0" />
          <stop offset="0.3" stopColor="#3BE07A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#9BFFC4" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path className="hs-flow__base" d={d} pathLength="1" fill="none" stroke={`url(#hsF-${id})`} strokeWidth="6" strokeLinecap="round" />
      {/* leader — draws the route in during the load sequence, then dims */}
      <path className="hs-flow__lead" d={d} pathLength="1" fill="none" stroke="#7CFFB0" strokeWidth="2" strokeLinecap="round" />
      <path className="hs-flow__dash" d={d} fill="none" stroke={`url(#hsF-${id})`} strokeWidth="2.6" strokeLinecap="round" />
      <circle className="hs-flow__pulse" r="3.6" fill="#9BFFC4">
        <animateMotion dur={dur} repeatCount="indefinite" path={d} />
      </circle>
      <circle className="hs-flow__pulse" r="2.4" fill="#7CFFB0">
        <animateMotion dur={dur} begin={`-${parseFloat(dur) / 2}s`} repeatCount="indefinite" path={d} />
      </circle>
      <circle className="hs-flow__src" cx={from[0]} cy={from[1]} r="2.6" fill="#3BE07A" />
    </g>
  )
}

/* Lattice transmission tower, authored around base centre (733,452),
   top at y≈196. Instances place it with translate+scale — smaller and
   dimmer with distance. */
function PylonShape() {
  return (
    <g>
      <g stroke="rgba(155,255,196,0.45)" strokeWidth="1.3" fill="none">
        {/* legs + mast */}
        <path d="M716 452 L728 210 M750 452 L738 210 M728 210 L733 196 L738 210" />
        {/* horizontal braces */}
        <path d="M718.4 400 H747.6 M720.4 360 H745.6 M722.4 320 H743.6 M724.4 280 H741.6 M726.4 244 H739.6" opacity="0.8" />
      </g>
      {/* lattice zigzag */}
      <g stroke="rgba(155,255,196,0.25)" strokeWidth="1" fill="none">
        <path d="M718.4 400 L745.6 360 L720.4 360 L743.6 320 L722.4 320 L741.6 280 L724.4 280 L739.6 244" />
      </g>
      {/* crossarms + insulators */}
      <g stroke="rgba(155,255,196,0.5)" strokeWidth="1.6" fill="none">
        <path d="M708 240 H758 M714 274 H752" />
      </g>
      <g stroke="rgba(155,255,196,0.4)" strokeWidth="1.2">
        <path d="M712 240 V252 M754 240 V252 M718 274 V286 M748 274 V286" />
      </g>
      <g fill="#7CFFB0" opacity="0.8">
        <circle cx="712" cy="253" r="1.6" />
        <circle cx="754" cy="253" r="1.6" />
        <circle cx="718" cy="287" r="1.6" />
        <circle cx="748" cy="287" r="1.6" />
      </g>
    </g>
  )
}

/* Intake port on the doors face: ring + core + arrival pulse. */
function Port({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" fill="#101B14" stroke="rgba(107,194,111,0.6)" strokeWidth="1.2" />
      <circle cx={x} cy={y} r="3.2" fill="#9BFFC4" />
      <circle className="hs-port-ping" cx={x} cy={y} r="8" fill="none" stroke="#7CFFB0" strokeWidth="1.4" transform-origin={`${x} ${y}`} />
    </g>
  )
}

/* Hover label chip, centred on x. */
function Chip({ x, y, w, label }) {
  /* Position lives on the outer group's SVG transform; the reveal
     animation (CSS transform) runs on the inner group so the two
     never fight over the same property. */
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="hs-chip">
        <rect x={-w / 2} y="-14" width={w} height="28" rx="14" fill="rgba(8,17,11,0.92)" stroke="rgba(107,194,111,0.45)" strokeWidth="1" />
        <circle cx={-w / 2 + 15} cy="0" r="3.5" fill="#47A257" />
        <text x="6" y="0" textAnchor="middle" dominantBaseline="central" className="hs-chip__text">
          {label}
        </text>
      </g>
    </g>
  )
}

export default function HeroScene() {
  const { t } = useI18n()
  const ref = useRef(null)

  /* Pointer parallax: writes -1..1 into CSS vars, consumed by the
     .hs-layer transforms. Skipped for reduced-motion and touch. */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const r = el.getBoundingClientRect()
        const mx = ((e.clientX - r.left) / r.width) * 2 - 1
        const my = ((e.clientY - r.top) / r.height) * 2 - 1
        el.style.setProperty('--hs-mx', mx.toFixed(3))
        el.style.setProperty('--hs-my', my.toFixed(3))
      })
    }
    const onLeave = () => {
      el.style.setProperty('--hs-mx', '0')
      el.style.setProperty('--hs-my', '0')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  /* Corrugation ribs across the long side face (vertical, since the
     container's vertical edges are screen-vertical). */
  const ribs = Array.from({ length: 13 }, (_, i) => {
    const t_ = (i + 1) / 14
    const x = 510 + 242 * t_
    return { x, yb: 455 - 60 * t_, yt: 300 - 58 * t_ }
  })

  return (
    <div className="hero-scene" ref={ref} aria-hidden="true">
      <svg viewBox="0 30 760 530" className="hero-scene__svg">
        <defs>
          <radialGradient id="hsGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#3BE07A" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#1E8A48" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#1E8A48" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hsPool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3BE07A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3BE07A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hsFog" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#17301F" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#17301F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hsTower" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#15251A" />
            <stop offset="1" stopColor="#41684E" />
          </linearGradient>
          <linearGradient id="hsBlade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#2C4A36" />
            <stop offset="1" stopColor="#7FC492" />
          </linearGradient>
          <linearGradient id="hsGlass" x1="0" y1="0" x2="0.55" y2="1">
            <stop offset="0" stopColor="#2F553B" />
            <stop offset="1" stopColor="#0F1D15" />
          </linearGradient>
          <linearGradient id="hsSheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7CFFB0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#7CFFB0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hsSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#28352C" />
            <stop offset="1" stopColor="#182119" />
          </linearGradient>
          <linearGradient id="hsDoors" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#314036" />
            <stop offset="1" stopColor="#1E2921" />
          </linearGradient>
          <linearGradient id="hsRoof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#141C16" />
            <stop offset="1" stopColor="#20291F" />
          </linearGradient>
          <linearGradient id="hsHorizon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#47A257" stopOpacity="0" />
            <stop offset="0.5" stopColor="#47A257" stopOpacity="0.35" />
            <stop offset="1" stopColor="#47A257" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hsWire" gradientUnits="userSpaceOnUse" x1="730" y1="0" x2="766" y2="0">
            <stop offset="0" stopColor="#9BFFC4" stopOpacity="0.55" />
            <stop offset="1" stopColor="#9BFFC4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hsReflFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="hsReflMask">
            <rect x="380" y="455" width="400" height="130" fill="url(#hsReflFade)" />
          </mask>
        </defs>

        {/* ================= BACK LAYER: sky + wind ================= */}
        <g className="hs-layer hs-layer--back">
          <ellipse className="hs-enter-fade" cx="470" cy="290" rx="330" ry="260" fill="url(#hsGlow)" />

          {/* stars / dust */}
          <g className="hs-enter-fade" fill="#5CF29A">
            <circle className="hs-star" cx="180" cy="70" r="1.6" opacity="0.5" />
            <circle cx="340" cy="45" r="1.2" opacity="0.3" />
            <circle className="hs-star hs-star--slow" cx="600" cy="60" r="1.8" opacity="0.5" />
            <circle cx="700" cy="130" r="1.2" opacity="0.3" />
            <circle cx="90" cy="140" r="1.3" opacity="0.35" />
          </g>

          {/* wind farm on the back-left rise */}
          <g className="hs-sys hs-sys--wind hs-enter hs-enter--wind">
            <Turbine hub={[95, 200]} base={415} r={66} rotorClass="hs-rotor--a" />
            <Turbine hub={[205, 240]} base={402} r={48} rotorClass="hs-rotor--b" dim={0.72} />
            <Turbine hub={[283, 268]} base={392} r={35} rotorClass="hs-rotor--c" dim={0.5} />
            <Chip x={120} y={120} w={96} label={t('home.scene.wind')} />
          </g>

          {/* wind gusts drifting through the rotors — the input */}
          <g className="hs-enter-fade hs-enter--wind" fill="none" stroke="rgba(124,255,176,0.35)" strokeWidth="1.4" strokeLinecap="round">
            <path className="hs-gust hs-gust--a" d="M 20 208 C 90 198, 150 214, 235 204" />
            <path className="hs-gust hs-gust--b" d="M 34 262 C 110 252, 180 268, 262 256" />
          </g>

          {/* ---- the grid: a transmission line receding across the
                 background sky on a distant ridge — the last step of the
                 flow, wallpapered behind the battery. Back layer, so the
                 parallax pushes it deeper than everything else. ---- */}
          <g className="hs-sys hs-sys--grid hs-enter hs-enter--grid">
            {/* distant ridge the towers stand on — right background only */}
            <path
              d="M 460 431 C 500 408, 520 380, 545 350 C 560 330, 575 315, 590 312 C 620 308, 640 316, 660 321 C 688 328, 700 333, 716 338 C 735 343, 748 346, 760 345 L 760 431 Z"
              fill="#0C1710"
              opacity="0.9"
            />
            <path
              d="M 460 431 C 500 408, 520 380, 545 350 C 560 330, 575 315, 590 312 C 620 308, 640 316, 660 321 C 688 328, 700 333, 716 338 C 735 343, 748 346, 760 345"
              fill="none"
              stroke="rgba(107,194,111,0.18)"
              strokeWidth="1"
            />

            {/* three pylons, nearest → farthest */}
            <g transform="translate(312.85 89.4) scale(0.55)" opacity="0.85"><PylonShape /></g>
            <g transform="translate(273.5 94) scale(0.5)" opacity="0.6"><PylonShape /></g>
            <g transform="translate(296.8 131.2) scale(0.4)" opacity="0.45"><PylonShape /></g>
            <circle className="hs-blink" cx="716" cy="193" r="1.7" fill="#9BFFC4" />

            {/* catenaries linking the towers, then leaving the frame */}
            <g fill="none" stroke="rgba(155,255,196,0.28)" strokeWidth="1.1">
              <path d="M 600 227.2 C 610 230, 620 220, 627.5 214" />
              <path d="M 652.5 214 C 668 222, 686 224, 702.3 221.4" />
              <path d="M 580 227.2 C 570 231, 560 233, 550 234" opacity="0.5" />
            </g>
            <path d="M 729.8 221.4 C 742 227, 754 230, 768 231" fill="none" stroke="url(#hsWire)" strokeWidth="1.1" />

            <Chip x={700} y={172} w={76} label={t('home.scene.grid')} />
          </g>
        </g>

        {/* ================= MID LAYER: ground + container + flows ================= */}
        <g className="hs-layer hs-layer--mid">
          {/* horizon + receding ground lines */}
          <g className="hs-enter-fade">
            <rect x="30" y="431" width="700" height="1.5" fill="url(#hsHorizon)" />
            <g stroke="#47A257" strokeWidth="1">
              <path d="M60 460 H710" opacity="0.07" />
              <path d="M30 495 H730" opacity="0.055" />
              <path d="M55 535 H705" opacity="0.04" />
            </g>
          </g>

          {/* Container complex, shifted left to make room for the grid
              pylon on the right. Ports keep their local door coords. */}
          <g transform="translate(-58 4)">
          <g className="hs-enter hs-enter--bess">
          {/* glow pool + reflection under the container */}
          <ellipse cx="586" cy="458" rx="200" ry="28" fill="url(#hsPool)" />
          <g mask="url(#hsReflMask)" opacity="0.35">
            <g transform="translate(0 908) scale(1 -1)">
              <use href="#hsBody" />
            </g>
          </g>

          {/* ---- the Korrente BESS container (the hub) ---- */}
          <g className="hs-sys hs-sys--bess">
            <g id="hsBody">
              {/* roof */}
              <path d="M420 280 L510 300 L752 242 L662 222 Z" fill="url(#hsRoof)" />
              {/* long side */}
              <path d="M510 300 L752 242 L752 395 L510 455 Z" fill="url(#hsSide)" />
              {/* corrugation ribs */}
              <g stroke="#0E1611" strokeWidth="3.2" opacity="0.5">
                {ribs.map((rb) => (
                  <path key={rb.x} d={`M${rb.x} ${rb.yb} L${rb.x} ${rb.yt}`} />
                ))}
              </g>
              {/* doors end face */}
              <path d="M420 280 L510 300 L510 455 L420 430 Z" fill="url(#hsDoors)" />
              {/* door seam + lock rods */}
              <g stroke="rgba(10,18,12,0.75)" strokeWidth="2">
                <path d="M465 291 L465 442" />
              </g>
              <g stroke="rgba(155,255,196,0.28)" strokeWidth="1.4">
                <path d="M440 287 L440 435" />
                <path d="M452 289.5 L452 439" />
                <path d="M479 294 L479 445.5" />
                <path d="M491 296.5 L491 449" />
              </g>

              {/* glowing bolt logo on the long side (focal point) */}
              <g transform={`translate(560 318) skewY(${SIDE_SKEW})`}>
                <rect x="-6" y="-8" width="64" height="76" rx="6" fill="none" stroke="#7CFFB0" strokeWidth="5" opacity="0.12" />
                <rect x="-6" y="-8" width="64" height="76" rx="6" fill="rgba(59,224,122,0.07)" stroke="#7CFFB0" strokeWidth="1.6" opacity="0.9" />
                <g transform="scale(1.32)">
                  <path
                    d="M10.59 38.34 35.33 24.89 34.96 23.37 29.08 19.4 28.05 17.5 36.23 4.13 36.52 1.73 34.27 2.24 10.84 15.11 11.26 16.69 17.34 20.82 18.2 22.5 9.81 36.34 9.45 37.94Z"
                    fill="#9BFFC4"
                    stroke="#7CFFB0"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path
                    d="M10.59 38.34 35.33 24.89 34.96 23.37 29.08 19.4 28.05 17.5 36.23 4.13 36.52 1.73 34.27 2.24 10.84 15.11 11.26 16.69 17.34 20.82 18.2 22.5 9.81 36.34 9.45 37.94Z"
                    fill="#DFFFE9"
                    className="hs-bolt"
                  />
                </g>
              </g>

              {/* status screen + SoC segments on the side face */}
              <g transform={`translate(648 330) skewY(${SIDE_SKEW})`}>
                <rect x="0" y="0" width="62" height="34" rx="3" fill="#0A130D" stroke="rgba(107,194,111,0.5)" strokeWidth="0.9" />
                <path d="M6 10 H34 M6 16 H26" stroke="#5CF29A" strokeWidth="1.6" opacity="0.5" />
                <path d="M6 26 L14 22 L20 25 L28 18 L36 21 L44 15 L54 17" fill="none" stroke="#5CF29A" strokeWidth="1.3" opacity="0.85" />
                <circle className="hs-blink" cx="55" cy="8" r="1.8" fill="#9BFFC4" />
                {/* SoC — fills as energy arrives */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} className={`hs-soc hs-soc--${i}`} x={i * 12.4} y="40" width="9.5" height="5" rx="1" fill="#5CF29A" />
                ))}
              </g>

              {/* rim lights + underglow */}
              <path d="M420 280 L510 300 L752 242" fill="none" stroke="#6BC26F" strokeWidth="1.1" opacity="0.45" />
              <path d="M420 430 L510 455 L752 395" fill="none" stroke="#3BE07A" strokeWidth="4" opacity="0.12" />
              <path d="M420 430 L510 455 L752 395" fill="none" stroke="#3BE07A" strokeWidth="1.3" opacity="0.55" />
            </g>

            <Chip x={586} y={190} w={150} label={t('home.scene.bess')} />
          </g>

          <Port x={437} y={379} />
          <Port x={442} y={413} />
          </g>
          </g>

          {/* energy flows into the door ports (post-shift coords) */}
          <Flow id="wind" d="M 128 428 C 240 474, 340 452, 379 383" from={[128, 428]} to={[379, 383]} dur="4.4s" />
          <Flow id="solar" d="M 336 505 C 368 512, 388 468, 384 417" from={[336, 505]} to={[384, 417]} dur="3.6s" />

          {/* outgoing flow — climbs from the container to the nearest tower */}
          <Flow id="grid" d="M 694 396 C 706 388, 712 366, 716 341" from={[694, 396]} to={[716, 341]} dur="3.9s" />
        </g>

        {/* ================= FRONT LAYER: solar array + fog ================= */}
        <g className="hs-layer hs-layer--front">
          <g className="hs-sys hs-sys--solar hs-enter hs-enter--solar">
            <ellipse cx="190" cy="543" rx="150" ry="9" fill="#000" opacity="0.4" />
            {/* back row, dimmer */}
            <g transform="translate(96 452) skewX(-16) scale(0.9)" opacity="0.62">
              <g><Panel /></g>
              <g transform="translate(70 0)"><Panel /></g>
              <g transform="translate(140 0)"><Panel /></g>
            </g>
            {/* front row */}
            <g transform="translate(72 494) skewX(-16)">
              <g><Panel /></g>
              <g transform="translate(70 0)"><Panel /></g>
              <g transform="translate(140 0)"><Panel /></g>
            </g>
            {/* mounting legs */}
            <g stroke="rgba(107,194,111,0.5)" strokeWidth="1.6">
              <path d="M78 532 V545 M132 532 V545 M200 532 V545 M268 532 V545" />
            </g>
            <Chip x={200} y={424} w={100} label={t('home.scene.solar')} />
          </g>

          {/* sunlight motes landing on the glass — the input */}
          <g className="hs-enter-fade hs-enter--solar" stroke="#7CFFB0" strokeWidth="1.6" strokeLinecap="round">
            <g transform="translate(122 500)"><g className="hs-photon"><line x1="-8" y1="-15" x2="0" y2="0" /></g></g>
            <g transform="translate(175 522)"><g className="hs-photon hs-photon--2"><line x1="-8" y1="-15" x2="0" y2="0" /></g></g>
            <g transform="translate(226 505)"><g className="hs-photon hs-photon--3"><line x1="-8" y1="-15" x2="0" y2="0" /></g></g>
            <g transform="translate(258 528)"><g className="hs-photon hs-photon--4"><line x1="-8" y1="-15" x2="0" y2="0" /></g></g>
          </g>

          <g className="hs-enter-fade">
            <ellipse className="hs-fog hs-fog--a" cx="210" cy="472" rx="230" ry="36" fill="url(#hsFog)" />
            <ellipse className="hs-fog hs-fog--b" cx="620" cy="486" rx="240" ry="40" fill="url(#hsFog)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
