import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footMeta = getMetadata('foot');

  const footPath = footMeta
    ? new URL(footMeta, window.location).pathname
    : '/foot';

  const fragment = await loadFragment(footPath);

  if (!fragment) return;

  const rows = [...fragment.querySelectorAll(':scope > div > div')];

  const wrapper = document.createElement('div');
  wrapper.className = 'foot';

  const container = document.createElement('div');
  container.className = 'foot-container';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const title = cells[0].textContent.trim();
    const linksText = cells[1].textContent.trim();

    const col = document.createElement('div');
    col.className = 'foot-col';

    const heading = document.createElement('div');
    heading.className = 'foot-title';
    heading.textContent = title;

    const list = document.createElement('div');
    list.className = 'foot-links';

    linksText.split(',').forEach((l) => {
      const a = document.createElement('a');
      a.className = 'foot-link';
      a.textContent = l.trim();
      a.href = '#';
      list.appendChild(a);
    });

    col.append(heading, list);
    container.appendChild(col);
  });

  wrapper.appendChild(container);

  block.innerHTML = '';
  block.appendChild(wrapper);
}
