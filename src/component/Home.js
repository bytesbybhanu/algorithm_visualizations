import React, { useEffect, useRef } from 'react';
import '../styles/HomePage.css'; // Importing CSS file
import Home from '../Home';

const CanvasAnimation = () => {
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let can_w, can_h;
    const BALL_NUM = 30;
    const R = 2;
    const balls = [];
    const alpha_f = 0.03;

    const velocity = 0.5; // Adjust the velocity to control the speed of the animation

    function getRandomBall() {
      // Set initial position of the ball
      const x = randomSidePos(can_w);
      const y = randomSidePos(can_h);
      return {
        x,
        y,
        vx: velocity,
        vy: velocity,
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      };
    }

    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function randomSidePos(length) {
      return Math.ceil(Math.random() * length);
    }

    function renderBalls() {
      balls.forEach(b => {
        ctx.fillStyle = `rgba(207, 255, 4, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      });
    }

    function updateBalls() {
      balls.forEach(b => {
        // Update ball position based on velocity
        b.x += b.vx;
        b.y += b.vy;

        // Wrap around the canvas if the ball goes out of bounds
        if (b.x > can_w + R) {
          b.x = -R;
        }
        if (b.x < -R) {
          b.x = can_w + R;
        }
        if (b.y > can_h + R) {
          b.y = -R;
        }
        if (b.y < -R) {
          b.y = can_h + R;
        }

        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
      });
    }

    function renderLines() {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const fraction = getDisOf(balls[i], balls[j]) / 260;

          if (fraction < 1) {
            const alpha = (1 - fraction).toString();

            ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function getDisOf(b1, b2) {
      const delta_x = Math.abs(b1.x - b2.x);
      const delta_y = Math.abs(b1.y - b2.y);

      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    function addBallIfy() {
      if (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
      }
    }

    function initBalls(num) {
      for (let i = 1; i <= num; i++) {
        balls.push({
          x: randomSidePos(can_w),
          y: randomSidePos(can_h),
          vx: velocity,
          vy: velocity,
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        });
      }
    }

    function initCanvas() {
      canvas.setAttribute('width', window.innerWidth);
      canvas.setAttribute('height', window.innerHeight);

      can_w = parseInt(canvas.getAttribute('width'));
      can_h = parseInt(canvas.getAttribute('height'));
    }

    function goMovie() {
      initCanvas();
      initBalls(BALL_NUM);
      render();
    }

    // Call the goMovie function to start the animation
    goMovie();

    function render() {
      ctx.clearRect(0, 0, can_w, can_h);
      renderBalls();
      renderLines();
      updateBalls();
      addBallIfy();
      requestAnimationFrame(render);
    }

    // Cleanup function for useEffect
    return () => {
      // No cleanup needed in this case
    };
  }, []); // Empty dependency array to run the effect only once
  
  return (
    <div className="canvas-container">
      <Home />
      <canvas ref={canvasRef} className="canvas" id="nokey"></canvas>
    </div>
  );
};

export default CanvasAnimation;
