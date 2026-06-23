export default async function decorate(block) {
  try {
    // ✅ Step 1: Read API URL from authoring
    const apiUrl = block.textContent.trim();

    block.innerHTML = "<p>Loading games...</p>";

    // ✅ Step 2: Fetch API
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('API DATA:', data); // ✅ debug (VERY IMPORTANT)

    // ✅ Step 3: Detect structure (array or object)
    const games = Array.isArray(data) ? data : data.games || data.data || [];

    // ✅ Step 4: Render UI
    block.innerHTML = `
      <div class="game-grid">
        ${games.map(game => `
          <div class="game-card">
            <img src="${game.image || 'https://via.placeholder.com/300'}" />

            <div class="content">
              <h3>${game.title || 'No Title'}</h3>

              <p class="genre">${game.genre || 'Unknown'}</p>

              <div class="meta">
                <span>⭐ ${game.rating || 'N/A'}</span>
                <span>${game.players || ''}</span>
              </div>

              <p class="desc">${game.description || ''}</p>

              <a href="${game.link || '#'}" class="cta">
                ${game.cta || 'Play Now'}
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error(error);
    block.innerHTML = "<p>Failed to load API data</p>";
  }
}
