import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    const cols = [...li.children];

    // First row = image + name
    const imageCol = cols[0];
    const nameCol = cols[1];

    // Second row = role + location (next row comes automatically in loop)
    let role = '';
    let location = '';

    if (cols.length === 2 && row.nextElementSibling) {
      const nextCols = [...row.nextElementSibling.children];
      role = nextCols[0]?.textContent;
      location = nextCols[1]?.textContent;
    }

    li.innerHTML = `
      <div class="profile-card">
        <div class="profile-img">${imageCol.innerHTML}</div>
        <h2>${nameCol.textContent}</h2>
        <p class="role">${role}</p>
        <p class="location">${location}</p>
      </div>
    `;

    ul.append(li);
  });

  // Optimize images (same as your card logic ✅)
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }])
    );
  });

  block.replaceChildren(ul);
}
