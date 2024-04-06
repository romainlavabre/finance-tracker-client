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
import priceFormatter from "../../mixin/global/priceFormatter";

export default function () {
    const [pastPermormance, setPastPermormance] = useState(null);
    const [average, setAverage] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if (isNull(pastPermormance)) return;

        let total = 0;

        pastPermormance.forEach(pp => total += pp.weight);

        const avg = [];

        pastPermormance.forEach(pp => avg.push(total / pastPermormance.length));

        setAverage(avg);
    }, [pastPermormance]);

    const fetch = async () => {
        setPastPermormance((await api.statistic.pastPerformance()));
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

    if (isNull(pastPermormance) || isNull(average)) return null;

    console.log(average)
    return (
        <div className="relative bg-default h-full text-center rounded py-2">
            <div className="">
                <Chart
                    data={{
                        labels: pastPermormance.sort((a, b) => a.year - b.year).map(cd => cd.year),
                        datasets: [
                            {
                                type: "line",
                                data: pastPermormance.sort((a, b) => a.year - b.year).map(rd => rd.weight),
                                borderColor: "#2563eb",
                                tension: 0.3,
                                hoverOffset: 4,
                            },
                            {
                                type: "line",
                                data: average,
                                borderColor: "#dc2626",
                                hoverOffset: 4,
                                label: "Average",
                                showLine: true,
                                showPoint: false,
                                order: 1
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
                                    return priceFormatter(data) + " %";
                                },
                                font: {
                                    weight: 'bold'
                                },
                            },
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 40,
                                bottom: 20
                            }
                        }
                    }}
                />
            </div>
            <h1 className="absolute bottom-0 w-full">Annually Yield (Dist)</h1>
        </div>
    );
}