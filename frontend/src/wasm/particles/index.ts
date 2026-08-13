// This file will be replaced by the actual WASM module
// For now, it provides a fallback implementation

/**
 * Burst confetti particles
 * @param count - Number of particles to burst
 */
export const burstConfetti = (count: number): void => {
  console.log(`[WASM Fallback] Bursting ${count} confetti particles`);
  
  // Fallback animation using vanilla JS
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb', '#a66cff'];
  
  for (let i = 0; i < Math.min(count, 200); i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 500 + 200;
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    
    Object.assign(el.style, {
      position: 'fixed',
      width: `${size}px`,
      height: `${size * 0.6}px`,
      background: color,
      borderRadius: '2px',
      left: `${x}px`,
      top: `${y}px`,
      pointerEvents: 'none',
      zIndex: '9999',
      transform: `rotate(${Math.random() * 360}deg)`,
    });
    
    document.body.appendChild(el);
    
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 300;
    const startTime = performance.now();
    const duration = 1000 + Math.random() * 1000;
    
    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const progress = elapsed / (duration / 1000);
      
      if (progress >= 1) {
        el.remove();
        return;
      }
      
      const currentX = x + dx * progress;
      const currentY = y + dy * progress + 0.5 * 500 * progress * progress;
      const opacity = 1 - progress;
      const rotation = progress * 720;
      
      el.style.transform = `translate(${currentX - x}px, ${currentY - y}px) rotate(${rotation}deg)`;
      el.style.opacity = `${opacity}`;
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }
};