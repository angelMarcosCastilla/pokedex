import colors from "./colorConfig.js"
import paintChartPokemon from "./paintChartPokemon.js"
const $form = document.getElementById("form");
const $imagen = document.getElementById("imagen");
const $description = document.getElementById("description");
const $container = document.getElementById("container");
const $name = document.getElementById("name")



const paintPokemon = ({ image, stats, types,name }) => {
  const color = colors[types[0].type.name] || colors.default;
  const statsName = stats
    .map(({ stat }) => stat.name)
    .filter((stat) => !stat.includes("special"));

  const baseStat = stats
    .filter(({ stat }) => !stat.name.includes("special"))
    .map(({ base_stat }) => base_stat);

  $description.innerHTML = "";
  $imagen.setAttribute("src", image);
  types.forEach(({ type }) => {
    $description.innerHTML += ` <span class="pokemon-types">${type.name}</span>`;
  });
  document.body.style.backgroundColor = `${color}20`;
  $container.style.backgroundColor = `${color}70`;
  $name.textContent = name

  paintChartPokemon({ statsName, baseStat, color });
};

const getPokemon = (searchPokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
    .then((res) => res.json())
    .then((pokemon) => {
      const { stats, sprites, types, forms} = pokemon;
      const name = forms[0].name
      const image = sprites.other.dream_world.front_default;
      paintPokemon({ image, stats, types,name });
    });
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const $search = e.target["search"].value;
  if ($search !== "") {
    getPokemon($search);
  }
});

paintChartPokemon();
