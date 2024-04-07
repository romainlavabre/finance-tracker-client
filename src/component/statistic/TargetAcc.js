import {useEffect, useState} from "react";
import api from "../../api/api";
import isNull from "../../mixin/global/isNull";
import priceFormatter from "../../mixin/global/priceFormatter";

export default function () {
    const [cumulativeYield, setCumulativeYield] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setCumulativeYield((await api.statistic.cumulativeYield()));
    }

    if (isNull(cumulativeYield)) return null;

    return (
        <div className="relative bg-default h-full text-center rounded">
            <div className="absolute w-full text-center top-[30%] text-3xl font-bold my-auto">
                <span
                    className="text-orange-600">{priceFormatter(cumulativeYield.to_ten_year / 10)} %</span>
            </div>

            <h1 className="absolute bottom-0 w-full">Target yield by year (Acc)</h1>
        </div>
    );
}