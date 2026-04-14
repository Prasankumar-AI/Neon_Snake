import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: 'auto', padding: '1rem', textAlign: 'center', width: '100%' }}>
      <p style={{ margin: '0.5rem 0', color: 'var(--neon-green)', textShadow: '0 0 5px var(--neon-green)' }}>
        Developed by Prasan kumar
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.5rem' }}>
        <a href="https://github.com/Prasankumar-AI/Neon_Snake/tree/main" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--text-primary)' }}>
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/prasanofficial/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-primary)' }}>
          <FaLinkedin size={24} />
        </a>
        <a href="https://www.instagram.com/urtrulypk/" target="_blank" rel="noreferrer" aria-label="Instagram" style={{ color: 'var(--text-primary)' }}>
          <FaInstagram size={24} />
        </a>
      </div>
    </footer>
  );
};
