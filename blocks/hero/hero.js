import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  let bgImage = '';
  let title = '';
  let subtitle = '';
  let features = '';
  let cta = '';
  let variant = '';

  // ✅ robust parsing (handles EDS formatting issues)
  rows.forEach((row) => {
    const cells = row.children;

    const key = cells[0]?.textContent
      ?.replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

    const valueHTML = cells[1]?.innerHTML;
    const valueText = cells[1]?.textContent.trim();

    if (key?.includes('variant')) variant = valueText.toLowerCase();
    if (key?.includes('background')) bgImage = valueHTML;
    if (key?.includes('title')) title = valueText;
    if (key?.includes('subtitle')) subtitle = valueText;
    if (key?.includes('features')) features = valueText;
    if (key?.includes('cta')) cta = valueText;
  });

  // ✅ DEBUG (remove later if needed)
  console.log('Hero Variant:', variant);

  // ✅ wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-wrapper';

  // ✅ apply variant class ONLY if exists
  if (variant) {
    wrapper.classList.add(`hero-${variant}`);
  }

  // ✅ background
  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  bg.innerHTML = bgImage;

  // ✅ optimize image
  bg.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture')?.replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }])
    );
  });

  // ✅ content
  const content = document.createElement('div');
  content.className = 'hero-content';

  // ✅ CTA parsing
  const ctas = cta.split('/').map((c) => c.trim()).filter(Boolean);

  const ctaHTML = ctas
    .map((text) => `<a href="#">${text}</a>`)
    .join('');

  content.innerHTML = `
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="hero-features">${features}</div>
    <div class="hero-cta">${ctaHTML}</div>
  `;

  wrapper.append(bg, content);

  // ✅ replace original table
  block.replaceChildren(wrapper);
}
