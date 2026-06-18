export default function decorate(block) {
  // ✅ Create inner container
  const inner = document.createElement('div');
  inner.className = 'foot-inner';

  // ✅ Process each row
  [...block.children].forEach((row) => {
    const title = row.children[0];
    const links = row.children[1];

    const col = document.createElement('div');
    col.className = 'col';

    // ✅ Title
    const h3 = document.createElement('h3');
    h3.textContent = title.textContent;

    // ✅ Link list
    const ul = document.createElement('ul');

    links.textContent.split(',').forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');

      const text = item.trim();
      a.textContent = text;

      // ✅ SEO-friendly URL
      const slug = text.toLowerCase().replace(/\s+/g, '-');
      a.href = `/${slug}`;

      li.appendChild(a);
      ul.appendChild(li);
    });

    col.appendChild(h3);
    col.appendChild(ul);

    inner.appendChild(col);
  });

  // ✅ Replace block content
  block.innerHTML = '';
  block.appendChild(inner);
}
