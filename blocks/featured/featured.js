import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  let image = '';
  let title = '';
  let tagline = '';
  let description = '';
  let cta = '';

  // ✅ parse table
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

  // ✅ build UI
  const wrapper = document.createElement('div');
  wrapper.className = 'featured-wrapper';

  const imageDiv = document.createElement('div');
  imageDiv.className = 'featured-image';
  imageDiv.innerHTML = image;

  // optimize image
  imageDiv.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '800' }])
    );
  });

  const contentDiv = document.createElement('div');
  contentDiv.className = 'featured-content';

  // ✅ split CTA into buttons
  const ctas = cta.split('/').map(c => c.trim());

  const ctaHTML = ctas
    .map(text => `<a href="#">${text}</a>`)
    .join('');

  contentDiv.innerHTML = `
    <h2>${title}</h2>
    <div class="featured-tagline">${tagline}</div>
    <div class="featured-desc">${description}</div>
    <div class="featured-cta">${ctaHTML}</div>
  `;

  wrapper.append(imageDiv, contentDiv);

  block.replaceChildren(wrapper);
}
