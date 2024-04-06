import {useEffect} from "react";
import {useSelector} from "react-redux";
import useApi from "../../api/useApi";
import isNull from "../../mixin/global/isNull";
import useEventDispatcher from "../../use/useEventDispatcher";
import event from "../../event/event";

export default function ({exchangeTradedFundId}) {
    const eventDispatcher = useEventDispatcher();
    const {findAllBy, update} = useApi();
    const annuallyYields = useSelector(state => state.api.annually_yields?.values?.filter(annuallyYield => annuallyYield?.exchange_traded_fund_id == exchangeTradedFundId));

    useEffect(() => {
        findAllBy("annually_yields", "exchange_traded_fund_id", exchangeTradedFundId);
    }, []);

    if (isNull(annuallyYields)) return null;

    return (
        <div className="overflow-y-auto">
            {
                annuallyYields.sort((a, b) => b.year - a.year).map(annuallyYield => (
                    <div key={annuallyYield.id} className="grid grid-cols-3 gap-4 mt-3">
                        <div className="col-span-1 text-right">{annuallyYield.year}</div>
                        <div className="col-span-1 flex">
                            <input
                                className="input-number w-full"
                                type="number"
                                step="0.01"
                                defaultValue={annuallyYield.yield}
                                onKeyDown={async e => {
                                    if (e.key === "Enter") {
                                        await update("annually_yields", annuallyYield.id, "yield", {
                                            annually_yield: {
                                                yield: e.target.value
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