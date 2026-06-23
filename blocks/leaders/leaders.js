export default function decorate(block) {
  const rows = [...block.children].slice(0, 3);

  const wrapper = document.createElement('div');
  wrapper.className = 'leaders-wrapper';

  rows.forEach((row, index) => {
    const cells = [...row.children];

    const name = cells[0]?.textContent.trim();
    const achievement = cells[1]?.textContent.trim();

    if (!name || !achievement || name.toLowerCase() === 'player') return;

    const item = document.createElement('div');
    item.className = `leader-item rank-${index + 1}`;

    item.innerHTML = `
      <div class="leader-rank">#${index + 1}</div>
      <div class="leader-name">${name}</div>
      <div class="leader-achievement">${achievement}</div>
    `;

    wrapper.appendChild(item);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
