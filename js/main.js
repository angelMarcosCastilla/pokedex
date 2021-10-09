const ctx = document.getElementById('myChart').getContext('2d');
const  myChart = new Chart(ctx, {
  type: "radar",
  data:{
    "labels": [
      "Hp",
      "attack",
      "defense",
      "speed"
    ],
    
    "datasets": [{
      "backgroundColor": "#ffffff",
      "data": [
        "80",
        "90",
        "50",
        "70"
      ],
    }]
  }
  
})
