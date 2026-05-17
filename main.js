import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ==========================================
   1. CORE THREE.JS SETUP
   ========================================== */
const canvas = document.querySelector('#webgl-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

/* ==========================================
   2. INTERACTION GROUPS
   ========================================== */
const mouseGroup = new THREE.Group(); 
scene.add(mouseGroup);

const productAssembly = new THREE.Group(); 
mouseGroup.add(productAssembly);

/* ==========================================
   3. PREMIUM MATERIALS (UPDATED FOR LIGHT MODE)
   ========================================== */
// Sleek, highly reflective dark chrome (looks amazing against white)
const metalMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.9,
    roughness: 0.2,
});

const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95, 
    thickness: 0.5,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
});

// The Glowing Core is now NEON CRIMSON to match your Tailwind accent
const coreMat = new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: 0xff003c, // Pure Crimson
    emissiveIntensity: 3.0,
});

/* ==========================================
   4. CONSTRUCTING THE PRODUCT
   ========================================== */
const topCap = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.2, 64), metalMat);
topCap.position.y = 0.8;
productAssembly.add(topCap);

const upperLens = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.4, 64), glassMat);
upperLens.position.y = 0.5;
productAssembly.add(upperLens);

const engineCore = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 1.6, 32), coreMat);
engineCore.position.y = 0;
productAssembly.add(engineCore);

const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 16, 64), metalMat);
ring1.position.y = 0.2;
ring1.rotation.x = Math.PI / 2;
productAssembly.add(ring1);

const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 16, 64), metalMat);
ring2.position.y = -0.2;
ring2.rotation.x = Math.PI / 2;
productAssembly.add(ring2);

const lowerLens = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.4, 64), glassMat);
lowerLens.position.y = -0.5;
productAssembly.add(lowerLens);

const baseCap = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.2, 64), metalMat);
baseCap.position.y = -0.8;
productAssembly.add(baseCap);

/* ==========================================
   5. STUDIO LIGHTING (UPDATED FOR LIGHT MODE)
   ========================================== */
// Increase ambient light so the metal doesn't look like a black hole on a white background
const ambientLight = new THREE.AmbientLight(0xffffff, 3.0);
scene.add(ambientLight);

const keyLight = new THREE.PointLight(0xffffff, 200, 100);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

// Crimson fill light to reflect off the dark chrome
const fillLight = new THREE.PointLight(0xff003c, 150, 100); 
fillLight.position.set(-5, -5, -5);
scene.add(fillLight);

/* ==========================================
   6. MOUSE TRACKING
   ========================================== */
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    targetX = (event.clientX - windowHalfX) * 0.001;
    targetY = (event.clientY - windowHalfY) * 0.001;
});

/* ==========================================
   7. SCROLL ENGINE (LENIS)
   ========================================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ==========================================
   8. CHOREOGRAPHED POSITIONAL TRACKING (GSAP)
   ========================================== */
productAssembly.position.x = 3.5; 
productAssembly.position.y = -0.5;
productAssembly.rotation.x = 0.2;
productAssembly.rotation.y = -0.5;

gsap.to(productAssembly.position, {
    x: -3.5, 
    y: 0,
    scrollTrigger: {
        trigger: '#manifesto',
        start: 'top bottom', 
        end: 'center center', 
        scrub: 1.5,
    }
});
gsap.to(productAssembly.rotation, {
    y: Math.PI * 0.8, 
    scrollTrigger: {
        trigger: '#manifesto',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
    }
});

const explodeTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#trigger-section',
        start: 'top center', 
        end: 'bottom top',   
        scrub: 1.5,          
    }
});

explodeTl.to(productAssembly.position, { x: 0, y: 0.5 }, 0);
explodeTl.to(productAssembly.rotation, { y: Math.PI * 2.1, x: 0.1 }, 0);

explodeTl.to(topCap.position, { y: 2.8 }, 0);
explodeTl.to(upperLens.position, { y: 1.4 }, 0);
explodeTl.to(ring1.position, { y: 0.6 }, 0);
explodeTl.to(ring2.position, { y: -0.6 }, 0);
explodeTl.to(lowerLens.position, { y: -1.4 }, 0);
explodeTl.to(baseCap.position, { y: -2.8 }, 0);

gsap.to(productAssembly.position, {
    z: -10, 
    y: 3,   
    scrollTrigger: {
        trigger: '#archive',
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
    }
});

/* ==========================================
   9. DOM 3D TILT ENGINE (BENTO CARDS)
   ========================================== */
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8; 
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

/* ==========================================
   10. UNIFIED RENDER LOOP
   ========================================== */
function animate() {
  const time = Date.now() * 0.001;
  productAssembly.position.y += Math.sin(time) * 0.005; // Gentle float

  mouseGroup.rotation.x += 0.05 * (targetY - mouseGroup.rotation.x);
  mouseGroup.rotation.y += 0.05 * (targetX - mouseGroup.rotation.y);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});