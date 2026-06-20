export default function decorate(block) {
  const rows = [...block.children];

  let brand = '';
  const linksArray = [];

  // ✅ Parse table
  rows.forEach((row) => {
    const cells = row.children;
    if (cells.length < 2) return;

    const key = cells[0].textContent.trim().toLowerCase();
    const value = cells[1].textContent.trim();

    if (key === 'brand') {
      brand = value;
    }

    if (key === 'links') {
      linksArray.push(value);
    }
  });

  // ✅ Wrapper
  const nav = document.createElement('div');
  nav.className = 'nav-wrapper';

  // ✅ Brand
  const brandDiv = document.createElement('div');
  brandDiv.className = 'nav-brand';
  brandDiv.textContent = brand || 'Titan Gaming';

  // ✅ ✅ NEW: Menu Toggle Button
  const toggle = document.createElement('div');
  toggle.className = 'menu-toggle';
  toggle.innerHTML = '&#9776;'; // ☰

  // ✅ Links container
  const linksDiv = document.createElement('div');
  linksDiv.className = 'nav-links';

  // ✅ Create links
  linksArray.forEach((row) => {
    const items = row.split('|').map(i => i.trim());

    items.forEach((text) => {
      if (!text) return;

      const a = document.createElement('a');
      a.href = '#';
      a.textContent = text;

      // ✅ Optional: close menu on click (mobile)
      a.addEventListener('click', () => {
        linksDiv.classList.remove('active');
      });

      linksDiv.appendChild(a);
    });
  });

  // ✅ ✅ Toggle logic
  toggle.addEventListener('click', () => {
    linksDiv.classList.toggle('active');

    // ✅ optional icon change ☰ ↔ ✖
    toggle.innerHTML = linksDiv.classList.contains('active') ? '✖' : '&#9776;';
  });

  // ✅ Append
  nav.append(brandDiv, toggle, linksDiv);

  // ✅ Replace block
  block.innerHTML = '';
  block.appendChild(nav);
}
