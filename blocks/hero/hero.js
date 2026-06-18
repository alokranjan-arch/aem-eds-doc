import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  let bgImage = '';
  let title = '';
  let subtitle = '';
  let features = '';
  let cta = '';
  let variant = '';

  rows.forEach(row => {
    const cells = row.children;

    const key = cells[0]?.textContent.trim().toLowerCase();
    const valueHTML = cells[1]?.innerHTML;
    const valueText = cells[1]?.textContent.trim();

    if (key === 'variant') variant = valueText;
    if (key === 'background') bgImage = valueHTML;
    if (key === 'title') title = valueText;
    if (key === 'subtitle') subtitle = valueText;
    if (key === 'features') features = valueText;
    if (key === 'cta') cta = valueText;
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-wrapper';

  // ✅ apply variant correctly
  if (variant) {
    wrapper.classList.add(`hero-${variant}`);
  }

  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  bg.innerHTML = bgImage;

  bg.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture')?.replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }])
    );
  });

  const content = document.createElement('div');
  content.className = 'hero-content';

  const ctas = cta.split('/').map(c => c.trim()).filter(Boolean);

  const ctaHTML = ctas
    .map(text => `<a href="#">${text}</a>`)   // ✅ fixed
    .join('');

  content.innerHTML = `
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="hero-features">${features}</div>
    <div class="hero-cta">${ctaHTML}</div>
  `;

  wrapper.append(bg, content);

  block.replaceChildren(wrapper);
}
