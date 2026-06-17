export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'comparison-wrapper';

  rows.forEach((row, index) => {
    if (index === 0) return; // skip header row

    const cells = [...row.children];

    const feature = cells[0]?.textContent.trim();
    const detail = cells[1]?.textContent.trim();

    if (!feature || !detail) return;

    const featureDiv = document.createElement('div');
    featureDiv.className = 'comparison-feature';
    featureDiv.textContent = feature;

    const detailDiv = document.createElement('div');
    detailDiv.className = 'comparison-detail';
    detailDiv.textContent = detail;

    wrapper.append(featureDiv, detailDiv);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
