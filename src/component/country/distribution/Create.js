import useApi from "../../../api/useApi";
import {useEffect, useRef, useState} from "react";
import CheckIcon from "../../util/icon/CheckIcon";
import SelectSearch2 from "../../util/form/SelectSearch2";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";
import uuid from "../../../mixin/global/uuid";

export default function ({exchangeTradedFundId}) {
    const {findAll, create} = useApi();
    const countries = useSelector(state => state.api.countries?.values?.filter(country => !isNull(country)));
    const [reload, setReload] = useState(uuid());
    const countryIdInput = useRef();
    const weightInput = useRef();

    useEffect(() => {
        findAll("countries");
    }, []);

    const submit = async () => {
        const id = await create("country_distributions", {
            country_distribution: {
                country_id: countryIdInput.current.value,
                weight: weightInput.current.value,
                exchange_traded_fund_id: exchangeTradedFundId
            }
        });

        if (typeof id === "number") {
            countryIdInput.current.value = null;
            weightInput.current.value = 0;

            setReload(uuid());
        }
    }

    if (isNull(countries)) return null;

    return (
        <div key={reload} className="flex justify-around" title="Add new country distribution">
            <div className="w-48">
                <SelectSearch2
                    items={countries}
                    index={"id"}
                    value={"name"}
                    reference={countryIdInput}
                />
            </div>
            <div>
                <input
                    type="number"
                    step="0.01"
                    className="input-number"
                    placeholder="Weight (%)"
                    ref={weightInput}
                />
            </div>
            <div className="text-green cursor-pointer" onClick={submit}>
                <CheckIcon size={5}/>
            </div>
        </div>
    );
}