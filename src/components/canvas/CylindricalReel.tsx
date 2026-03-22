"use client";

import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const crew = [
  { role: "Lead Actor", name: "React / Next.js", type: "Framework", stat: "99+ projects", codeSnippet: "const [scene, setScene] = useState('FADE IN');", accent: "#c9a84c" },
  { role: "Dir. of Photography", name: "TypeScript", type: "Language", stat: "Strict mode", codeSnippet: "type Scene = { shot: string; take: number; };", accent: "#c9a84c" },
  { role: "Sound Designer", name: "Node.js", type: "Runtime", stat: "Event-driven", codeSnippet: "server.listen(3000, () => console.log('ACTION'));", accent: "#c9a84c" },
  { role: "Production Designer", name: "Tailwind CSS", type: "Styling", stat: "Utility-first", codeSnippet: "<div className=\"cinematic-frame blur-sm\">", accent: "#c9a84c" },
  { role: "Editor", name: "Git & GitHub", type: "Tooling", stat: "3000+ commits", codeSnippet: "git commit -m \"feat: final cut approved\"", accent: "#c9a84c" },
  { role: "Visual Effects", name: "GSAP / Framer", type: "Animation", stat: "60fps always", codeSnippet: "gsap.from('.hero', { opacity:0, y:100 });", accent: "#c9a84c" },
  { role: "Score Composer", name: "PostgreSQL", type: "Database", stat: "ACID compliant", codeSnippet: "SELECT * FROM shots WHERE approved = true;", accent: "#c9a84c" },
  { role: "Casting Director", name: "REST / GraphQL", type: "API", stat: "Type-safe", codeSnippet: "query { production { cast { name } } }", accent: "#c9a84c" },
];

const vertexShader = `
  uniform float uCurvature;
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Bend z backwards at the top and bottom to create a cylinder shape
    // Assuming pos.y is roughly -3.0 to 3.0
    float yNormalized = pos.y * 0.4; 
    pos.z += cos(yNormalized) * uCurvature - uCurvature; // peaks at 0 at y=0, curves back at poles
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uScroll;
  uniform float uBarrelDistortion;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Center UV
    vec2 centeredUV = uv - 0.5;
    
    // Distance from center
    float dist = length(centeredUV);
    
    // Barrel Distortion
    vec2 distortedCenter = centeredUV * (1.0 + uBarrelDistortion * dist * dist);
    vec2 finalUV = distortedCenter + 0.5;
    
    // Infinite loop texture using fract
    finalUV.y = fract(finalUV.y - uScroll);
    
    // If distorted UV falls wildly out, we can fade it or clamp
    // But since texture wraps, it just repeats mapped.
    vec4 color = texture2D(uTexture, finalUV);
    
    // Vignette fade at top and bottom edges (stronger for cinematic feel)
    float fadeY = smoothstep(0.5, 0.28, abs(uv.y - 0.5));
    // Subtler fade on X
    float fadeX = smoothstep(0.5, 0.35, abs(uv.x - 0.5));
    
    color.rgb *= fadeY * fadeX; // Multiply RGB to darken edges
    color.a *= fadeY * fadeX;
    
    gl_FragColor = color;
  }
`;

export default function CylindricalReel({ scrollProgress }: { scrollProgress: { current: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  // Create hi-res canvas texture for the crew items
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 4096;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      crew.forEach((c, i) => {
        const y = i * 512;
        
        // Clean, cinematic grid lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(80, y);
        ctx.lineTo(944, y);
        ctx.stroke();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.beginPath();
        ctx.moveTo(80, y + 510);
        ctx.lineTo(944, y + 510);
        ctx.stroke();

        // Crosshair accents
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(80, y - 10, 2, 20);
        ctx.fillRect(944, y - 10, 2, 20);

        // Role & Number (Subtle Gold)
        ctx.fillStyle = c.accent || "#c9a84c";
        ctx.font = "bold 30px monospace";
        ctx.textAlign = "left";
        ctx.letterSpacing = "4px";
        ctx.fillText(`${String(i + 1).padStart(2, "0")} · ${c.role.toUpperCase()}`, 100, y + 100);

        // Tech Name (Bold, Silver)
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 130px 'Arial Black', sans-serif";
        ctx.letterSpacing = "-2px";
        // Create a slight drop shadow for 3D pop
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 10;
        ctx.fillText(c.name.toUpperCase(), 95, y + 240);
        ctx.shadowColor = "transparent"; // reset

        // Detail / Type (Muted white)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "500 32px monospace";
        ctx.letterSpacing = "6px";
        ctx.fillText(`${c.type.toUpperCase()} · ${c.stat.toUpperCase()}`, 100, y + 330);

        // Code Snippet (Very Muted, Italic)
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.font = "italic 28px monospace";
        ctx.letterSpacing = "2px";
        ctx.fillText(c.codeSnippet, 100, y + 430);
        
        // "SMASH CUT TO" or divider accent
        if (i % 2 !== 0) {
          ctx.fillStyle = "#c9a84c";
          ctx.font = "16px monospace";
          ctx.letterSpacing = "8px";
          ctx.textAlign = "center";
          ctx.fillText("S M A S H   C U T   T O", 512, y + 470);
        }
      });
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.minFilter = THREE.LinearMipMapLinearFilter;
    return tex;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uScroll: { value: 0 },
      uCurvature: { value: 2.0 },
      uBarrelDistortion: { value: -0.4 }, // Negative creates the barrel bulging push-out effect
      uTime: { value: 0 },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      // Idle drift time
      materialRef.current.uniforms.uTime.value += delta;
      
      // Smooth interpolation mapped directly to the infinite scroll progress
      // We use lerp to give it a heavy, physics-based cinematic feel
      const idleScroll = Math.sin(materialRef.current.uniforms.uTime.value * 0.6) * 0.01;
      const target = scrollProgress.current + idleScroll;
      
      materialRef.current.uniforms.uScroll.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScroll.value,
        target,
        0.05 // Lower value = more inertia/smoothness
      );
      
      // Mouse interaction: dynamic refraction barrel distortion and pan/tilt
      const pointerY = state.pointer.y; // -1 to 1
      const pointerX = state.pointer.x; // -1 to 1
      
      // Barrel distortion mapping
      const targetBarrel = -0.4 + (pointerY * 0.15);
      materialRef.current.uniforms.uBarrelDistortion.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uBarrelDistortion.value,
        targetBarrel,
        0.05
      );
      
      // Mesh Pan / Tilt based on mouse
      if (meshRef.current) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointerX * 0.3, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -pointerY * 0.15, 0.05);
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 12, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}
