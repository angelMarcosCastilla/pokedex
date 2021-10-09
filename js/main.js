const ctx = document.getElementById("myChart").getContext("2d");

const $form = document.getElementById("form");
const $imagen = document.getElementById("imagen");
const $description = document.getElementById("description");
let myChart = null;

const paintChartPokemon = ({ statsName , baseStat}) => {
  if (myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: statsName,
      datasets: [
        {
          label: "Habilidades",
          borderColor: "rgb(38,213,38)",
          backgroundColor: "rgba(38,213,38,.2)",
          data: baseStat,
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          angleLines: {
            color: "#718DABd",
          },
          grid: {
            color: "#718DAB",
          },
          ticks: {
            color: "black",
            backgroundColor: "none",
          },
          pointLabels: {
            color: "green",
            font: {
              size: 16,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

const paintPokemon = ({ image, stats, types }) => {
  $imagen.setAttribute("src", image);
  types.forEach(({ type }) => {
    $description.innerHTML += ` <span class="pokemon-types">${type.name}</span>`;
  });
  const statsName = stats
    .map(({ stat }) => stat.name)
    .filter((stat) => !stat.includes("special"));

    const baseStat = stats.map(({ stat }) => stat.base_stat)
    console.log(statsName);
  paintChartPokemon({ statsName , baseStat});
};

const getPokemon = (searchPokemon) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
    .then((res) => res.json())
    .then((pokemon) => {
      const { stats, sprites, types } = pokemon;
      const image = sprites.other.dream_world.front_default;
      paintPokemon({ image, stats, types });
    });
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const $search = e.target["search"].value;
  if ($search !== "") {
    getPokemon($search);
  }
});
