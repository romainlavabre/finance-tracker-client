import {useEffect, useState} from "react";
import api from "../../api/api";
import isNull from "../../mixin/global/isNull";
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

    if (isNull(average)) return null;


    return (
        <div className="relative bg-default h-full text-center rounded">
            <div className="absolute w-full text-center top-[30%] text-3xl font-bold my-auto">
                <span
                    className="text-orange-600">{priceFormatter(average)} %</span>
            </div>

            <h1 className="absolute bottom-0 w-full">Target yield by year (Dist)</h1>
        </div>
    );
}