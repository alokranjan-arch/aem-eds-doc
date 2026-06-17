export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'faq-wrapper';

  rows.forEach((row) => {
    const cells = [...row.children];

    const question = cells[0]?.textContent.trim();
    const answer = cells[1]?.textContent.trim();

    // skip header or empty rows
    if (!question || !answer || question.toLowerCase() === 'question') return;

    const item = document.createElement('div');
    item.className = 'faq-item';

    const q = document.createElement('div');
    q.className = 'faq-question';
    q.textContent = question;

    const a = document.createElement('div');
    a.className = 'faq-answer';
    a.textContent = answer;

    q.addEventListener('click', () => {
      item.classList.toggle('active');
    });

    item.append(q, a);
    wrapper.appendChild(item);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);
}
