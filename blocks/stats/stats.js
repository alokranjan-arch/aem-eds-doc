export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-wrapper';

  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = row.children;

    // ✅ Skip invalid rows
    if (cells.length < 2) return;

    const label = cells[0]?.textContent.trim().toLowerCase();
    const value = cells[1]?.textContent.trim();

    // ✅ Skip header row safely
    if (!label || !value || label === 'stats') return;

    const card = document.createElement('div');
    card.className = 'stat-card';

    card.innerHTML = `
      <h2>${value}</h2>
      <p>${label}</p>
    `;

    wrapper.appendChild(card);
  });

  block.replaceChildren(wrapper);
}
``
