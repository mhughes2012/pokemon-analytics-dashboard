import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { transformStatsComparison } from '../../utils/dataTransformers';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const StatsComparisonChart = ({ data }) => {
    const chartData = transformStatsComparison(data);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Attack vs Defense: Legendary vs Regular Pokémon',
                font: {
                    size: 18,
                    weight: 'bold'
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const point = context.raw;
                        return [
                            `Name: ${point.name}`,
                            `Attack: ${point.x}`,
                            `Defense: ${point.y}`,
                            `Type: ${point.isLegendary ? 'Legendary' : 'Regular'}`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Attack'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Defense'
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <Scatter data={chartData} options={options} />
        </div>
    );
};

export default StatsComparisonChart;