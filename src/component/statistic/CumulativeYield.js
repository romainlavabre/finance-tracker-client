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
    const [cumulativeYield, setCumulativeYield] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setCumulativeYield((await api.statistic.cumulativeYield()));
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

    if (isNull(cumulativeYield)) return null;

    return (
        <div className="relative bg-default h-full text-center rounded py-2">
            <div className="">
                <Chart
                    data={{
                        labels: ["1Y", "3Y", "5Y", "10Y", "Since creation"],
                        datasets: [
                            {
                                type: "bar",
                                data: [cumulativeYield.to_one_year, cumulativeYield.to_three_year, cumulativeYield.to_five_year, cumulativeYield.to_ten_year, cumulativeYield.since_creation],
                                backgroundColor: "#2563eb",
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
            <h1 className="absolute bottom-0 w-full">Cumulative Yield (Acc)</h1>
        </div>
    );
}