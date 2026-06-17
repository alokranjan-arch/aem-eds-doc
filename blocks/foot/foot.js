import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footMeta = getMetadata('foot');

  const footPath = footMeta
    ? new URL(footMeta, window.location).pathname
    : '/foot';

  const fragment = await loadFragment(footPath);

  // ✅ safety check
  if (!fragment || !fragment.firstElementChild) {
    console.warn('Foot fragment not loaded');
    return; // keep original content visible
  }

  const foot = document.createElement('div');
  foot.className = 'foot';

  while (fragment.firstElementChild) {
    foot.append(fragment.firstElementChild);
  }

  block.textContent = '';
  block.append(foot);
}
