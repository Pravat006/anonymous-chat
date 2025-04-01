"use client";

import { useEffect, useRef } from "react";

const STAR_DENSITY = 0.0003; // More stars per pixel
const SPEED = 0.5; // Increased speed for faster random movement

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const generateStars = (count: number) =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width, // Random x position
        y: Math.random() * canvas.height, // Random y position
        radius: Math.random() * 1 + 0.2, // Smaller snowflakes
        speedX: (Math.random() - 0.5) * SPEED, // Random horizontal speed
        speedY: (Math.random() - 0.5) * SPEED, // Random vertical speed
      }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = generateStars(Math.floor(canvas.width * canvas.height * STAR_DENSITY));
      drawBackground();
    };

    let stars = generateStars(Math.floor(canvas.width * canvas.height * STAR_DENSITY));

    const drawBackground = () => {
      // Create a radial gradient for the vignette effect (dark border and bright center)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0, // Center of the canvas
        canvas.width / 2, canvas.height / 2, canvas.width // Outer edge
      );

      gradient.addColorStop(0, "#151a1d"); // Dark center (core of nebula)
      gradient.addColorStop(0.4, "#494d4c"); // Nebula core
      gradient.addColorStop(0.7, "#696251"); // Muted warm nebula
      gradient.addColorStop(1, "#3b4434"); // Dark outer edges (vignette effect)

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a soft, smooth glow in the center, fading with the background
      const centerGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0, // Center of the canvas
        canvas.width / 2, canvas.height / 2, 250 // Radius of the center glow
      );
      centerGlow.addColorStop(0, `rgba(255, 255, 220, 0.3)`); // Soft, bright glow at the center
      centerGlow.addColorStop(1, `rgba(255, 255, 220, 0)`); // Fade to transparent

      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Optional: Add additional layers of subtle fading glow for a broader effect
      const broaderGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0, // Center of the canvas
        canvas.width / 2, canvas.height / 2, 350 // Larger radius for a broader effect
      );
      broaderGlow.addColorStop(0, `rgba(255, 255, 220, 0.15)`); // Softer glow
      broaderGlow.addColorStop(1, `rgba(300, 300, 300, -1)`); // Fade to transparent

      ctx.fillStyle = broaderGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      drawBackground();

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white"; // Snow-like stars
        ctx.fill();

        star.x += star.speedX;
        star.y += star.speedY;

        // Ensure stars that move off-screen wrap around smoothly (no spinning effect)
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full z-0" />;
};

export default CanvasBackground;
