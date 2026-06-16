export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  const rows = [...block.children];
  const items = [];

  rows.forEach((row) => {
    const cells = row.children;
    if (cells.length < 2) return;

    const img = cells[0].innerHTML;
    const text = cells[1].textContent.trim();
    if (!img || !text) return;

    const [title, cta] = text.split('|').map(t => t.trim());

    const card = document.createElement('div');
    card.className = 'carousel-card';

    card.innerHTML = `
      <div class="carousel-inner">
        <div class="carousel-img">${img}</div>
        <div class="carousel-content">
          <h3>${title}</h3>
          <div class="carousel-cta">${cta}</div>
        </div>
      </div>
    `;

    track.appendChild(card);
    items.push(card);
  });

  // ✅ IMPORTANT: clone first 2 cards for perfect loop
  track.append(items[0].cloneNode(true), items[1].cloneNode(true));

  wrapper.append(track);
  block.replaceChildren(wrapper);

  let index = 0;
  const total = items.length;

  function goTo(i) {
    track.style.transform = `translateX(-${i * 50}%)`;
  }

  function next() {
    index++;
    track.style.transition = '0.5s ease';
    goTo(index);

    // ✅ smooth loop reset
    if (index === total) {
      setTimeout(() => {
        track.style.transition = 'none';
        index = 0;
        goTo(index);
      }, 500);
    }
  }

  // ✅ autoplay
  setInterval(next, 3000);
}
