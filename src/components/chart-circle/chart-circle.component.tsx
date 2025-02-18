import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    datasets: [
        {
            // Данные которые будут в секторах (последний, просто пустой цвет такой)
            data: [15, 25, 8, 5, 1, 15, 7, 24, 50],
            // Относительно данных в массиве будеут раскрашены сектора (последний указан как пример пустого)
            backgroundColor: [
                '#5B39F4',
                '#5B39F4',
                '#5B39F4',
                '#5B39F4',
                '#5B39F4',
                '#FFA940',
                '#FFA940',
                '#11D5B6',
                '#5B39F41A', // TODO: replace to rgba
            ],
            // Отступы между секторами
            borderWidth: 2,
        },
    ],
};

// Опции для чарта, указывается в % сколько внутри будет пустоты
const options = {
    cutout: '75%',
};

interface ChartCircleProps {
    className?: string;
}

export const ChartCircle = ({ className = '' }: ChartCircleProps) => {
    return (
        <div className={className}>
            <Doughnut data={data} options={options}></Doughnut>;
        </div>
    );
};
