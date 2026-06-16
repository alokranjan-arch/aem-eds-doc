import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'cards-wrapper';

  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = row.children;

    if (cells.length < 2) return;

    const image = cells[0].innerHTML;
    const title = cells[1].textContent.trim();

    if (!image || !title) return;

    const card = document.createElement('div');
    card.className = 'card-item';

    card.innerHTML = `
      <div class="card-img">${image}</div>
      <div class="card-content">
        <h3>${title}</h3>
      </div>
    `;

    // optional image optimization
    card.querySelectorAll('picture > img').forEach((img) => {
      img.closest('picture')?.replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }])
      );
    });

    wrapper.appendChild(card);
  });

  block.replaceChildren(wrapper);
}
