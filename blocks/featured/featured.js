.featured-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

/* IMAGE */
.featured-bg img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

/* ✅ LIGHT OVERLAY */
.featured-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.4),
    rgba(0,0,0,0.1),
    transparent
  );
  z-index: 1;
}

/* ✅ TEXT ABOVE OVERLAY */
.featured-content {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  z-index: 2;  /* ✅ THIS is why text was not visible */
  color: #fff;
  max-width: 350px;
}

/* TEXT */
.featured-content h2 {
  font-size: 34px;
  margin-bottom: 10px;
}

.featured-tagline {
  color: #00d4ff;
  margin-bottom: 10px;
}

.featured-desc {
  color: #ddd;
  margin-bottom: 16px;
}

/* BUTTONS */
.featured-cta a {
  margin-right: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  background: #7b2fff;
  color: #fff;
  text-decoration: none;
}
