export default function decorate(block) {
  const rows = [...block.children];

  let brand = '';
  const linksArray = [];

  // ✅ parse table
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

  // ✅ wrapper
  const nav = document.createElement('div');
  nav.className = 'nav-wrapper';

  // ✅ brand
  const brandDiv = document.createElement('div');
  brandDiv.className = 'nav-brand';
  brandDiv.textContent = brand || 'Titan Gaming';

  // ✅ links container
  const linksDiv = document.createElement('div');
  linksDiv.className = 'nav-links';

  // ✅ create links from all rows
  linksArray.forEach((row) => {
    const items = row.split('|').map(i => i.trim());

    items.forEach((text) => {
      if (!text) return;

      const a = document.createElement('a');
      a.href = '#';           // ✅ placeholder link
      a.textContent = text;

      linksDiv.appendChild(a);
    });
  });

  // ✅ append
  nav.append(brandDiv, linksDiv);

  // ✅ replace block
  block.innerHTML = '';
  block.appendChild(nav);
}
