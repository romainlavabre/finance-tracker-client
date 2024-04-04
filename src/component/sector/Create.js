import useApi from "../../api/useApi";
import {useRef} from "react";
import CheckIcon from "../util/icon/CheckIcon";

export default function () {
    const {create} = useApi();
    const nameInput = useRef();

    const submit = async () => {
        const id = await create("sectors", {
            sector: {
                name: nameInput.current.value
            }
        });

        if (typeof id === "number") {
            nameInput.current.value = null;
        }
    }

    return (
        <div className="flex justify-around" title="Add new country">
            <div>
                <input className="input-text" placeholder="Name" ref={nameInput}/>
            </div>
            <div className="text-green cursor-pointer" onClick={submit}>
                <CheckIcon size={5}/>
            </div>
        </div>
    );
}