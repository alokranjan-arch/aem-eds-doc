export default async function decorate(block) {
  try {
    const apiUrl = block.textContent.trim();
    block.innerHTML = "<p>Loading games...</p>";

    const response = await fetch(apiUrl);
    const data = await response.json();
    const games = Array.isArray(data) ? data : data.games || [];

    block.innerHTML = `
      <div class="game-grid">
        ${games.map((game) => `
          <div class="game-card">
            <img src="${game.image || `https://picsum.photos/400/200?random=${game.id || Math.random()}`}" alt="${game.title}" />

            <div class="content">
              <h3>${game.title || ''}</h3>
              <p class="genre">${game.genre || ''}</p>

              <div class="meta">
                <span>⭐ ${game.rating || 'N/A'}</span>
                <span>${game.players || ''}</span>
              </div>

              <p class="desc">${game.description || ''}</p>

              <p class="extra">${game.platforms ? game.platforms.join(', ') : ''}</p>
              <p class="extra">${game.releaseDate || ''}</p>

              <div class="cta-container">
  ${game.link || '#'}
    ${game.cta || 'Play Now'}
  </a>
</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (e) {
    block.innerHTML = "<p>Failed to load data</p>";
  }
}
