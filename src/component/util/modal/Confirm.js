import {useDispatch, useSelector} from "react-redux";
import {closeConfirm} from "../../../store/util";
import WarningIcon from "../icon/WarningIcon";

function Confirm() {
    const dispatch = useDispatch();

    const open = useSelector(state => state.util.modal.confirm.open);
    const title = useSelector(state => state.util.modal.confirm.title);
    const description = useSelector(state => state.util.modal.confirm.description);
    const callback = useSelector(state => state.util.modal.confirm.callback);

    const abort = () => {
        dispatch(closeConfirm());

        if (callback !== null && callback.length > 0) {
            for (let i = 0; i < callback.length; i++) {
                callback[i](false);
            }
        }
    }

    const next = () => {
        dispatch(closeConfirm());

        if (callback !== null && callback.length > 0) {
            for (let i = 0; i < callback.length; i++) {
                callback[i](true);
            }
        }
    }

    if (!open) {
        return null;
    }

    return (
        <div className="fixed w-full bg-gray-500/70 overflow-auto scroll-auto top-0 bottom-0" style={{zIndex: 9999999}}>
            <div className="fixed w-full bg-gray-800 top-0 p-1 pb-10">
                <div className="text-xl font-bold">
                    {title}
                </div>
                <div className="mt-5 text-center text-lg">
                    {description}
                </div>

                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="button-red"
                        onClick={() => next()}
                    >
                        Continuer
                    </button>
                    <button
                        type="button"
                        className="button-blue"
                        onClick={() => abort()}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div
            className={'text-left overflow-hidden shadow-xl fixed-top mx-auto'}
            style={{zIndex: 999999999999}}>
            <div className={'bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'}>
                <div className={'sm:flex sm:items-start'}>
                    <div
                        className="badge-red">
                        <WarningIcon size={6}/>
                    </div>
                    <div className={'mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'}>
                        {title}
                        <div className="mt-2">
                            {description}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    className="button-red"
                    onClick={() => next()}
                >
                    Continuer
                </button>
                <button
                    type="button"
                    className="button-blue"
                    onClick={() => abort()}
                >
                    Annuler
                </button>
            </div>
        </div>
    );
}

export default Confirm;
