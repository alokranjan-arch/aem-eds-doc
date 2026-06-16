import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  let image = '';
  let title = '';
  let tagline = '';
  let description = '';
  let cta = '';

  rows.forEach((row) => {
    const cells = row.children;
    if (cells.length < 2) return;

    const key = cells[0]?.textContent.trim().toLowerCase();
    const valueHTML = cells[1]?.innerHTML;
    const valueText = cells[1]?.textContent.trim();

    if (key === 'image') image = valueHTML;
    if (key === 'title') title = valueText;
    if (key === 'tagline') tagline = valueText;
    if (key === 'description') description = valueText;
    if (key === 'cta') cta = valueText;
  });

  const ctas = cta.split('/').map(c => c.trim()).filter(Boolean);

  const ctaHTML = ctas
    .map(text => `<a href="#">${text}</a>`)
    .join('');

  const wrapper = document.createElement('div');
  wrapper.className = 'featured-wrapper';

  wrapper.innerHTML = `
    <div class="featured-bg">
      ${image}
      <div class="featured-content">
        <h2>${title}</h2>
        <div class="featured-tagline">${tagline}</div>
        <div class="featured-desc">${description}</div>
        <div class="featured-cta">${ctaHTML}</div>
      </div>
    </div>
  `;

  // ✅ image optimize
  wrapper.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }])
    );
  });

  // ✅ IMPORTANT FIX
  block.innerHTML = '';
  block.appendChild(wrapper);
}
