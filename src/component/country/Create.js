import useApi from "../../api/useApi";
import {useRef} from "react";
import enums from "../../enum/enums";
import CheckIcon from "../util/icon/CheckIcon";

export default function ({onCreated}) {
    const {create} = useApi();
    const nameInput = useRef();
    const continentInput = useRef();

    const submit = async () => {
        const id = await create("countries", {
            country: {
                name: nameInput.current.value,
                continent: continentInput.current.value
            }
        });

        if (typeof id === "number") {
            onCreated();
            nameInput.current.value = null;
            continentInput.current.value = 0;
        }
    }

    return (
        <div className="flex justify-around" title="Add new country">
            <div>
                <input className="input-text" placeholder="Name" ref={nameInput}/>
            </div>
            <div>
                <select className="input-select" defaultValue={0} ref={continentInput}>
                    <option value={enums.country.CONTINENT_AFRICA}>AFRICA</option>
                    <option value={enums.country.CONTINENT_ASIA}>ASIA</option>
                    <option value={enums.country.CONTINENT_AMERICA}>AMERICA</option>
                    <option value={enums.country.CONTINENT_AUSTRALIA}>AUSTRALIA</option>
                    <option value={enums.country.CONTINENT_EUROPE}>EUROPE</option>
                </select>
            </div>
            <div className="text-green cursor-pointer" onClick={submit}>
                <CheckIcon size={5}/>
            </div>
        </div>
    );
}