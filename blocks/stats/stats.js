export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-wrapper';

  const rows = [...block.children];

  // ✅ skip header row if present
  rows.slice(1).forEach(row => {
    const cells = row.children;

    const label = cells[0]?.textContent.trim();
    const value = cells[1]?.textContent.trim();

    const card = document.createElement('div');
    card.className = 'stat-card';

    card.innerHTML = `
      <h2>${value}</h2>
      <p>${label}</p>
    `;

    wrapper.append(card);
  });

  block.replaceChildren(wrapper);
}
