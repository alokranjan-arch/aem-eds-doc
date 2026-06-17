import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footMeta = getMetadata('foot');

  const footPath = footMeta
    ? new URL(footMeta, window.location).pathname
    : '/foot';

  const fragment = await loadFragment(footPath);

  block.textContent = '';

  const foot = document.createElement('div');
  foot.className = 'foot';   // ✅ use foot, not footer

  while (fragment.firstElementChild) {
    foot.append(fragment.firstElementChild);
  }

  block.append(foot);
}
