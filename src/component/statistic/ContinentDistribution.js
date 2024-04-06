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
    const [continentDistribution, setContinentDistribution] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setContinentDistribution((await api.statistic.continentDistribution()));
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

    if (isNull(continentDistribution)) return null;

    return (
        <div className="relative bg-default h-full text-center rounded py-2">
            <div className="mb-5">
                <Chart
                    data={{
                        labels: continentDistribution.map(cd => cd.continent),
                        datasets: [
                            {
                                type: "pie",
                                data: continentDistribution.map(rd => rd.weight),
                                borderColor: "none",
                                backgroundColor: [
                                    "#ca8a04",
                                    "#a21caf",
                                    "#16a34a",
                                    "#ea580c",
                                    "#db2777",
                                    "#65a30d",
                                    "#dc2626",
                                    "#059669",
                                    "#6d28d9",
                                    "#e11d48",
                                    "#0d9488",
                                    "#65a30d",
                                    "#475569"
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
                                formatter: (val, ctx) => (ctx.chart.data.labels[ctx.dataIndex]),
                                font: {
                                    weight: 'bold'
                                },
                            },
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 20,
                                bottom: 20
                            }
                        }
                    }}
                />
            </div>
            <h1 className="absolute bottom-0 w-full">Continent Distribution</h1>
        </div>
    );
}