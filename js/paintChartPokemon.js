const ctx = document.getElementById("myChart").getContext("2d");
let myChart = null;

export default function paintChartPokemon({
  statsName = ["hp", "attack", "defense", "speed"],
  baseStat = ["20", "60", "10", "30"],
  color = "#010010",
} = {}){
  if (myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: statsName,
      datasets: [
        {
          label: "Habilidades",
          borderColor: color,
          backgroundColor: `${color}80`,
          data: baseStat,
        },
      ],
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          angleLines: {
            color: "white",
          },
          grid: {
            color: "white",
          },
          ticks: {
            color: "#010",
          },
          pointLabels: {
            color: "#010",
            font: {
              size: 16,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
};
