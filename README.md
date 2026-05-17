# SAGNIK Sengupta. KINETIC ARCHITECTURE

A high-frequency, low-latency personal portfolio designed for scale. This repository contains a brutalist, editorial-style web experience integrated with a live WebGL 3D environment, hardware-accelerated scroll animations, and momentum-smoothed user interactions.

## ⚡ System Architecture

This project abandons heavy front-end frameworks in favor of an optimized, vanilla JavaScript pipeline driven by an industry-standard modern build tool.

*   **Bundler:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **3D Engine:** [Three.js](https://threejs.org/)
*   **Motion & Timeline:** [GSAP](https://gsap.com/) + ScrollTrigger
*   **Scroll Normalization:** [Lenis](https://lenis.studiofreight.com/)
*   **Iconography:** [Lucide](https://lucide.dev/)

## 🚀 Key Features

*   **Live WebGL Data Core:** A dynamic 3D assembly utilizing `MeshPhysicalMaterial` for real-time glass refraction and metallic lighting, rendering completely independent of DOM bottlenecks.
*   **Scroll-Driven Positional Tracking:** The 3D model is choreographed to deconstruct (explode) and move across the viewport strictly based on the user's scroll depth via GSAP ScrollTrigger.
*   **Momentum Scrolling:** Lenis overrides native OS scroll behaviors to ensure butter-smooth framerates, which is strictly required for tying 3D render updates to scroll coordinates without jitter.
*   **Mathematical Noise Texture:** A CSS-injected `<feTurbulence>` SVG filter generates a monochromatic, high-end paper grain overlay without requiring external image assets.
*   **Hardware-Accelerated Bento Grid:** DOM-based 3D tilt tracking using vanilla mathematics to manipulate CSS `perspective()` and `translateZ()` matrix properties on hover.

## 🛠 Local Deployment Protocol

To run this architecture locally on your machine, ensure you have [Node.js](https://nodejs.org/) installed, then execute the following terminal commands:

# 1. Clone the repository
git clone [https://github.com/sagniksengupta24/sagnik.git](https://github.com/sagniksengupta24/sagnik.git)

# 2. Navigate into the directory
cd your-repo-name

# 3. Install system dependencies (Three, GSAP, Lenis)
npm install

# 4. Initialize the Vite development server
npm run dev
Navigate to http://localhost in your browser to view the live compilation.

📂 File Structure
Plaintext
├── index.html       # The DOM layout, Tailwind classes, and SVG Noise overlay
├── style.css        # Core system resets, Lenis normalization, and 3D Tilt classes
├── main.js          # The master execution script (Three.js pipeline, GSAP, Lenis)
├── package.json     # Dependency registry
└── tailwind.config.js # Contains the custom Neon Crimson (#ff003c) accent color
🎨 Design System Variables
If you need to modify the aesthetic of the application, the core variables are centralized for rapid deployment:

Accent Color: Located in index.html inside the <script> tag configuring Tailwind (accent: '#ff003c').

Background Base: Set to #fcfbf9 (Editorial Off-White).

3D Core Glow: Located in main.js under the coreMat emissive property (0xff003c).

Noise Density: Located in index.html under the .noise-bg CSS class. Adjust opacity (currently 0.05) to increase or decrease the paper grain intensity.

📜 License
Engineered by Sagnik Sengupta.
All rights reserved.
