import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

import Navbar from '../components/Navbar';
import DiscoverDomains from './DiscoverDomains';
import DomainModule from './DomainModule';
import FooterPage from '../components/Footer';

const Home = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // ✅ Initialize navigate function

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const maxParticles = 100;
    let animationFrameId;

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw() {
        ctx.fillStyle = `rgba(138, 43, 226, ${this.size / 3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    init();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-vh-100 text-white d-flex flex-column align-items-center position-relative bg-black" style={{ fontFamily: 'sans-serif', overflow: 'hidden' }}>
        <canvas ref={canvasRef} className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }} />

        <main className="d-flex flex-grow-1 flex-column justify-content-center align-items-center text-center p-4 p-md-5 position-relative" style={{ zIndex: 1 }}>
          <div className="container py-5">
            <h1 className="display-4 fw-extrabold lh-1">
              Welcome to <span style={{ color: '#8a2be2' }}>Career Compass</span><br />Your AI - Powered Career Assistant
            </h1>
            <p className="lead text-white fw-bold mt-3">
              Discover your ideal tech career with AI-powered quizzes,<br />explore 20+ IT domains, and get personalized roadmaps<br /> to guide your journey into the world of technology.
            </p>
          </div>

          {/* 👇 Navigate to /domains */}
          <button
            className="mt-8 px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
            onClick={() => navigate('/domains')}
          >
            Explore Domains
          </button>
        </main>
      </div>
      <DiscoverDomains />
      <DomainModule />
      <FooterPage />
    </>
  );
};

export default Home;
