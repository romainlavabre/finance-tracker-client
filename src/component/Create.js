import useApi from "../api/useApi";
import {useRef} from "react";
import ArrowLeftIcon from "./util/icon/ArrowLeftIcon";
import CheckIcon from "./util/icon/CheckIcon";
import useEventDispatcher from "../use/useEventDispatcher";
import event from "../event/event";

export default function ({onBack}) {
    const eventDispatcher = useEventDispatcher();
    const {create} = useApi();
    const publicNameInput = useRef();
    const providerInput = useRef();
    const productIdInput = useRef();
    const pricingInput = useRef();
    const riskInput = useRef();
    const amountInput = useRef();

    const submit = async () => {
        const id = await create("exchange_traded_funds", {
            exchange_traded_fund: {
                public_name: publicNameInput.current.value,
                provider: providerInput.current.value,
                product_id: productIdInput.current.value,
                pricing: pricingInput.current.value,
                risk: riskInput.current.value,
                amount: amountInput.current.value,
            }
        });

        if (typeof id === "number") {
            eventDispatcher.launcher(event.UPDATE, null);
            onBack(id);
        }
    }


    return (
        <div>
            <div onClick={onBack} className="cursor-pointer">
                <ArrowLeftIcon size={6}/>
            </div>
            <div className="mt-5 px-5">
                <div className="grid grid-cols-3 gap-4 mt-5">
                    <div className="col-span-1 ">
                        <table className="border-none text-left">
                            <tbody className="border-none">
                            <tr className="border-none">
                                <th>Name</th>
                                <td className="cursor-pointer">
                                    <input
                                        className="input-text"
                                        placeholder={"Name"}
                                        ref={publicNameInput}
                                        autoFocus={true}
                                    />
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Provider</th>
                                <td className="cursor-pointer">
                                    <input
                                        className="input-text"
                                        placeholder="Provider"
                                        ref={providerInput}
                                    />
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Product</th>
                                <td className="cursor-pointer">
                                    <input
                                        className="input-text"
                                        placeholder="Product id (ISIN)"
                                        ref={productIdInput}
                                    />
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Pricing</th>
                                <td className="cursor-pointer">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="input-number"
                                        placeholder="Pricing"
                                        ref={pricingInput}
                                    />
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Risk</th>
                                <td className="cursor-pointer">
                                    <input
                                        type="number"
                                        step="1"
                                        className="input-number"
                                        placeholder="Risk"
                                        ref={riskInput}
                                    />
                                </td>
                            </tr>
                            <tr className="border-none">
                                <th>Amount</th>
                                <td className="cursor-pointer">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="input-number"
                                        placeholder="Amount"
                                        ref={amountInput}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-start">
                            <div className="badge-green-square" onClick={submit}>
                                <CheckIcon size={6}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}