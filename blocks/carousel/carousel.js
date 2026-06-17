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

  const total = items.length;

  // clones for seamless loop
  track.prepend(items[total - 1].cloneNode(true));
  track.append(items[0].cloneNode(true));

  let index = 1;

  const prev = document.createElement('button');
  const next = document.createElement('button');

  prev.className = 'carousel-arrow carousel-prev';
  next.className = 'carousel-arrow carousel-next';

  prev.innerHTML = '‹';
  next.innerHTML = '›';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';

  function updateDots() {
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === (index - 1 + total) % total);
    });
  }

  function move(withTransition = true) {
    track.style.transition = withTransition ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translateX(-${index * 50}%)`;
    updateDots();
  }

  function nextSlide() {
    index++;
    move(true);
  }

  function prevSlide() {
    index--;
    move(true);
  }

  track.addEventListener('transitionend', () => {

    if (index === 0) {
      index = total;
      requestAnimationFrame(() => move(false));
    }

    if (index === total + 1) {
      index = 1;
      requestAnimationFrame(() => move(false));
    }
  });

  // dots (per item)
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';

    if (i === 0) dot.classList.add('active');

    dot.onclick = () => {
      index = i + 1;
      move(true);
    };

    dots.append(dot);
  }

  next.onclick = nextSlide;
  prev.onclick = prevSlide;

  viewport.appendChild(track);
  wrapper.append(prev, viewport, next, dots);
  block.replaceChildren(wrapper);

  // initial position
  move(false);

  // autoplay (stable)
  let interval = setInterval(nextSlide, 3500);

  // pause on hover (premium behavior)
  wrapper.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });

  wrapper.addEventListener('mouseleave', () => {
    interval = setInterval(nextSlide, 3500);
  });
}
