import ArrowTopIcon from "./util/icon/ArrowTopIcon";
import {useState} from "react";
import ArrowBottomIcon from "./util/icon/ArrowBottomIcon";
import ExchangeTradedFundList from "./ExchangeTradedFundList";

export default function () {
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="bg-default w-full font-bold text-center py-2 cursor-pointer relative"
                 onClick={() => setOpen(!isOpen)}>
                My assets list
                <div className="absolute top-2 right-2">
                    {
                        isOpen
                            ? <ArrowTopIcon size={6}/>
                            : <ArrowBottomIcon size={6}/>
                    }
                </div>
            </div>
            {
                isOpen
                    ? (
                        <div className="fixed w-full h-full top-9 bg-default">
                            <ExchangeTradedFundList/>
                        </div>
                    )
                    : null
            }
        </>
    )
}