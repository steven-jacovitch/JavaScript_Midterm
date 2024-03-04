// Answer key solution is 10 lines (including lines to make the formatting nicer).
// @TODO: Make a fetch request to https://pokeapi.co/api/v2/pokemon-species
// @TODO: Get the names from the results, sort them alphabetically, and add them
//        to the page using tags+attributes that match the working example.
// @HINT: Use the browser developer tool to inspect the working example html
//        the tags + attributes of the html presenting the pokemon names.
// @HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort 

// working solution class for items: <div class="col col-sm-2 text-center border border-success p-2">beedrill</div>

const nameList = document.querySelector('#pokemon-name-list');

fetch('https://pokeapi.co/api/v2/pokemon-species')
  .then((response) => response.json())
  .then((data) => {
    const names = data.results.map((pokemon) => pokemon.name);
    names.sort();
    names.forEach((name) => {
      const pokeItem = document.createElement('div');
      pokeItem.classList.add('col', 'col-sm-2', 'text-center', 'border', 'border-success', 'p-2');
      pokeItem.innerHTML = name;
      nameList.appendChild(pokeItem);
    });
  });
