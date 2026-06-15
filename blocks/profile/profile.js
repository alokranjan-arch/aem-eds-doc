import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  const rows = [...block.children];

  for (let i = 0; i < rows.length; i += 2) {
    const li = document.createElement('li');

    const firstRow = rows[i].children;
    const secondRow = rows[i + 1]?.children;

    const image = firstRow[0]?.innerHTML;
    const name = firstRow[1]?.textContent;

    const role = secondRow?.[0]?.textContent || '';
    const location = secondRow?.[1]?.textContent || '';

    li.innerHTML = `
      <div class="profile-card">
        <div class="profile-img">${image}</div>
        <h2>${name}</h2>
        <p class="role">${role}</p>
        <p class="location">${location}</p>
      </div>
    `;

    ul.append(li);
  }

  // optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }])
    );
  });

  block.replaceChildren(ul);
}
