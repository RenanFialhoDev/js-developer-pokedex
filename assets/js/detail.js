const body = document.getElementById('body');
const backButton = document.getElementById('backButton');
const container = document.getElementById('container');
const searchQueryParams = new URLSearchParams(window.location.search);
const pokemonId = searchQueryParams.get('pokemon');

function changeBodyBackground(pokemonType) {
    body.className = pokemonType;
}

function showPokemonInfoDetail(pokemon) {
    return `
    <div class="detail">
        <div class="types">
            ${pokemon.types.map((type) => `<div class="type ${type}">${type}</div>`).join('')}
        </div>
    </div>

    <div class="description">
        <span class="name">${pokemon.name}</span>
        <span class="number">#${pokemon.number}</span>       
    </div>

    <img src="${pokemon.photo}" alt="${pokemon.name}">

    <div class="stats">
        ${pokemon.stats.map((stat) => `
            <div class="stat">
                <span class="value">${stat.points}</span>
                <span class="attribute">${stat.name}</span>
            </div>
        `).join('')}
    </div>
    `
}


function loadPokemonDetail() {
    pokeApi.getPokemonById(pokemonId).then((pokemon) => {
        const pokeInfoHtml = showPokemonInfoDetail(pokemon);
        container.innerHTML += pokeInfoHtml;
        changeBodyBackground(pokemon.type);
    });
}

backButton.addEventListener('click', () => {
    window.history.back();
});

loadPokemonDetail();