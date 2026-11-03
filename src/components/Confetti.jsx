import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#FFD84D', '#FF9B42', '#A879D8', '#FFB6CE', '#9EDFFF', '#FFFFFF'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function fireStarBurst(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { x, y },
    colors: ['#FFD84D', '#FFA800', '#FFB6CE', '#A879D8'],
    shapes: ['star', 'circle'],
    scalar: 1.1,
  });
}

export function firePurpleHearts() {
  confetti({
    particleCount: 50,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#A879D8', '#8751B8', '#FFB6CE', '#E03A60'],
    shapes: ['circle'],
  });
}
