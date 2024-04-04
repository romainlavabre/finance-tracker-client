import useApi from "../../api/useApi";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import isNull from "../../mixin/global/isNull";

export default function ({exchangeTradedFundId}) {
    const {findOneBy, create, update} = useApi();
    const cumulativeYield = useSelector(state => state.api.cumulative_yields?.values?.find(cumulativeYield => cumulativeYield?.exchange_traded_fund_id == exchangeTradedFundId));

    useEffect(() => {
        findOneBy("cumulative_yields", "exchange_traded_fund_id", exchangeTradedFundId);
    }, []);

    if (isNull(cumulativeYield)) {
        return (
            <div className="badge-green-square" onClick={() => create("cumulative_yields", {
                cumulative_yield: {
                    exchange_traded_fund_id: exchangeTradedFundId
                }
            })}>
                Generate
            </div>
        );
    }

    return (
        <div className="overflow-y-auto">
            <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="col-span-1 text-right">10 Year</div>
                <div className="col-span-1 flex">
                    <input
                        className="input-number w-full"
                        type="number"
                        step="0.01"
                        defaultValue={cumulativeYield.to_ten_year}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                update("cumulative_yields", cumulativeYield.id, "to_ten_year", {
                                    cumulative_yield: {
                                        to_ten_year: e.target.value
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
            <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="col-span-1 text-right">5 Year</div>
                <div className="col-span-1 flex">
                    <input
                        className="input-number w-full"
                        type="number"
                        step="0.01"
                        defaultValue={cumulativeYield.to_five_year}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                update("cumulative_yields", cumulativeYield.id, "to_five_year", {
                                    cumulative_yield: {
                                        to_five_year: e.target.value
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
            <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="col-span-1 text-right">3 Year</div>
                <div className="col-span-1 flex">
                    <input
                        className="input-number w-full"
                        type="number"
                        step="0.01"
                        defaultValue={cumulativeYield.to_three_year}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                update("cumulative_yields", cumulativeYield.id, "to_three_year", {
                                    cumulative_yield: {
                                        to_three_year: e.target.value
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
            <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="col-span-1 text-right">1 Year</div>
                <div className="col-span-1 flex">
                    <input
                        className="input-number w-full"
                        type="number"
                        step="0.01"
                        defaultValue={cumulativeYield.to_one_year}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                update("cumulative_yields", cumulativeYield.id, "to_one_year", {
                                    cumulative_yield: {
                                        to_one_year: e.target.value
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
            <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="col-span-1 text-right">Since creation</div>
                <div className="col-span-1 flex">
                    <input
                        className="input-number w-full"
                        type="number"
                        step="0.01"
                        defaultValue={cumulativeYield.since_creation}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                update("cumulative_yields", cumulativeYield.id, "since_creation", {
                                    cumulative_yield: {
                                        since_creation: e.target.value
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
        </div>
    )
}