import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = row.children;

    if (cells.length < 2) return;

    const imageHTML = cells[0]?.innerHTML;
    const text = cells[1]?.textContent.trim();

    if (!imageHTML || !text) return;

    // ✅ split text → title + CTA
    const [title, cta] = text.split('|').map(t => t.trim());

    const card = document.createElement('div');
    card.className = 'carousel-card';

    card.innerHTML = `
      <div class="carousel-img">${imageHTML}</div>
      <div class="carousel-content">
        <h3>${title}</h3>
        <a href="#" class="carousel-btn">${cta}</a>
      </div>
    `;

    // ✅ optimize images
    card.querySelectorAll('picture > img').forEach((img) => {
      img.closest('picture')?.replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }])
      );
    });

    track.appendChild(card);
  });

  wrapper.append(track);

  // ✅ replace block
  block.replaceChildren(wrapper);
}
