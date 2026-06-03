document.addEventListener('DOMContentLoaded', () => {
  var graph = document.getElementById('graph').getContext('2d');

  var myChart = new Chart(graph, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Progress',
        data: [5, 10, 8, 20, 6, 3, 10],
        backgroundColor: [
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
          
        borderColor: [
          'rgb(212, 229, 240)',
          'rgb(212, 229, 240)',
          'rgb(212, 229, 240)',
          'rgb(212, 229, 240)',
          'rgb(212, 229, 240)',
          'rgb(212, 229, 240)'
        ],
        borderWidth: 0.5
      }]
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)' 
          },
          title: {
            display: true,
            text: 'Progress Value',
            color: 'white'
          }
        },
        x: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          title: {
            display: true,
            text: 'Categories',
            color: 'white'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white' 
          }
        }
      }
    }
  });
});