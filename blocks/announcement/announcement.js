export default function decorate(block) {
  const rows = [...block.children];

  let message = '';
  let highlight = '';

  rows.forEach((row) => {
    const cells = row.children;

    if (cells.length < 2) return;

    const key = cells[0]?.textContent.trim().toLowerCase();
    const value = cells[1]?.textContent.trim();

    if (!value) return;

    if (key === 'message') message = value;
    if (key === 'highlight') highlight = value;
  });

  
  const wrapper = document.createElement('div');
  wrapper.className = 'announcement-wrapper';

  wrapper.innerHTML = `
    <div class="announcement-content">
      <span class="announcement-message">${message}</span>
      <span class="announcement-separator">|</span>
      <span class="announcement-highlight">${highlight}</span>
    </div>
  `;

  block.replaceChildren(wrapper);
}
