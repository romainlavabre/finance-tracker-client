import React, {useEffect, useState} from "react";
import isNull from "../../../mixin/global/isNull";
import useEventDispatcher from "../../../use/useEventDispatcher";
import event from "../../../event/event";
import uuid from "../../../mixin/global/uuid";

export default function Navbar({items, uniqueId = null}) {
    const eventDispatcher = useEventDispatcher();
    const [selected, setSelected] = useState(null);
    const [targetComponent, setTargetComponent] = useState(null);

    useEffect(() => {
        const write = () => {
            if (isNull(uniqueId)) return;

            writeQueryString(uniqueId, window.ROOTnavbar[uniqueId]);
        };

        const remove = () => {
            if (isNull(uniqueId)) return;

            removeQueryString(uniqueId);
        };

        eventDispatcher.subscribe(event.OPEN_MODAL, write);
        eventDispatcher.subscribe(event.CLOSE_MODAL, remove)

        return () => {
            eventDispatcher.unsubscribe(event.OPEN_MODAL, write);
            eventDispatcher.unsubscribe(event.CLOSE_MODAL, remove);

            if (!isNull(uniqueId) || isNull(window.ROOTnavbar) || isNull(window.ROOTnavbar[uniqueId])) return;

            window.ROOTnavbar[uniqueId] = null;
        }
    }, []);


    useEffect(() => {
        if (!isNull(selected) && !isNull(targetComponent)) {
            return;
        }

        for (let i = 0; i < items.length; i++) {
            if (!isNull(items[i].default) && items[i].default) {
                onItemClicked(items[i]);
            }
        }

        if (isNull(uniqueId)) return;

        const urlDefault = getQueryString(uniqueId);

        if (isNull(urlDefault)) return;

        for (let i = 0; i < items.length; i++) {
            if (items[i].name === urlDefault) {
                onItemClicked(items[i]);
            }
        }

        removeQueryString(uniqueId);
    }, [items]);

    const getQueryString = key => {
        return getAllQueryString()[key];
    }

    const getAllQueryString = () => {
        if (isNull(window.ROOTnavbarHistory)) {
            window.ROOTnavbarHistory = {};
        }

        return window.ROOTnavbarHistory;
    }

    const writeQueryString = (key, value) => {
        const localParams = getAllQueryString();

        localParams[key] = value;

        window.ROOTnavbarHistory = localParams;
    }

    const removeQueryString = key => {
        window.ROOTnavbarHistory[key] = null;
    }

    const onItemClicked = item => {
        setSelected(item.name);
        setTargetComponent(item.component);

        if (isNull(uniqueId)) return;

        if (isNull(window.ROOTnavbar)) {
            window.ROOTnavbar = {};
        }

        window.ROOTnavbar[uniqueId] = item.name;
    }

    return (
        <div className="w-full">
            <div className="flex">
                {
                    items.map((item, index) => (
                        <span
                            key={index}
                            className={selected === item.name ? 'text-green hover:text-green-600' : null}>
                            <button
                                disabled={item.name === selected}
                                className="px-5 py-1 mx-5 hover:text-gray-500 font-bold"
                                onClick={() => onItemClicked(item)}
                                id={!isNull(item.id) ? item.id : `navbar-button-${uuid()}`}
                            >
                                {item.name}
                            </button>
                        </span>
                    ))
                }
            </div>
            {targetComponent}
        </div>
    );
}
