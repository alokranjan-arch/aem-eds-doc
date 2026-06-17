export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'leaders-wrapper';

  rows.forEach((row, index) => {
    const cells = [...row.children];

    const name = cells[0]?.textContent.trim();
    const achievement = cells[1]?.textContent.trim();

    // skip header/empty rows
    if (!name || !achievement || name.toLowerCase() === 'player') return;

    const item = document.createElement('div');
    item.className = 'leader-item';

    const rank = document.createElement('div');
    rank.className = 'leader-rank';
    rank.textContent = String(index + 1).padStart(2, '0');

    const text = document.createElement('div');
    text.className = 'leader-text';

    const nameEl = document.createElement('div');
    nameEl.className = 'leader-name';
    nameEl.textContent = name;

    const achievementEl = document.createElement('div');
    achievementEl.className = 'leader-achievement';
    achievementEl.textContent = achievement;

    text.append(nameEl, achievementEl);
    item.append(rank, text);
    wrapper.appendChild(item);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
