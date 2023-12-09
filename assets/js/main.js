const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 5
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="card" id="${pokemon.number}">
            <div class="pokemon ${pokemon.type}">
                <div class="img-container">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">                    
                </div>
            </div>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <div class="types">
                    ${pokemon.types.map((type) => `<div class="type ${type}">${type}</div>`).join('')}
                </div>

            </div>
        </li>
    `
}

function openPageDetails(id) {
    window.open(`poke-detail?pokemon=${id}`, '_self');
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
    .then(() => {
        const liElements = document.getElementsByTagName("li");
        const cardPressed = e => {
            openPageDetails(e.currentTarget.id);
        }
        for (let li of liElements) {
            li.addEventListener("click", cardPressed);
        }
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});

pokemonList.addEventListener('click', e => {

});