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

    // ✅ Treat full text as ONE string
    const parts = text.split('|').map(t => t.trim());

    const title = parts[0];
    const cta = parts[1] || '';

    const card = document.createElement('div');
    card.className = 'carousel-card';

    card.innerHTML = `
      <div class="carousel-img">${imageHTML}</div>
      <div class="carousel-content">
        <h3>${title}</h3>
        ${cta ? `<span class="carousel-cta">${cta}</span>` : ''}
      </div>
    `;

    // ✅ image optimization
    card.querySelectorAll('picture > img').forEach((img) => {
      img.closest('picture').replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }])
      );
    });

    track.appendChild(card);
  });

  wrapper.append(track);
  block.replaceChildren(wrapper);

  // ✅ AUTO SLIDE (2 visible at once)
  let index = 0;
  const cards = track.children;
  const total = cards.length;

  setInterval(() => {
    index++;

    // loop properly for 3 items showing 2
    if (index > total - 2) {
      index = 0;
    }

    const offset = index * 320; // card width + gap
    track.style.transform = `translateX(-${offset}px)`;
  }, 3000);
}
