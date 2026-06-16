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

  // ✅ Clone first 2 cards → seamless loop
  track.append(
    items[0].cloneNode(true),
    items[1].cloneNode(true)
  );

  wrapper.append(track);

  // ✅ ARROWS
  const prev = document.createElement('button');
  const next = document.createElement('button');

  prev.className = 'carousel-arrow carousel-prev';
  next.className = 'carousel-arrow carousel-next';

  prev.innerHTML = '‹';
  next.innerHTML = '›';

  wrapper.append(prev, next);

  // ✅ DOTS
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';

  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    if (i === 0) dot.classList.add('active');

    dot.onclick = () => {
      index = i;
      move();
    };

    dots.append(dot);
  });

  wrapper.append(dots);

  block.replaceChildren(wrapper);

  let index = 0;
  const total = items.length;

  function updateDots() {
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index % total);
    });
  }

  function move() {
    track.style.transform = `translateX(-${index * 50}%)`;
    updateDots();
  }

  function nextSlide() {
    index++;
    track.style.transition = '0.5s ease';
    move();

    // ✅ seamless reset
    if (index === total) {
      setTimeout(() => {
        track.style.transition = 'none';
        index = 0;
        move();
      }, 500);
    }
  }

  function prevSlide() {
    if (index === 0) {
      track.style.transition = 'none';
      index = total;
      move();

      setTimeout(() => {
        track.style.transition = '0.5s ease';
        index--;
        move();
      }, 20);
    } else {
      index--;
      move();
    }
  }

  next.onclick = nextSlide;
  prev.onclick = prevSlide;

  // ✅ autoplay
  setInterval(nextSlide, 3000);
}
