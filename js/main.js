import colors from "./colorConfig.js";
import paintChartPokemon from "./paintChartPokemon.js";

const $form = document.getElementById("form");
const $imagen = document.getElementById("imagen");
const $description = document.getElementById("description");
const $container = document.getElementById("container");
const $name = document.getElementById("name");
const $loader = document.getElementById("loader");

const paintPokemon = ({ image, statsName, baseStat, types, name, color }) => {
  $description.innerHTML = "";
  $imagen.setAttribute("src", image);
  types.forEach(({ type }) => {
    $description.innerHTML += ` <span class="pokemon-types">${type.name}</span>`;
  });
  document.body.style.backgroundColor = `${color}20`;
  $container.style.backgroundColor = `${color}70`;
  $name.textContent = name;

  paintChartPokemon({ statsName, baseStat, color });
};

const getPokemon = (searchPokemon) => {
  $loader.classList.add("loader--active");

  fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((pokemon) => {
      $loader.classList.remove("loader--active");

      const { stats, sprites, types, forms } = pokemon;
      const color = colors[types[0].type.name] || colors.default;
      const name = forms[0].name;
      const image = sprites.other.dream_world.front_default;

      const statsName = stats
        .map(({ stat }) => stat.name)
        .filter((stat) => !stat.includes("special"));

      const baseStat = stats
        .filter(({ stat }) => !stat.name.includes("special"))
        .map(({ base_stat }) => base_stat);

      localStorage.setItem(
        "pokemonData",
        JSON.stringify({ image, statsName, baseStat, types, name, color })
      );

      paintPokemon({ image, statsName, baseStat, types, name, color });
    })
    .catch((error) => {
      console.log(error);
      $loader.classList.remove("loader--active");
      Swal.fire({
        title: "error",
        text: "El nombre o id, no pertenece a ningun pokemon",
        icon: "error",
      });
    });
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const $search = e.target["search"].value;
  if ($search !== "") {
    getPokemon($search);
    $form.reset();
  }
});

addEventListener("DOMContentLoaded", () => {
  paintChartPokemon();
  Swal.fire({
    imageUrl: "./assets/images/pokebolas.png",
    title: "Pokedex",
    text: "Debes buscar el pokemom por nombre o id",
    confirmButtonText: "entiendo",
  });

  if (localStorage.getItem("pokemonData")) {
    const data = JSON.parse(localStorage.getItem("pokemonData"));
    const { image, statsName, baseStat, types, name, color } = data;
    paintPokemon({ image, statsName, baseStat, types, name, color });
  }
});
