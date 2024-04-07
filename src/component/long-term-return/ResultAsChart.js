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
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Chart} from "react-chartjs-2";
import priceFormatter from "../../mixin/global/priceFormatter";

export default function ({result}) {
    if (isNull(result)) {
        return (
            <div>
                No data available
            </div>
        )
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

    return (
        <div className="relative bg-default h-full text-center rounded py-2">
            <div className="">
                <Chart
                    data={{
                        labels: result.map(r => r.year),
                        datasets: [
                            {
                                type: "line",
                                data: result.map(r => r.total),
                                borderColor: "#2563eb",
                                tension: 0.2,
                                hoverOffset: 4,
                                fill: true,
                                fillColor: "#2563eb",
                                backgroundColor: "rgba(37,99,235,0.04)",
                                fillOpacity: 0.8,
                            },
                            {
                                type: "line",
                                data: result.map(r => r.cumulativePayment),
                                borderColor: "#dc2626",
                                tension: 0.2,
                                hoverOffset: 4,
                                fill: true,
                                fillColor: "#dc2626",
                                backgroundColor: "rgba(220,38,38,0.06)",
                                fillOpacity: 0.8,
                            }
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
                                    return priceFormatter(data, true);
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