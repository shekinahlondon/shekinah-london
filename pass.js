// My Shekinah Pass — draws a personal check-in pass as a PNG (needs qrcode-generator loaded)
window.SNLPass = (() => {
  const W = 1080, H = 1560;
  const YELLOW = "#FFDF2C", BLACK = "#141414", WHITE = "#FFFFFF";
  const loadImg = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function spaced(ctx, text, x, y, spacing) { // centred letter-spaced text
    const chars = [...text]; const widths = chars.map((c) => ctx.measureText(c).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
    let cx = x - total / 2; ctx.textAlign = "left";
    chars.forEach((c, i) => { ctx.fillText(c, cx, y); cx += widths[i] + spacing; });
    ctx.textAlign = "center";
  }

  async function make({ name, code, logoSrc = "logo.png" }) {
    try { await Promise.all(["500 80px Fraunces", "700 30px 'Plus Jakarta Sans'", "500 30px 'Plus Jakarta Sans'"].map((f) => document.fonts.load(f))); } catch {}
    const logo = await loadImg(logoSrc);
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";

    // Card
    rr(ctx, 0, 0, W, H, 64); ctx.fillStyle = BLACK; ctx.fill();
    ctx.save(); rr(ctx, 0, 0, W, H, 64); ctx.clip();
    // Yellow foot band
    ctx.fillStyle = YELLOW; ctx.fillRect(0, H - 190, W, 190);
    ctx.restore();

    // Logo + wordmark
    if (logo) ctx.drawImage(logo, W / 2 - 85, 80, 170, 170);
    ctx.fillStyle = YELLOW; ctx.font = "700 30px 'Plus Jakarta Sans', sans-serif";
    spaced(ctx, "MY SHEKINAH", W / 2, 318, 9);
    ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = "500 28px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Check-in pass", W / 2, 362);

    // Name (shrinks to fit)
    let size = 96; const nm = String(name || "").trim();
    do { ctx.font = `500 ${size}px Fraunces, Georgia, serif`; size -= 4; } while (ctx.measureText(nm).width > W - 160 && size > 40);
    ctx.fillStyle = WHITE; ctx.fillText(nm, W / 2, 486);

    // QR panel
    const P = 600, px = (W - P) / 2, py = 560;
    rr(ctx, px, py, P, P, 40); ctx.fillStyle = WHITE; ctx.fill();
    const q = qrcode(0, "M"); q.addData(`SNL-${code}`); q.make();
    const n = q.getModuleCount(), inner = P - 80, cell = Math.floor(inner / n), off = px + (P - cell * n) / 2, offY = py + (P - cell * n) / 2;
    ctx.fillStyle = BLACK;
    for (let r = 0; r < n; r++) for (let col = 0; col < n; col++) if (q.isDark(r, col)) ctx.fillRect(off + col * cell, offY + r * cell, cell, cell);

    // Code
    ctx.fillStyle = YELLOW; ctx.font = "700 44px ui-monospace, Menlo, Consolas, monospace";
    spaced(ctx, String(code), W / 2, 1256, 14);
    ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = "500 30px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Show this to an usher every Sunday", W / 2, 1316);

    // Foot
    ctx.fillStyle = BLACK; ctx.font = "700 34px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Shekinah Nation London", W / 2, H - 108);
    ctx.font = "500 26px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Your home. Your community. Your journey.", W / 2, H - 64);
    return c.toDataURL("image/png");
  }
  return { make };
})();
