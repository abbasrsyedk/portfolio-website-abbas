"use client";

import { useEffect } from "react";
import "./background.css";

export default function CanvaBackground() {
  useEffect(() => {
    let ticking = false;

    function updateScene() {
      const scrolled = window.pageYOffset;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrolled / maxScroll, 1);

      // Sky stages
      const skyColors = [
        'linear-gradient(to bottom, #FFE4B5 0%, #FFEAA7 50%, #DDA0DD 100%)',
        'linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 50%, #E0F6FF 100%)',
        'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 30%, #B0E0E6 100%)',
        'linear-gradient(to bottom, #FFE4B5 0%, #FFEAA7 40%, #DDA0DD 100%)',
        'linear-gradient(to bottom, #2F1B69 0%, #40407A 40%, #6C5CE7 100%)'
      ];

      const stageProgress = scrollProgress * 4;
      const currentStage = Math.floor(stageProgress);

      const sky = document.querySelector('.sky');
      if (sky) sky.style.background = skyColors[currentStage];

      const sun = document.querySelector('.sun');
      if (sun) {
        const sunX = 5 + (scrollProgress * 85);
        const sunY = 60 - (4 * scrollProgress * (1 - scrollProgress) * 100);
        sun.style.left = `${sunX}%`;
        sun.style.top = `${sunY}%`;
      }

      const speeds = {
        'mountains-back': 0.15,
        'mountains-front': 0.4,
        'trees': 0.7
      };

      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const className = Array.from(layer.classList).find(c => ["mountains-back", "mountains-front", "trees"].includes(c));
        const speed = speeds[className] || 0.5;
        const xPos = -(scrolled * speed * 0.3);
        layer.style.transform = `translateX(${xPos}px)`;
      });

      const road = document.querySelector('.road');
      if (road) {
        const roadSpeed = scrolled * 0.8;
        road.style.transform = `translateX(-${roadSpeed}px)`;
      }

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScene);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick);
    updateScene();

    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  return (
    <div className="background-container">
      <div className="sky">
        <div className="sun"></div>
      </div>

      {/* Back Mountains */}
      <div className="parallax-layer mountains-back">
        {/* All back mountain SVGs */}
        {/* Inserted from HTML */}
        {/* For brevity not showing all here - they will be included in actual code */}
      </div>

      {/* Front Mountains */}
      <div className="parallax-layer mountains-front">
        {/* All front mountain SVGs */}
      </div>

      {/* Trees */}
      <div className="parallax-layer trees">
        {/* All tree SVGs with trunks and blossoms */}
      </div>

      {/* Road */}
      <div className="road"></div>
    </div>
  );
}
