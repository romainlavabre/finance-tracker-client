import useApi from "../../api/useApi";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import uuid from "../../mixin/global/uuid";
import isNull from "../../mixin/global/isNull";
import CheckIcon from "../util/icon/CheckIcon";
import {LocalDate} from "@js-joda/core";
import SelectSearch2 from "../util/form/SelectSearch2";


export default function ({exchangeTradedFundId}) {
    const {findAllBy, create} = useApi();
    const annuallyYields = useSelector(state => state.api.annually_yields?.values?.filter(annuallyYield => annuallyYield?.exchange_traded_fund_id == exchangeTradedFundId));
    const [years, setYears] = useState([]);
    const [reload, setReload] = useState(uuid());
    const yearInput = useRef();
    const yieldInput = useRef();

    useEffect(() => {
        findAllBy("annually_yields", "exchange_traded_fund_id", exchangeTradedFundId);
    }, []);

    useEffect(() => {
        if (isNull(annuallyYields)) return;

        const current = LocalDate.now().year();
        const result = [];

        for (let i = 2010; i <= current; i++) {
            result.push({
                key: i,
                value: i
            })
        }

        setYears(result.reverse());
    }, [annuallyYields]);

    const submit = async () => {
        const id = await create("annually_yields", {
            annually_yield: {
                year: yearInput.current.value,
                yield: yieldInput.current.value,
                exchange_traded_fund_id: exchangeTradedFundId
            }
        });

        if (typeof id === "number") {
            yearInput.current.value = null;
            yieldInput.current.value = 0;

            setReload(uuid());
        }
    }

    if (isNull(annuallyYields)) return null;

    return (
        <div key={reload} className="flex justify-around" title="Add new annually yield">
            <div className="w-48">
                <SelectSearch2
                    key={years.length}
                    items={years}
                    index={"key"}
                    value={"value"}
                    reference={yearInput}
                />
            </div>
            <div>
                <input
                    type="number"
                    step="0.01"
                    className="input-number"
                    placeholder="Yield (%)"
                    ref={yieldInput}
                />
            </div>
            <div className="text-green cursor-pointer" onClick={submit}>
                <CheckIcon size={5}/>
            </div>
        </div>
    );
}