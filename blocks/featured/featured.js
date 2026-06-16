/* ✅ MAIN WRAPPER */
.featured-wrapper {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
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
}

/* ✅ LIGHT OVERLAY (VERY IMPORTANT – NOT TOO DARK) */
.featured-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.45) 10%,   /* light shadow for readability */
    rgba(0,0,0,0.25) 30%,   /* softer transition */
    rgba(0,0,0,0.1) 55%,    /* very light */
    rgba(0,0,0,0) 85%       /* keep image visible */
  );
}

/* ✅ CONTENT POSITION (DO NOT DOMINATE IMAGE) */
.featured-content {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  max-width: 360px;   /* ✅ keeps image visible */
  z-index: 2;
  color: #fff;
}

/* ✅ TITLE */
.featured-content h2 {
  font-size: 36px;
  margin-bottom: 10px;
  font-weight: 700;
}

/* ✅ TAGLINE */
.featured-tagline {
  color: #00d4ff;
  font-size: 16px;
  margin-bottom: 10px;
}

/* ✅ DESCRIPTION */
.featured-desc {
  color: #ddd;
  margin-bottom: 18px;
  line-height: 1.5;
}

/* ✅ CTA BUTTONS */
.featured-cta a {
  display: inline-block;
  margin-right: 10px;
  padding: 10px 18px;
  border-radius: 10px;
  background: #7b2fff;
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  transition: 0.3s;
}

/* ✅ HOVER */
.featured-cta a:hover {
  background: #00d4ff;
  color: #000;
}

/* ✅ OPTIONAL: subtle glass feel (very light) */
.featured-content {
  backdrop-filter: blur(2px);
}

/* ✅ RESPONSIVE */
@media (max-width: 768px) {
  .featured-bg img {
    height: 320px;
  }

  .featured-content {
    left: 20px;
    max-width: 90%;
  }

  .featured-content h2 {
    font-size: 26px;
  }
}
