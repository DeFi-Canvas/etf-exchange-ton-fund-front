
import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";


const FundChart = () => {
  const options: ApexOptions = {
    chart: {
      width: '100%',
      id: 'basic-line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 8,
        color: '#C280B8',
        opacity: 0.4
      }
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      colors: ['#D53F8C'],
      lineCap: 'round'
    },
    xaxis: {
      categories: ['', 'Jun 24', '', '', '', '', 'Oct 24', ''],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        rotate: 0,
        offsetX: 0,
        style: {
          colors: 'rgba(36, 38, 46, 0.70)',
          fontSize: '12px',
          fontFamily: 'DM Sans',
        }
      }
    },
    yaxis: {
      show: false,
      max: 45,

    },
    grid: {
      show: false
    },
    markers: {
      size: 2,
      colors: '#D53F8C',
      fillOpacity: 1,
      strokeWidth: 0,

      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 0,
          fillColor: '#F37FAD',
          strokeColor: '#F37FAD',
          size: 1.8
        },
        {
          seriesIndex: 0,
          dataPointIndex: 1,
          fillColor: '#F37FAE',
          strokeColor: '#F37FAE',
          size: 1.8
        },
        {
          seriesIndex: 0,
          dataPointIndex: 2,
          fillColor: '#EF75AA',
          strokeColor: '#EF75AA',
          size: 1.8
        },
        {
          seriesIndex: 0,
          dataPointIndex: 3,
          fillColor: '#EC6EA5',
          strokeColor: '#EC6EA5',
          size: 1.6
        },
        {
          seriesIndex: 0,
          dataPointIndex: 4,
          fillColor: '#E15E9B',
          strokeColor: '#E15E9B',
          size: 1.6
        },
        {
          seriesIndex: 0,
          dataPointIndex: 5,
          fillColor: '#DB4890',
          strokeColor: '#DB4890',
          size: 1.6
        },
        {
          seriesIndex: 0,
          dataPointIndex: 6,
          fillColor: '#D9428C',
          strokeColor: '#D9428C',
          size: 1.8
        },

      ]
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        gradientToColors: ['#F687B3'],
        stops: [0, 100]
      }
    },
    tooltip: {
      enabled: false
    },
  };

  const series = [
    {
      name: 'Activity',
      data: [10, 20, 15, 25, 20, 29, 40, 35]
    }
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      className={'funds-page--chart'}
    />
  );
};

export default FundChart;
