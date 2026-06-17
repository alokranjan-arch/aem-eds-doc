export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'comparison-wrapper';

  rows.slice(1).forEach((row) => {
    const cells = [...row.children];

    const feature = cells[0]?.textContent.trim();
    const detail = cells[1]?.textContent.trim();

    if (!feature || !detail) return;

    const rowDiv = document.createElement('div');
    rowDiv.className = 'comparison-row';

    const featureDiv = document.createElement('div');
    featureDiv.className = 'comparison-feature';
    featureDiv.textContent = feature;

    const detailDiv = document.createElement('div');
    detailDiv.className = 'comparison-detail';
    detailDiv.textContent = detail;

    rowDiv.append(featureDiv, detailDiv);
    wrapper.appendChild(rowDiv);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
