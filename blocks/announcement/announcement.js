export default function decorate(block) {
  const rows = [...block.children];

  let message = '';
  let highlight = '';

  // ✅ parse key-value rows
  rows.forEach((row) => {
    const cells = row.children;

    if (cells.length < 2) return;

    const key = cells[0]?.textContent.trim().toLowerCase();
    const value = cells[1]?.textContent.trim();

    if (!key || !value) return;

    if (key === 'message') message = value;
    if (key === 'highlight') highlight = value;
  });

  // ✅ build UI
  const wrapper = document.createElement('div');
  wrapper.className = 'announcement-wrapper';

  wrapper.innerHTML = `
    <div class="announcement-message">${message}</div>
    <div class="announcement-highlight">${highlight}</div>
  `;

  block.replaceChildren(wrapper);
}
