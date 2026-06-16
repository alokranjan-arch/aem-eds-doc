import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-wrapper';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  const rows = [...block.children];
  const items = [];

  // ✅ build cards
  rows.forEach((row) => {
    const cells = row.children;
    if (cells.length < 2) return;

    const image = cells[0].innerHTML;
    const text = cells[1].textContent.trim();

    if (!image || !text) return;

    const [title, cta] = text.split('|').map(t => t.trim());

    const el = document.createElement('div');
    el.className = 'carousel-card';

    el.innerHTML = `
      <div class="carousel-inner">
        <div class="carousel-img">${image}</div>
        <div class="carousel-content">
          <h3>${title}</h3>
          <div class="carousel-cta">${cta}</div>
        </div>
      </div>
    `;

    // optimize image
    el.querySelectorAll('picture > img').forEach(img => {
      img.closest('picture')?.replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }])
      );
    });

    track.appendChild(el);
    items.push(el);
  });

  // ✅ clone first items for looping (very important)
  const clone1 = items[0].cloneNode(true);
  const clone2 = items[1].cloneNode(true);
  track.append(clone1, clone2);

  wrapper.append(track);

  // ✅ arrows
  const prev = document.createElement('button');
  const next = document.createElement('button');
  prev.className = 'carousel-arrow carousel-prev';
  next.className = 'carousel-arrow carousel-next';
  prev.textContent = '<';
  next.textContent = '>';

  wrapper.append(prev, next);

  // ✅ dots
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';

  items.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'carousel-dot';
    if (i === 0) dot.classList.add('active');

    dot.onclick = () => goTo(i);

    dots.append(dot);
  });

  wrapper.append(dots);

  block.replaceChildren(wrapper);

  // ✅ logic
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 50}%)`;

    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index % items.length);
    });
  }

  function nextSlide() {
    index++;
    track.style.transition = '0.6s';
    update();

    if (index === items.length) {
      setTimeout(() => {
        track.style.transition = 'none';
        index = 0;
        update();
      }, 600);
    }
  }

  function prevSlide() {
    if (index === 0) index = items.length - 1;
    else index--;
    update();
  }

  function goTo(i) {
    index = i;
    update();
  }

  next.onclick = nextSlide;
  prev.onclick = prevSlide;

  // ✅ autoplay
  setInterval(nextSlide, 3000);
}
