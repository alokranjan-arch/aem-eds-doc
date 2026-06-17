export default function decorate(block) {
  // get all rows
  const rows = [...block.children];

  let brand = '';
  let links = '';

  rows.forEach((row) => {
    const cells = row.children;
    if (cells.length < 2) return;

    const key = cells[0]?.textContent.trim().toLowerCase();
    const valueHTML = cells[1]?.innerHTML;

    if (key === 'brand') brand = valueHTML;
    if (key === 'links') links = valueHTML;
  });

  // ✅ create wrapper
  const nav = document.createElement('div');
  nav.className = 'nav-wrapper';

  // ✅ brand
  const brandDiv = document.createElement('div');
  brandDiv.className = 'nav-brand';
  brandDiv.innerHTML = brand || 'Titan Gaming';

  // ✅ links container
  const linksDiv = document.createElement('div');
  linksDiv.className = 'nav-links';
  linksDiv.innerHTML = links;

  // ✅ mobile toggle
  const toggle = document.createElement('div');
  toggle.className = 'nav-toggle';
  toggle.innerHTML = '&#9776;'; // hamburger icon

  toggle.addEventListener('click', () => {
    linksDiv.classList.toggle('active');
  });

  // ✅ append
  nav.append(brandDiv, toggle, linksDiv);

  // ✅ replace block content
  block.textContent = '';
  block.appendChild(nav);
}
