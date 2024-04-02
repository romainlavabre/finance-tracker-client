import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {closeInfo} from "../../../store/util";
import CloseIcon from "../icon/CloseIcon";

export default function () {
    const dispatch = useDispatch();
    const open = useSelector(state => state.util.modal.info.open);
    const title = useSelector(state => state.util.modal.info.title);
    const description = useSelector(state => state.util.modal.info.description);

    const close = () => {
        dispatch(closeInfo());
    }

    if (!open) {
        return null;
    }

    return (
        <div className="fixed z-30 w-full bg-gray-500/70 overflow-auto scroll-auto top-0 bottom-0">
            <div className="fixed w-full bg-gray-800 top-0 p-1 pb-10">
                <div className="flex justify-end absolute right-0">
                    <button type="button"
                            className="button-red"
                            onClick={close}>
                        <CloseIcon size={6}/>
                    </button>
                </div>
                {description}
            </div>
        </div>
    );
}
