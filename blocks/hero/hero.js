import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // ✅ detect variations (like "bottom")
  const variants = [...block.classList].filter(c => c !== 'hero');

  variants.forEach(v => {
    block.classList.add(`hero-${v}`);
  });

  const rows = [...block.children];

  let bgImage = '';
  let title = '';
  let subtitle = '';
  let features = '';
  let cta = '';

  // ✅ Parse key-value rows
  rows.forEach(row => {
    const cells = row.children;

    const key = cells[0]?.textContent.trim().toLowerCase();
    const valueHTML = cells[1]?.innerHTML;
    const valueText = cells[1]?.textContent;

    if (key === 'background') bgImage = valueHTML;
    if (key === 'title') title = valueText;
    if (key === 'subtitle') subtitle = valueText;
    if (key === 'features') features = valueText;
    if (key === 'cta') cta = valueText;
  });

  // ✅ Build wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'hero-wrapper';

  // ✅ Background
  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  bg.innerHTML = bgImage;

  // ✅ optimize image
  bg.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture')?.replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }])
    );
  });

  // ✅ Content
  const content = document.createElement('div');
  content.className = 'hero-content';

  const ctas = cta.split('/').map(c => c.trim()).filter(Boolean);

  const ctaHTML = ctas
    .map(text => `<a href="#">${text}</a>`)
    .join('');

  content.innerHTML = `
    <h1>${title}</h1>
    <p>${subtitle}</p>
    <div class="hero-features">${features}</div>
    <div class="hero-cta">${ctaHTML}</div>
  `;

  wrapper.append(bg, content);

  // ✅ replace block
  block.replaceChildren(wrapper);
}
