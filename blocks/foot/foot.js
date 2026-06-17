import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footMeta = getMetadata('foot');

  const footPath = footMeta
    ? new URL(footMeta, window.location).pathname
    : '/foot';

  const fragment = await loadFragment(footPath);

  if (!fragment || !fragment.children.length) {
    console.warn('Foot fragment not loaded');
    return;
  }

  const rows = [...fragment.querySelectorAll('div > div')];

  const container = document.createElement('div');
  container.className = 'foot-container';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const title = cells[0]?.textContent.trim();
    const linksText = cells[1]?.textContent.trim();

    if (!title || !linksText) return;

    const links = linksText.split(',').map((l) => l.trim());

    // column
    const col = document.createElement('div');
    col.className = 'foot-col';

    // heading
    const heading = document.createElement('div');
    heading.className = 'foot-title';
    heading.textContent = title;

    // links
    const list = document.createElement('div');
    list.className = 'foot-links';

    links.forEach((link) => {
      const item = document.createElement('a');
      item.textContent = link;
      item.href = '#'; // replace with real links later
      list.appendChild(item);
    });

    col.append(heading, list);
    container.appendChild(col);
  });

  const wrapper = document.createElement('div');
  wrapper.className = 'foot';
  wrapper.appendChild(container);

  block.textContent = '';
  block.appendChild(wrapper);
}
