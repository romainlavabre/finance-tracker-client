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
import {useSelector} from "react-redux";
import SelectSearch2 from "../util/form/SelectSearch2";
import useApi from "../../api/useApi";

export default function () {
    const {findAll, findAllBy} = useApi();
    const [pastPermormance, setPastPermormance] = useState(null);
    const exchangeTradedFunds = useSelector(state => state.api.exchange_traded_funds?.values?.filter(etf => !isNull(etf)));
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        findAll("exchange_traded_funds");
        fetch();
    }, []);

    useEffect(() => {
        if (isNull(pastPermormance)) return;

        setDatasets([
            {
                type: "line",
                data: pastPermormance?.sort((a, b) => a.year - b.year).map(rd => rd.weight),
                borderColor: "#2563eb",
                tension: 0.3,
                hoverOffset: 4,
                label: "My performance"
            }
        ]);
    }, [pastPermormance]);

    const fetch = async () => {
        setPastPermormance((await api.statistic.pastPerformance()));
    }

    const change = async data => {
        const colors = [
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
        ];

        const result = [
            {
                type: "bar",
                data: pastPermormance?.sort((a, b) => a.year - b.year).map(rd => rd.weight),
                backgroundColor: "#2563eb",
                tension: 0.3,
                hoverOffset: 4,
                label: "My performance"
            }
        ];

        for (let i = 0; i < data.length; i++) {
            const annuallyYields = await findAllBy("annually_yields", "exchange_traded_fund_id", data[i]);
            const datum = [];

            for (let j = 0; j < pastPermormance.length; j++) {
                const annuallyYield = annuallyYields.find(ay => ay.year === pastPermormance.sort((a, b) => a.year - b.year)[j].year);
                let performance = 0;

                if (!isNull(annuallyYield)) {
                    performance = annuallyYield.yield;
                }

                datum.push(performance);
            }

            result.push({
                type: "bar",
                data: datum,
                backgroundColor: colors[i],
                tension: 0.3,
                hoverOffset: 4,
                label: exchangeTradedFunds.find(etf => etf.id === data[i]).public_name
            })
        }

        setDatasets(result);
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

    if (isNull(pastPermormance) || isNull(exchangeTradedFunds)) return null;

    return (
        <div className="relative h-full text-center">
            <div className="mt-2 w-10/12 mx-auto">
                <div>
                    <SelectSearch2
                        items={exchangeTradedFunds}
                        index={"id"}
                        value={"public_name"}
                        defaultValue={null}
                        onChange={change}
                        multiple={true}
                    />
                </div>
            </div>
            <div className="">
                <Chart
                    key={datasets.length}
                    data={{
                        labels: pastPermormance.sort((a, b) => a.year - b.year).map(cd => cd.year),
                        datasets: datasets
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: true,
                            datalabels: {
                                color: "white",
                                anchor: 'end',
                                align: 'end',
                                formatter: (data, ctx) => {
                                    return null;
                                },
                                font: {
                                    weight: 'bold'
                                },
                            },
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 30,
                                top: 20,
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