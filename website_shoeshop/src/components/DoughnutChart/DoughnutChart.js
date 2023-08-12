import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart({ labels, dataChart, width, height }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: dataChart,
                backgroundColor: [
                    '#0e9f6e',
                    '#0694a2',
                    '#3f83f8',
                    '#ff5a1f',
                    '#e2ba48',
                ],
                borderColor: [
                    '#fff',
                    '#fff',
                    '#fff',
                    '#fff',
                    '#fff',
                ],
                borderWidth: 1,
            },
        ],
    };
    return <Doughnut
        data={data}
        redraw={true}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            weight: "2",
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        }}
    />;
}
