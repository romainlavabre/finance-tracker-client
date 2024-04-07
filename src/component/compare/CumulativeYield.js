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
import {useSelector} from "react-redux";
import useApi from "../../api/useApi";
import SelectSearch2 from "../util/form/SelectSearch2";

export default function () {
    const {findAll, findOneBy} = useApi();
    const [cumulativeYield, setCumulativeYield] = useState(null);
    const exchangeTradedFunds = useSelector(state => state.api.exchange_traded_funds?.values?.filter(etf => !isNull(etf)));
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        findAll("exchange_traded_funds");
        fetch();
    }, []);

    useEffect(() => {
        if (isNull(cumulativeYield)) return;

        setDatasets([
            {
                type: "bar",
                data: [cumulativeYield.to_one_year, cumulativeYield.to_three_year, cumulativeYield.to_five_year, cumulativeYield.to_ten_year],
                backgroundColor: "#2563eb",
                hoverOffset: 4,
            },
        ]);
    }, [cumulativeYield]);

    const fetch = async () => {
        setCumulativeYield((await api.statistic.cumulativeYield()));
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
                data: [cumulativeYield.to_one_year, cumulativeYield.to_three_year, cumulativeYield.to_five_year, cumulativeYield.to_ten_year],
                backgroundColor: "#2563eb",
                hoverOffset: 4,
                label: "My performance"
            },
        ];

        for (let i = 0; i < data.length; i++) {
            const cumulativeYieldLocal = await findOneBy("cumulative_yields", "exchange_traded_fund_id", data[i]);

            result.push({
                type: "bar",
                data: [cumulativeYieldLocal.to_one_year, cumulativeYieldLocal.to_three_year, cumulativeYieldLocal.to_five_year, cumulativeYieldLocal.to_ten_year],
                backgroundColor: colors[i],
                hoverOffset: 4,
                label: exchangeTradedFunds.find(etf => etf.id === data[i]).public_name
            },)
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

    if (isNull(cumulativeYield) || isNull(exchangeTradedFunds)) return null;

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
                    data={{
                        labels: ["1Y", "3Y", "5Y", "10Y"],
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
                                formatter: data => {
                                    if (isNull(data)) return null;

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
                                top: 20,
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