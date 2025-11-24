"use client";

import { useEffect } from "react";
import "./background.css";

export default function AnimatedBackground() {
  useEffect(() => {
    let ticking = false;

    function updateScene() {
      const scrolled = window.pageYOffset;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrolled / maxScroll, 1);

      // Sky colors
      const skyColors = [
        "linear-gradient(to bottom, #FFE4B5 0%, #FFEAA7 50%, #DDA0DD 100%)", // sunrise
        "linear-gradient(to bottom, #87CEEB 0%, #B0E0E6 50%, #E0F6FF 100%)", // midday
        "linear-gradient(to bottom, #87CEEB 0%, #98D8E8 30%, #B0E0E6 100%)", // afternoon
        "linear-gradient(to bottom, #FFE4B5 0%, #FFEAA7 40%, #DDA0DD 100%)", // sunset
        "linear-gradient(to bottom, #2F1B69 0%, #40407A 40%, #6C5CE7 100%)", // night
      ];

      const stageProgress = scrollProgress * 4;
      const currentStage = Math.floor(stageProgress);
      const sky = document.querySelector(".sky");
      if (sky) sky.style.background = skyColors[currentStage];

      // Sun
      const sun = document.querySelector(".sun");
      if (sun) {
        const sunX = 5 + scrollProgress * 85;
        const sunY = 60 - 4 * scrollProgress * (1 - scrollProgress) * 100;
        sun.style.left = `${sunX}%`;
        sun.style.top = `${sunY}%`;
      }

      // Parallax layers
      document.querySelectorAll(".parallax-layer").forEach((layer) => {
        const depth = Number(layer.dataset.depth || 0);
        const movement = scrollProgress * depth * 100;
        layer.style.transform = `translateY(${movement}px)`;
      });

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateScene);
        ticking = true;
      }
    }

    window.addEventListener("scroll", requestTick);
    updateScene();

    return () => {
      window.removeEventListener("scroll", requestTick);
    };
  }, []);

  return (
    <div className="background-container">
      {/* Sky + Sun */}
      <div className="sky">
        <div className="sun"></div>
      </div>

      {/* BACK MOUNTAINS */}
      <div className="parallax-layer mountains-back" data-depth="0.3">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#2d3142"
            d="M0,224L80,192L160,128L240,160L320,128L400,160L480,96L560,64L640,96L720,128L800,96L880,128L960,192L1040,224L1120,160L1200,192L1280,160L1360,128L1440,160L1440,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* FRONT MOUNTAINS */}
      <div className="parallax-layer mountains-front" data-depth="0.6">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#3f4356"
            d="M0,288L60,272L120,240L180,256L240,224L300,240L360,208L420,224L480,208L540,224L600,192L660,208L720,192L780,208L840,192L900,208L960,192L1020,224L1080,192L1140,208L1200,192L1260,208L1320,192L1380,208L1440,192L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* TREES */}
      <div className="parallax-layer trees" data-depth="0.9">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#228B22"
            d="M0,320L40,288L80,320L120,288L160,320L200,288L240,320L280,288L320,320L360,288L400,320L440,288L480,320L520,288L560,320L600,288L640,320L680,288L720,320L760,288L800,320L840,288L880,320L920,288L960,320L1000,288L1040,320L1080,288L1120,320L1160,288L1200,320L1240,288L1280,320L1320,288L1360,320L1400,288L1440,320Z"
          ></path>
        </svg>
      </div>

      {/* ROAD */}
      <div className="road">
        <div className="road-line"></div>
      </div>
    </div>
  );
}
