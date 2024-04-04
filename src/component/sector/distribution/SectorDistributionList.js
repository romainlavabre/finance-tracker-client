import useApi from "../../../api/useApi";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";

export default function ({exchangeTradedFundId}) {
    const {findAllBy, update} = useApi();
    const sectorDistributions = useSelector(state => state.api.sector_distributions?.values?.filter(sectorDistribution => sectorDistribution?.exchange_traded_fund_id == exchangeTradedFundId));

    useEffect(() => {
        findAllBy("sector_distributions", "exchange_traded_fund_id", exchangeTradedFundId);
    }, []);

    if (isNull(sectorDistributions)) return null;

    return (
        <div className="overflow-y-auto">
            {
                sectorDistributions.sort((a, b) => b.weight - a.weight).map(sectorDistribution => (
                    <div key={sectorDistribution.id} className="grid grid-cols-2 gap-4 mt-3">
                        <div className="col-span-1">{sectorDistribution.sector_name}</div>
                        <div className="col-span-1 flex">
                            <input
                                className="input-number w-full"
                                type="number"
                                step="0.01"
                                defaultValue={sectorDistribution.weight}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        update("sector_distributions", sectorDistribution.id, "weight", {
                                            sector_distribution: {
                                                weight: e.target.value
                                            }
                                        })
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