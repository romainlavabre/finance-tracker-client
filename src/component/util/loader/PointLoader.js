import {useEffect, useRef, useState} from "react";

export default function ({time = 500}) {
    const [value, setValue] = useState("");
    const interval = useRef();

    useEffect(() => {
        window.ROOTpointLoader = "";

        interval.current = setInterval(() => {
            const splited = window.ROOTpointLoader.split("");

            if (splited.length < 3) {
                window.ROOTpointLoader += ".";
                setValue(window.ROOTpointLoader);
                return;
            }

            window.ROOTpointLoader = "";
            setValue(window.ROOTpointLoader);
        }, time);
    }, []);

    useEffect(() => {
        return () => clearInterval(interval.current);
    }, [])

    return value;
}
