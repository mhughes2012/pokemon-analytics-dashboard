import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { transformTypeDistribution } from '../../utils/dataTransformers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TypeDistributionChart = ({ data }) => {
    const chartData = transformTypeDistribution(data);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Pokémon Type Distribution',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const percentage = ((context.parsed.y / data.length) * 100).toFixed(1);
                        return `${context.parsed.y} Pokémon (${percentage}%)`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Pokémon'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Pokémon Type'
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TypeDistributionChart;