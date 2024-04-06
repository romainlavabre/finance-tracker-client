import useApi from "../../../api/useApi";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";
import useEventDispatcher from "../../../use/useEventDispatcher";
import event from "../../../event/event";

export default function ({exchangeTradedFundId}) {
    const eventDispatcher = useEventDispatcher();
    const {findAllBy, update} = useApi();
    const countryDistributions = useSelector(state => state.api.country_distributions?.values?.filter(countryDistribution => countryDistribution?.exchange_traded_fund_id == exchangeTradedFundId));

    useEffect(() => {
        findAllBy("country_distributions", "exchange_traded_fund_id", exchangeTradedFundId);
    }, []);

    if (isNull(countryDistributions)) return null;

    return (
        <div className="overflow-y-auto">
            {
                countryDistributions.sort((a, b) => b.weight - a.weight).map(countryDistribution => (
                    <div key={countryDistribution.id} className="grid grid-cols-3 gap-4 mt-3">
                        <div className="col-span-1 text-right">{countryDistribution.country_name}</div>
                        <div className="col-span-1 flex">
                            <input
                                className="input-number w-full"
                                type="number"
                                step="0.01"
                                defaultValue={countryDistribution.weight}
                                onKeyDown={async e => {
                                    if (e.key === "Enter") {
                                        await update("country_distributions", countryDistribution.id, "weight", {
                                            country_distribution: {
                                                weight: e.target.value
                                            }
                                        });

                                        eventDispatcher.launcher(event.UPDATE, null);
                                    }
                                }}
                            />
                            <div className="ml-2">
                                %
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}