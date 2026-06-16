import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'nav-wrapper';

  const rows = [...block.children];

  let brand = '';
  const links = [];

  // ✅ Parse rows (same pattern as profile)
  rows.forEach((row) => {
    const cells = row.children;

    const key = cells[0]?.textContent.trim().toLowerCase();

    if (key === 'brand') {
      brand = cells[1]?.textContent;
    }

    if (key === 'links') {
      for (let i = 1; i < cells.length; i++) {
        const text = cells[i]?.textContent.trim();
        if (text) links.push(text);
      }
    }
  });

  // ✅ Create structure
  const nav = document.createElement('div');
  nav.className = 'nav';

  const brandEl = document.createElement('div');
  brandEl.className = 'nav-brand';
  brandEl.textContent = brand;

  const linksWrapper = document.createElement('div');
  linksWrapper.className = 'nav-links';

  links.forEach((link) => {
    const a = document.createElement('a');
    a.textContent = link;
    a.href = '#'; // later map real URLs if needed
    linksWrapper.appendChild(a);
  });

  // ✅ Mobile toggle (interactive)
  const toggle = document.createElement('div');
  toggle.className = 'nav-toggle';
  toggle.textContent = '☰';

  toggle.addEventListener('click', () => {
    linksWrapper.classList.toggle('active');
  });

  // ✅ Build final DOM
  nav.appendChild(brandEl);
  nav.appendChild(toggle);
  nav.appendChild(linksWrapper);

  wrapper.append(nav);

  // ✅ Replace block (same as profile)
  block.replaceChildren(wrapper);
}
