import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

const width = 600;
const height = 300;
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

export const generateActivityChartImage = async (dataPoints) => {
  const labels = dataPoints.map((point, i) => `T+${i} мин`);
  const keyboard = dataPoints.map(p => p.keyboard);
  const mouse = dataPoints.map(p => p.mouse);
  const idle = dataPoints.map(p => p.idle);

  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Keyboard',
          data: keyboard,
          borderColor: 'blue',
          fill: false
        },
        {
          label: 'Mouse',
          data: mouse,
          borderColor: 'green',
          fill: false
        },
        {
          label: 'Idle Time',
          data: idle,
          borderColor: 'red',
          fill: false
        }
      ]
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: 'Activity Timeline'
        }
      }
    }
  };

  return await chartJSNodeCanvas.renderToBuffer(configuration);
};
