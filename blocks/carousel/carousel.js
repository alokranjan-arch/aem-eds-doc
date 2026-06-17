export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

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

  const cardsPerView = () => window.innerWidth <= 768 ? 1 : 2;
  let index = 0;

  function totalSlides() {
    return Math.ceil(items.length / cardsPerView());
  }

  function move() {
    const perView = cardsPerView();
    const shift = (index * 100);
    track.style.transform = `translateX(-${shift}%)`;
    updateDots();
  }

  // arrows
  const prev = document.createElement('button');
  const next = document.createElement('button');

  prev.className = 'carousel-arrow carousel-prev';
  next.className = 'carousel-arrow carousel-next';

  prev.innerHTML = '‹';
  next.innerHTML = '›';

  function nextSlide() {
    index = (index + 1) % totalSlides();
    move();
  }

  function prevSlide() {
    index = (index - 1 + totalSlides()) % totalSlides();
    move();
  }

  next.onclick = nextSlide;
  prev.onclick = prevSlide;

  // dots
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';

  function renderDots() {
    dots.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot';
      if (i === index) dot.classList.add('active');

      dot.onclick = () => {
        index = i;
        move();
      };

      dots.appendChild(dot);
    }
  }

  function updateDots() {
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  // structure
  viewport.appendChild(track);
  wrapper.append(prev, viewport, next, dots);
  block.replaceChildren(wrapper);

  renderDots();
  move();

  window.addEventListener('resize', () => {
    index = 0;
    renderDots();
    move();
  });

  // autoplay
  setInterval(nextSlide, 3500);
}
