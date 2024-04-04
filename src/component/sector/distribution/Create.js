import useApi from "../../../api/useApi";
import {useEffect, useRef, useState} from "react";
import CheckIcon from "../../util/icon/CheckIcon";
import SelectSearch2 from "../../util/form/SelectSearch2";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";
import uuid from "../../../mixin/global/uuid";

export default function ({exchangeTradedFundId}) {
    const {findAll, create} = useApi();
    const sectors = useSelector(state => state.api.sectors?.values?.filter(sector => !isNull(sector)));
    const [reload, setReload] = useState(uuid());
    const sectorIdInput = useRef();
    const weightInput = useRef();

    useEffect(() => {
        findAll("sectors");
    }, []);

    const submit = async () => {
        const id = await create("sector_distributions", {
            sector_distribution: {
                sector_id: sectorIdInput.current.value,
                weight: weightInput.current.value,
                exchange_traded_fund_id: exchangeTradedFundId
            }
        });

        if (typeof id === "number") {
            sectorIdInput.current.value = null;
            weightInput.current.value = 0;

            setReload(uuid());
        }
    }

    if (isNull(sectors)) return null;

    return (
        <div key={reload} className="flex justify-around" title="Add new sector distribution">
            <div className="w-48">
                <SelectSearch2
                    items={sectors}
                    index={"id"}
                    value={"name"}
                    reference={sectorIdInput}
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