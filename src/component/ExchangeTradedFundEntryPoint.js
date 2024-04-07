import ArrowTopIcon from "./util/icon/ArrowTopIcon";
import {useEffect, useState} from "react";
import ArrowBottomIcon from "./util/icon/ArrowBottomIcon";
import ExchangeTradedFundList from "./ExchangeTradedFundList";
import BottomBar from "./BottomBar";
import Portfolio from "./statistic/Portfolio";
import uuid from "../mixin/global/uuid";
import useEventDispatcher from "../use/useEventDispatcher";
import event from "../event/event";
import LongTermeReturn from "./long-term-return/LongTermeReturn";
import Compare from "./compare/Compare";

export default function () {
    const eventDispatcher = useEventDispatcher();
    const [isOpen, setOpen] = useState(false);
    const [reload, setReload] = useState(uuid());
    const [section, setSection] = useState(2);

    useEffect(() => {
        eventDispatcher.subscribe(event.UPDATE, () => setReload(uuid()));
    }, []);

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
                        <div className="fixed w-full h-full top-0 bg-default z-50 overflow-y-auto">
                            <ExchangeTradedFundList onClose={() => setOpen(false)}/>
                        </div>
                    )
                    : null
            }

            {
                section === 0
                    ? <Portfolio key={reload}/>
                    : null
            }

            {
                section === 1
                    ? <LongTermeReturn/>
                    : null
            }

            {
                section === 2
                    ? <Compare/>
                    : null
            }


            <BottomBar onSelected={setSection}/>
        </>
    )
}