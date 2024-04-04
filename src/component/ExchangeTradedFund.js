import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useApi from "../api/useApi";
import isNull from "../mixin/global/isNull";
import ArrowLeftIcon from "./util/icon/ArrowLeftIcon";
import priceFormatter from "../mixin/global/priceFormatter";
import getRiskBadge from "../mixin/badge/getRiskBadge";
import Create from "./country/Create";
import CreateCountryDistribution from "./country/distribution/Create";
import CountryDistributionList from "./country/distribution/CountryDistributionList";

export default function ({id}) {
    const {findOneBy, update} = useApi();
    const exchangeTradedFund = useSelector(state => state.api.exchange_traded_funds?.values?.[id]);
    const [updateField, setUpdateField] = useState(null);

    useEffect(() => {
        findOneBy("exchange_traded_funds", "id", id);
    }, []);

    const updateMetadata = async value => {
        await update("exchange_traded_funds", id, updateField, {
            exchange_traded_fund: {
                [updateField]: value
            }
        });

        setUpdateField(null);
    }

    if (isNull(exchangeTradedFund)) return null;

    return (
        <div>
            <div>
                <ArrowLeftIcon size={6}/>
            </div>
            <div className="mt-5 px-5">
                <h1 className="font-bold text-xl">{exchangeTradedFund.public_name}</h1>
                <div className="grid grid-cols-3 gap-4 mt-5">
                    <div className="col-span-1 ">
                        <table className="border-none text-left">
                            <tbody className="border-none">
                            <tr className="border-none">
                                <th>Name</th>
                                <td className="cursor-pointer" onDoubleClick={() => setUpdateField("public_name")}>
                                    {
                                        updateField === "public_name"
                                            ? <input
                                                className="input-text"
                                                defaultValue={exchangeTradedFund.public_name}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        updateMetadata(e.target.value);
                                                    }
                                                }}
                                                autoFocus={true}
                                            />
                                            : exchangeTradedFund.public_name
                                    }
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Provider</th>
                                <td className="cursor-pointer" onDoubleClick={() => setUpdateField("provider")}>
                                    {
                                        updateField === "provider"
                                            ? <input
                                                className="input-text"
                                                defaultValue={exchangeTradedFund.provider}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        updateMetadata(e.target.value);
                                                    }
                                                }}
                                                autoFocus={true}
                                            />
                                            : exchangeTradedFund.provider
                                    }
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Product</th>
                                <td className="cursor-pointer" onDoubleClick={() => setUpdateField("product_id")}>
                                    {
                                        updateField === "product_id"
                                            ? <input
                                                className="input-text"
                                                defaultValue={exchangeTradedFund.product_id}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        updateMetadata(e.target.value);
                                                    }
                                                }}
                                                autoFocus={true}
                                            />
                                            : exchangeTradedFund.product_id
                                    }
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Pricing</th>
                                <td className="cursor-pointer" onDoubleClick={() => setUpdateField("pricing")}>
                                    {
                                        updateField === "pricing"
                                            ? <input
                                                type="number"
                                                step="0.01"
                                                className="input-text"
                                                defaultValue={exchangeTradedFund.pricing}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        updateMetadata(e.target.value);
                                                    }
                                                }}
                                                autoFocus={true}
                                            />
                                            : exchangeTradedFund.pricing
                                    }
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Risk</th>
                                <td className="cursor-pointer" onDoubleClick={() => setUpdateField("risk")}>
                                    {
                                        updateField === "risk"
                                            ? <input
                                                type="number"
                                                step="1"
                                                className="input-number"
                                                defaultValue={exchangeTradedFund.risk}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        updateMetadata(e.target.value);
                                                    }
                                                }}
                                                autoFocus={true}
                                            />
                                            : getRiskBadge(exchangeTradedFund.risk)
                                    }
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Amount</th>
                                <td className="cursor-pointer" onDoubleClick={() => setUpdateField("amount")}>
                                    {
                                        updateField === "amount"
                                            ? <input
                                                type="number"
                                                step="0.01"
                                                className="input-number"
                                                defaultValue={exchangeTradedFund.amount}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter") {
                                                        updateMetadata(e.target.value);
                                                    }
                                                }}
                                                autoFocus={true}
                                            />
                                            : priceFormatter(exchangeTradedFund.amount) + " €"
                                    }
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <fieldset>
                            <legend>Annually yield</legend>
                        </fieldset>

                        <fieldset>
                            <legend>Cumulative yield</legend>
                        </fieldset>
                    </div>
                    <fieldset className="col-span-1">
                        <legend>Country distribution</legend>

                        <Create/>
                        <hr className="mt-3 mb-5"/>

                        <CreateCountryDistribution exchangeTradedFundId={id}/>

                        <CountryDistributionList exchangeTradedFundId={id}/>
                    </fieldset>
                    <fieldset className="col-span-1">
                        <legend>Sector distribution</legend>

                    </fieldset>
                </div>
            </div>
        </div>
    );
}