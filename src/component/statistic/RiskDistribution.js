import {useEffect, useState} from "react";
import api from "../../api/api";
import isNull from "../../mixin/global/isNull";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    registerables,
    Tooltip
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from "react-chartjs-2";

export default function () {
    const [riskDistribution, setRiskDistribution] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setRiskDistribution((await api.statistic.riskDistribution()));
    }

    ChartJS.register(...registerables);
    ChartJS.register(CategoryScale);
    ChartJS.register(LinearScale);
    ChartJS.register(PointElement);
    ChartJS.register(LineElement);
    ChartJS.register(BarElement);
    ChartJS.register(ChartDataLabels);
    ChartJS.register(ArcElement);
    ChartJS.register(Legend);
    ChartJS.register(Tooltip);

    if (isNull(riskDistribution)) return null;

    return (
        <div className="relative bg-default h-full text-center rounded py-2">
            <div className="mb-5">
                <Chart
                    data={{
                        labels: riskDistribution.map(rd => rd.risk),
                        "legend": {"position": "right"},
                        "scales": {
                            "yAxes": [
                                {
                                    "beginAtZero": true,
                                    "ticks": {
                                        "autoSkip": false
                                    }
                                }
                            ]
                        },
                        datasets: [
                            {
                                type: "pie",
                                data: riskDistribution.map(rd => rd.weight),
                                borderColor: "none",
                                backgroundColor: [
                                    "#16a34a",
                                    "#ca8a04",
                                    "#ea580c",
                                    "#dc2626"
                                ],
                                hoverOffset: 4,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: false,
                            datalabels: {
                                color: "white",
                                anchor: 'end',
                                align: 'end',
                                formatter: data => {
                                    return riskDistribution.find(rd => rd.weight === data).risk;
                                },
                                font: {
                                    weight: 'bold'
                                },
                            },
                        },
                    }}
                />
            </div>
            <h1 className="absolute bottom-0 w-full">Risk Distribution</h1>
        </div>
    );
}