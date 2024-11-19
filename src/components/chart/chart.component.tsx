import { Line } from 'react-chartjs-2';
import css from './chart.module.css';
import { ChartControl } from './control/control.component';

const dataStruct = {
    labels: ['', '', '', '', '', ''],
    datasets: [
        {
            label: 'Total Value',
            data: [10, 20, 50, 100, 60, 90],
            borderColor: '#5B39F4',
            backgroundColor: 'rgba(91, 57, 244, 0.7)',
            tension: 0,
            pointRadius: 8,
            pointHoverRadius: 10,
        },
    ],
};

const DEFAULT_OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    scales: {
        x: {
            display: false,
            ticks: {
                display: false,
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },
        y: {
            display: false,
            ticks: {
                display: false,
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },
    },
};

interface ChartProps {
    data: Array<number>;
    dateRange: {
        from: string;
        to: string;
    };
    controlOnClick: (id: number) => void;
}
export const Chart = ({ data, dateRange, controlOnClick }: ChartProps) => {
    const currentData = {
        labels: data.map(() => ''),
        datasets: [
            {
                ...dataStruct.datasets[0],
                data,
            },
        ],
    };

    return (
        <>
            <Line data={currentData} options={DEFAULT_OPTIONS} />
            <div className={css.dateRange}>
                <span>{dateRange.from}</span>
                <span>{dateRange.to}</span>
            </div>
            <ChartControl controlOnClick={controlOnClick} />
        </>
    );
};
