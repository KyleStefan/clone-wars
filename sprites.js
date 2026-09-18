(function () {
  'use strict';

  function drawBackground(ctx, width, height, time) {
    ctx.save();

    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#17133d');
    sky.addColorStop(0.52, '#5a2454');
    sky.addColorStop(1, '#e0703f');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const twinkle = 0.68 + Math.sin(time * 0.9) * 0.12;
    ctx.fillStyle = 'rgba(255, 236, 170, ' + twinkle + ')';
    const stars = [
      [24, 58, 2], [74, 95, 1.5], [126, 42, 2], [181, 82, 1.5],
      [236, 35, 2], [301, 92, 1.5], [338, 54, 2], [48, 164, 1.5],
      [278, 145, 1.5], [155, 142, 1]
    ];
    for (const star of stars) {
      ctx.beginPath();
      ctx.arc(star[0], star[1], star[2], 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#ffcc58';
    ctx.beginPath();
    ctx.arc(width * 0.28, height * 0.24, Math.min(width, height) * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff8b4a';
    ctx.beginPath();
    ctx.arc(width * 0.71, height * 0.29, Math.min(width, height) * 0.052, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#3b2147';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.67);
    ctx.lineTo(width * 0.16, height * 0.53);
    ctx.lineTo(width * 0.3, height * 0.67);
    ctx.lineTo(width * 0.48, height * 0.49);
    ctx.lineTo(width * 0.7, height * 0.67);
    ctx.lineTo(width * 0.85, height * 0.56);
    ctx.lineTo(width, height * 0.66);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#7f3d43';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.77);
    ctx.lineTo(width * 0.22, height * 0.64);
    ctx.lineTo(width * 0.39, height * 0.77);
    ctx.lineTo(width * 0.63, height * 0.62);
    ctx.lineTo(width * 0.82, height * 0.77);
    ctx.lineTo(width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#8e4c36';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#d17a43';
    ctx.fillRect(0, top, width, 6);

    ctx.strokeStyle = '#5d2c32';
    ctx.lineWidth = 3;
    const spacing = 42;
    const shift = -(offset % spacing);
    for (let x = shift - spacing; x < width + spacing; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, top + 12);
      ctx.lineTo(x + 18, top + 27);
      ctx.lineTo(x + 7, top + 43);
      ctx.lineTo(x + 27, top + 61);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    const tilt = Math.max(-0.32, Math.min(0.45, velocity / 850));
    ctx.rotate(tilt);
    const half = size * 0.5;
    const nose = size * 0.5;

    ctx.fillStyle = '#16162e';
    ctx.strokeStyle = '#080817';
    ctx.lineWidth = Math.max(2, size * 0.07);
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(-half, size * 0.08);
    ctx.lineTo(-size * 0.08, -half * 0.68);
    ctx.lineTo(size * 0.12, -size * 0.22);
    ctx.lineTo(nose, 0);
    ctx.lineTo(size * 0.12, size * 0.22);
    ctx.lineTo(-size * 0.08, half * 0.68);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#4ed8e8';
    ctx.beginPath();
    ctx.moveTo(-size * 0.12, -size * 0.3);
    ctx.lineTo(size * 0.27, 0);
    ctx.lineTo(-size * 0.12, size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ff6f4e';
    ctx.beginPath();
    ctx.moveTo(-half, -size * 0.12);
    ctx.lineTo(-size * 0.72, 0);
    ctx.lineTo(-half, size * 0.12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffd45b';
    ctx.beginPath();
    ctx.arc(size * 0.16, -size * 0.08, Math.max(1.5, size * 0.045), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    const border = Math.max(2, pipeWidth * 0.06);
    const beam = Math.max(5, pipeWidth * 0.16);

    ctx.fillStyle = '#101b38';
    ctx.strokeStyle = '#070b1d';
    ctx.lineWidth = border;
    ctx.fillRect(x, 0, pipeWidth, gapTop);
    ctx.strokeRect(x + border / 2, 0, pipeWidth - border, gapTop);
    ctx.fillRect(x, gapBottom, pipeWidth, height - gapBottom);
    ctx.strokeRect(x + border / 2, gapBottom, pipeWidth - border, height - gapBottom);

    ctx.fillStyle = '#ec3f61';
    ctx.fillRect(x + pipeWidth * 0.22, 0, beam, Math.max(0, gapTop - border));
    ctx.fillRect(x + pipeWidth * 0.22, gapBottom + border, beam, Math.max(0, height - gapBottom - border));
    ctx.fillStyle = '#53e1ed';
    ctx.fillRect(x + pipeWidth * 0.62, 0, beam, Math.max(0, gapTop - border));
    ctx.fillRect(x + pipeWidth * 0.62, gapBottom + border, beam, Math.max(0, height - gapBottom - border));

    ctx.fillStyle = '#ffcf58';
    ctx.fillRect(x, Math.max(0, gapTop - beam), pipeWidth, beam);
    ctx.fillRect(x, gapBottom, pipeWidth, Math.min(beam, Math.max(0, height - gapBottom)));
    ctx.strokeStyle = '#070b1d';
    ctx.strokeRect(x + border / 2, Math.max(0, gapTop - beam) + border / 2, pipeWidth - border, Math.max(0, beam - border));
    ctx.strokeRect(x + border / 2, gapBottom + border / 2, pipeWidth - border, Math.max(0, Math.min(beam, height - gapBottom) - border));
    ctx.restore();
  }

  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
})();
