(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#07133d');
    sky.addColorStop(0.55, '#17206b');
    sky.addColorStop(1, '#3c176d');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const stars = [
      [22, 52, 2], [64, 126, 1.5], [112, 42, 1.5], [151, 96, 2],
      [199, 34, 1.5], [247, 118, 2], [296, 62, 1.5], [337, 154, 2],
      [42, 230, 1.5], [142, 188, 1], [236, 215, 1.5], [315, 260, 1]
    ];
    const twinkle = Math.sin(time * 3) * 0.2;
    ctx.fillStyle = '#d8f7ff';
    for (const star of stars) {
      const radius = Math.max(0.7, star[2] + twinkle * (star[0] % 3));
      ctx.beginPath();
      ctx.arc(star[0], star[1], radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(79, 238, 255, 0.18)';
    ctx.lineWidth = 1;
    for (let y = height * 0.58; y < height; y += 34) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#100d32';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#22e6ff';
    ctx.fillRect(0, top, width, 4);
    ctx.strokeStyle = '#6b43ff';
    ctx.lineWidth = 2;
    const step = 32;
    const shift = -(offset % step);
    for (let x = shift; x < width + step; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, top + 5);
      ctx.lineTo(x + step * 0.55, height);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.35, Math.min(0.55, velocity / 900)));
    const half = size / 2;
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(2, size * 0.08);
    ctx.strokeStyle = '#080b25';
    ctx.fillStyle = '#ff5edb';
    ctx.beginPath();
    ctx.moveTo(-half * 0.95, 0);
    ctx.lineTo(-half * 0.2, -half * 0.62);
    ctx.lineTo(half * 0.92, -half * 0.34);
    ctx.lineTo(half, half * 0.35);
    ctx.lineTo(-half * 0.3, half * 0.62);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#62f5ff';
    ctx.beginPath();
    ctx.moveTo(-half * 0.85, half * 0.04);
    ctx.lineTo(-half * 1.18, half * 0.3);
    ctx.lineTo(-half * 0.65, half * 0.34);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f8ffff';
    ctx.beginPath();
    ctx.arc(half * 0.42, -half * 0.16, Math.max(2, size * 0.1), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    const beam = Math.max(4, pipeWidth * 0.12);
    ctx.lineWidth = Math.max(2, pipeWidth * 0.06);
    ctx.strokeStyle = '#090b2b';
    ctx.fillStyle = '#ff3fd4';
    ctx.fillRect(x, 0, pipeWidth, gapTop);
    ctx.strokeRect(x, 0, pipeWidth, gapTop);
    ctx.fillRect(x, gapBottom, pipeWidth, height - gapBottom);
    ctx.strokeRect(x, gapBottom, pipeWidth, height - gapBottom);
    ctx.fillStyle = '#67f7ff';
    ctx.fillRect(x + beam, 0, pipeWidth - beam * 2, Math.max(0, gapTop - 6));
    ctx.fillRect(x + beam, gapBottom + 6, pipeWidth - beam * 2, Math.max(0, height - gapBottom - 6));
    ctx.fillStyle = '#fff06a';
    ctx.fillRect(x - beam * 0.8, gapTop - beam, pipeWidth + beam * 1.6, beam);
    ctx.fillRect(x - beam * 0.8, gapBottom, pipeWidth + beam * 1.6, beam);
    ctx.strokeStyle = '#090b2b';
    ctx.strokeRect(x - beam * 0.8, gapTop - beam, pipeWidth + beam * 1.6, beam);
    ctx.strokeRect(x - beam * 0.8, gapBottom, pipeWidth + beam * 1.6, beam);
    ctx.restore();
  }

  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
})();
