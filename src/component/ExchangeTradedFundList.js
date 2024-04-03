import {useEffect, useState} from "react";
import isNull from "../mixin/global/isNull";
import api from "../api/api";
import priceFormatter from "../mixin/global/priceFormatter";
import ExchangeTradedFund from "./ExchangeTradedFund";

export default function () {
    const [exchangeTradedFunds, setExchangeTradedFund] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setExchangeTradedFund((await api.pagination.getExchangeTradedFunds()));
    }

    if (isNull(exchangeTradedFunds)) return null;

    if (!isNull(selected)) return <ExchangeTradedFund key={selected} id={selected}/>;

    return (
        <>
            {
                exchangeTradedFunds.data.map(exchangeTradedFund => (
                    <div
                        key={exchangeTradedFund.exchange_traded_fund_id}
                        className="border-b grid grid-cols-4 mt-5 w-11/12 mx-auto cursor-pointer hover:font-bold"
                        onClick={() => setSelected(exchangeTradedFund.exchange_traded_fund_id)}
                    >
                        <div className="col-span-1">
                            {exchangeTradedFund.exchange_traded_fund_public_name}
                        </div>
                        <div className="col-span-1">
                            {priceFormatter(exchangeTradedFund.exchange_traded_fund_amount)} €
                        </div>
                        <div className="col-span-1">
                            {exchangeTradedFund.country_distribution_number} country distribution provided
                            ({priceFormatter(exchangeTradedFund.country_distribution_total === null ? 0 : exchangeTradedFund.country_distribution_total)} %)
                        </div>
                        <div className="col-span-1">
                            {exchangeTradedFund.sector_distribution_number} sector distribution provided
                            ({priceFormatter(exchangeTradedFund.sector_distribution_total === null ? 0 : exchangeTradedFund.sector_distribution_total)} %)
                        </div>
                    </div>
                ))
            }
        </>
    )
}