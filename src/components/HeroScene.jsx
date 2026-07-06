import './HeroScene.css'

/**
 * Premium hero illustration: a high-fidelity 3D render layered with
 * dynamic SVG particle and energy streak effects to integrate it seamlessly.
 */
export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      {/* Background ambient glow */}
      <svg className="hero-scene__fx hero-scene__fx--bg" viewBox="0 0 620 520">
        <defs>
          <radialGradient id="hsGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stop-color="#3BE07A" stop-opacity="0.35" />
            <stop offset="45%" stop-color="#1E8A48" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#1E8A48" stop-opacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="310" cy="260" rx="300" ry="250" fill="url(#hsGlow)" />
        
        {/* Subtle background tech lines */}
        <g stroke="#3BE07A" strokeOpacity="0.15" strokeWidth="1.5" className="hero-scene__rays">
          <path d="M40 80 L360 250" />
          <path d="M580 70 L330 260" />
          <path d="M80 470 L340 280" />
          <path d="M560 460 L350 285" />
        </g>
      </svg>

      {/* Deep-masked main image to remove square edges */}
      <div className="hero-scene__image-wrapper">
        <img 
          src="/hero-container.png" 
          alt="Korrente Energy Storage Container" 
          className="hero-scene__image" 
        />
      </div>

      {/* Foreground dynamic energy elements */}
      <svg className="hero-scene__fx hero-scene__fx--fg" viewBox="0 0 620 520" pointerEvents="none">
        <defs>
          <linearGradient id="hsStreak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#3BE07A" stop-opacity="0" />
            <stop offset="0.5" stop-color="#7CFFB0" />
            <stop offset="1" stop-color="#3BE07A" stop-opacity="0" />
          </linearGradient>
        </defs>

        <path
          className="hero-scene__streak"
          d="M20 350 C 150 380, 200 340, 310 360 S 500 380, 600 340"
          fill="none"
          stroke="url(#hsStreak)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle className="hero-scene__spark" r="4.5" fill="#9BFFC4">
          <animateMotion dur="5s" repeatCount="indefinite"
            path="M20 350 C 150 380, 200 340, 310 360 S 500 380, 600 340" />
        </circle>

        {/* Ambient floating dust */}
        <g fill="#5CF29A" className="hero-scene__dust">
          <circle cx="120" cy="150" r="2.4" />
          <circle cx="560" cy="220" r="2" />
          <circle cx="470" cy="120" r="1.8" />
          <circle cx="110" cy="330" r="2" />
          <circle cx="520" cy="420" r="1.5" />
          <circle cx="200" cy="80" r="2.5" />
        </g>
      </svg>
    </div>
  )
}
