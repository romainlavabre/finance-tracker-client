import {useEffect, useState} from "react";
import api from "../../api/api";
import isNull from "../../mixin/global/isNull";
import priceFormatter from "../../mixin/global/priceFormatter";

export default function () {
    const [averagePricing, setAveragePricing] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setAveragePricing((await api.statistic.averagePricing()));
    }

    if (isNull(averagePricing)) return null;

    return (
        <div className="relative bg-default h-full text-center rounded">
            <div className="absolute w-full text-center top-[30%] text-3xl font-bold my-auto">
                <span
                    className={`${averagePricing.average_pricing > 1 ? "text-red-600" : ""}${averagePricing.average_pricing < 0.5 ? "text-green-600" : "text-orange-600"}`}>{priceFormatter(averagePricing.average_pricing)} €</span>
            </div>

            <h1 className="absolute bottom-0 w-full">Average pricing</h1>
        </div>
    );
}