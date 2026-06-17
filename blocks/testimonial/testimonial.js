export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'testimonials-wrapper';

  rows.slice(1).forEach((row) => {
    const cells = [...row.children];

    const quote = cells[0]?.textContent.trim();
    const source = cells[1]?.textContent.trim();

    if (!quote || !source) return;

    const card = document.createElement('div');
    card.className = 'testimonial-card';

    const quoteEl = document.createElement('p');
    quoteEl.className = 'testimonial-quote';
    quoteEl.textContent = quote;

    const sourceEl = document.createElement('span');
    sourceEl.className = 'testimonial-source';
    sourceEl.textContent = `— ${source}`;

    card.append(quoteEl, sourceEl);
    wrapper.appendChild(card);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
