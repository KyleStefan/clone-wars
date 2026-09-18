(function () {
  window.SPRITES = {
    drawBackground: function (ctx, width, height, time) {
      ctx.save();

      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, '#5b2b63');
      sky.addColorStop(0.48, '#d96b58');
      sky.addColorStop(1, '#f4b05f');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      const drift = (time || 0) * 2;
      function sun(cx, cy, radius, color) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#3b203e';
        ctx.stroke();
      }
      sun(width * 0.28, height * 0.22, Math.min(width, height) * 0.075, '#ffe58a');
      sun(width * 0.74, height * 0.29, Math.min(width, height) * 0.055, '#ffd16d');

      ctx.fillStyle = 'rgba(73, 35, 69, 0.48)';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.64);
      ctx.lineTo(width * 0.13, height * 0.55);
      ctx.lineTo(width * 0.25, height * 0.63);
      ctx.lineTo(width * 0.4, height * 0.51);
      ctx.lineTo(width * 0.58, height * 0.64);
      ctx.lineTo(width * 0.77, height * 0.54);
      ctx.lineTo(width, height * 0.62);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 190, 104, 0.28)';
      for (let i = -1; i < 7; i += 1) {
        const x = i * 76 - (drift % 76);
        ctx.beginPath();
        ctx.moveTo(x, height * 0.72);
        ctx.lineTo(x + 42, height * 0.66);
        ctx.lineTo(x + 87, height * 0.72);
        ctx.lineTo(x + 48, height * 0.75);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    },

    drawGround: function (ctx, width, height, groundHeight, offset) {
      ctx.save();
      const top = height - groundHeight;
      ctx.fillStyle = '#b9643f';
      ctx.fillRect(0, top, width, groundHeight);

      ctx.fillStyle = '#e3944f';
      ctx.fillRect(0, top, width, 7);
      ctx.strokeStyle = '#3b203e';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, top + 1, width, groundHeight - 1);

      const tile = 34;
      const slide = ((offset || 0) % tile + tile) % tile;
      ctx.strokeStyle = 'rgba(59, 32, 62, 0.42)';
      ctx.lineWidth = 2;
      for (let x = -tile - slide; x < width + tile; x += tile) {
        ctx.beginPath();
        ctx.moveTo(x, top + 10);
        ctx.lineTo(x + tile * 0.5, height);
        ctx.stroke();
      }
      ctx.restore();
    },

    drawBird: function (ctx, x, y, size, velocity) {
      ctx.save();
      ctx.translate(x, y);
      const tilt = Math.max(-0.28, Math.min(0.38, (velocity || 0) / 900));
      ctx.rotate(tilt);
      const s = size / 34;

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.fillStyle = '#d9e5e8';
      ctx.strokeStyle = '#1d1a2b';
      ctx.lineWidth = Math.max(2, 2.5 * s);

      ctx.beginPath();
      ctx.moveTo(-15 * s, 3 * s);
      ctx.lineTo(-7 * s, -10 * s);
      ctx.lineTo(8 * s, -12 * s);
      ctx.lineTo(16 * s, -4 * s);
      ctx.lineTo(10 * s, 8 * s);
      ctx.lineTo(-5 * s, 11 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#45a7b5';
      ctx.beginPath();
      ctx.moveTo(-8 * s, 2 * s);
      ctx.lineTo(-18 * s, 9 * s);
      ctx.lineTo(-4 * s, 8 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ee7e4d';
      ctx.beginPath();
      ctx.moveTo(13 * s, -3 * s);
      ctx.lineTo(20 * s, 0);
      ctx.lineTo(13 * s, 3 * s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#69d5df';
      ctx.beginPath();
      ctx.arc(4 * s, -5 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    },

    drawPipe: function (ctx, x, gapTop, gapBottom, pipeWidth, height) {
      ctx.save();
      const cap = Math.min(10, pipeWidth * 0.18);
      const edge = '#241c35';
      const beam = '#5be0e1';
      const glow = '#c5ffff';

      function gate(y, gateHeight) {
        if (gateHeight <= 0) return;
        ctx.fillStyle = '#286b91';
        ctx.fillRect(x, y, pipeWidth, gateHeight);
        ctx.fillStyle = 'rgba(91, 224, 225, 0.32)';
        ctx.fillRect(x + pipeWidth * 0.16, y, pipeWidth * 0.2, gateHeight);
        ctx.strokeStyle = edge;
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 1.5, y + 1.5, pipeWidth - 3, gateHeight - 3);
      }

      gate(0, gapTop);
      gate(gapBottom, height - gapBottom);

      ctx.fillStyle = beam;
      ctx.strokeStyle = edge;
      ctx.lineWidth = 3;
      if (gapTop > 0) {
        ctx.fillRect(x - cap, gapTop - 8, pipeWidth + cap * 2, 8);
        ctx.strokeRect(x - cap + 1.5, gapTop - 8 + 1.5, pipeWidth + cap * 2 - 3, 5);
      }
      if (gapBottom < height) {
        ctx.fillRect(x - cap, gapBottom, pipeWidth + cap * 2, 8);
        ctx.strokeRect(x - cap + 1.5, gapBottom + 1.5, pipeWidth + cap * 2 - 3, 5);
      }

      ctx.fillStyle = glow;
      ctx.fillRect(x + pipeWidth * 0.18, gapTop - 5, pipeWidth * 0.64, 2);
      ctx.fillRect(x + pipeWidth * 0.18, gapBottom + 3, pipeWidth * 0.64, 2);
      ctx.restore();
    }
  };
})();
