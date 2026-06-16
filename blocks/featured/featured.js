/* ✅ MAIN WRAPPER */
.featured-wrapper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: #0b0b0f;
}

/* ✅ BACKGROUND CONTAINER */
.featured-bg {
  position: relative;
}

/* ✅ IMAGE */
.featured-bg img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
  transform: scale(1.03); /* ✅ subtle cinematic zoom */
}

/* ✅ LIGHT CINEMATIC OVERLAY (BALANCED) */
.featured-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.5) 10%,
    rgba(0,0,0,0.3) 30%,
    rgba(0,0,0,0.1) 55%,
    rgba(0,0,0,0) 80%
  );
}

/* ✅ CONTENT POSITION */
.featured-content {
  position: absolute;
  top: 50%;
  left: 48px;
  transform: translateY(-50%);
  max-width: 360px;
  color: #fff;
  z-index: 2;

  /* ✅ soft glass effect instead of dark block */
  backdrop-filter: blur(3px);
}

/* ✅ TITLE */
.featured-content h2 {
  font-size: 38px;
  margin-bottom: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

/* ✅ TAGLINE */
.featured-tagline {
  color: #00d4ff;
  font-size: 16px;
  margin-bottom: 12px;
}

/* ✅ DESCRIPTION */
.featured-desc {
  color: #ddd;
  line-height: 1.5;
  margin-bottom: 20px;
}

/* ✅ CTA CONTAINER */
.featured-cta {
  margin-top: 10px;
}

/* ✅ CTA BUTTONS (IMPROVED) */
.featured-cta a {
  display: inline-block;
  margin-right: 12px;
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 14px;

  background: linear-gradient(135deg, #7b2fff, #5a1fd4);
  color: #fff;

  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(123,47,255,0.35);
}

/* ✅ HOVER EFFECT */
.featured-cta a:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #00d4ff, #7b2fff);
  box-shadow: 0 8px 20px rgba(0,212,255,0.4);
}

/* ✅ IMAGE HOVER (SUBTLE PREMIUM TOUCH) */
.featured-wrapper:hover .featured-bg img {
  transform: scale(1.06);
  transition: transform 0.6s ease;
}

/* ✅ RESPONSIVE */
@media (max-width: 768px) {
  .featured-bg img {
    height: 320px;
  }

  .featured-content {
    left: 20px;
    max-width: 85%;
  }

  .featured-content h2 {
    font-size: 26px;
  }
}
