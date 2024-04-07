import {useEffect, useRef, useState} from "react";
import {ZonedDateTime} from "@js-joda/core";
import ResultAsArray from "./ResultAsArray";
import uuid from "../../mixin/global/uuid";
import database from "../../database/database";
import isNull from "../../mixin/global/isNull";
import TrashIcon from "../util/icon/TrashIcon";

export default function () {
    const nameInput = useRef();
    const startingCapitalInput = useRef();
    const annualPaymentInput = useRef();
    const annualYieldInput = useRef();
    const numberOfYearOfPaymentInput = useRef();
    const numberOfYearInput = useRef();
    const [result, setResult] = useState(null);
    const [reload, setReload] = useState(uuid());
    const [savedPattern, setSavedPattern] = useState([]);

    useEffect(() => {
        loadSavedPattern();
    }, []);

    const process = () => {
        const res = [];
        const now = ZonedDateTime.now().year();
        const stopPaymentAt = (now + parseInt(numberOfYearOfPaymentInput.current.value)) - 1
        let currentCapital = parseFloat(startingCapitalInput.current.value);

        for (let i = now; i < now + parseInt(numberOfYearInput.current.value); i++) {
            const yieldL = (currentCapital * ((parseFloat(annualYieldInput.current.value) / 100) + 1)) - currentCapital;

            currentCapital += yieldL;
            currentCapital += (i > stopPaymentAt ? 0 : parseFloat(annualPaymentInput.current.value));

            res.push({
                year: i,
                total: currentCapital,
                payment: (i > stopPaymentAt ? 0 : parseFloat(annualPaymentInput.current.value)),
                yield: yieldL
            })
        }

        setResult(res);
        setReload(uuid());
    }

    const save = () => {
        let saved = database.read(database.TABLE_LONG_TERM_RETURN, "saved");

        if (isNull(saved)) {
            saved = [];
        }

        saved.push({
            name: nameInput.current.value,
            startingCapital: startingCapitalInput.current.value,
            annualYield: annualYieldInput.current.value,
            annualPayment: annualPaymentInput.current.value,
            numberOfYearOfPayment: numberOfYearOfPaymentInput.current.value,
            numberOfYear: numberOfYearInput.current.value
        });

        database.write(database.TABLE_LONG_TERM_RETURN, "saved", saved);

        loadSavedPattern();
    }

    const removePattern = name => {
        let saved = database.read(database.TABLE_LONG_TERM_RETURN, "saved").filter(saved => saved.name !== name);

        database.write(database.TABLE_LONG_TERM_RETURN, "saved", saved);

        loadSavedPattern();
    }

    const selectPattern = name => {
        const saved = database.read(database.TABLE_LONG_TERM_RETURN, "saved").find(saved => saved.name === name);

        nameInput.current.value = saved.name;
        startingCapitalInput.current.value = saved.startingCapital;
        annualPaymentInput.current.value = saved.annualPayment;
        annualYieldInput.current.value = saved.annualYield;
        numberOfYearOfPaymentInput.current.value = saved.numberOfYearOfPayment;
        numberOfYearInput.current.value = saved.numberOfYear;

        process();
    }

    const loadSavedPattern = () => {
        const saved = database.read(database.TABLE_LONG_TERM_RETURN, "saved");

        setSavedPattern(saved);
    }

    return (
        <div className="p-5 overflow-y-auto">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2 bg-default rounded p-5">
                    <div className="input-group">
                        <label>Name (for saving)</label>
                        <input className="input-text w-full" ref={nameInput}
                               placeholder="Name"/>
                    </div>
                    <div className="input-group">
                        <label>Starting capital (€/$)</label>
                        <input type="number" className="input-number w-full" step={0.01} ref={startingCapitalInput}
                               placeholder="Starting Capital" defaultValue={100000}/>
                    </div>
                    <div className="input-group">
                        <label>Annual Payment (€/$)</label>
                        <input type="number" className="input-number w-full" step={0.01} ref={annualPaymentInput}
                               placeholder="Annual payment" defaultValue={50000}/>
                    </div>
                    <div className="input-group">
                        <label>Annual average yield (%)</label>
                        <input type="number" className="input-number w-full" step={0.01} ref={annualYieldInput}
                               placeholder="Annual average yield" defaultValue={10}/>
                    </div>
                    <div className="input-group">
                        <label>Number of years of payment</label>
                        <input type="number" className="input-number w-full" step={1} ref={numberOfYearOfPaymentInput}
                               defaultValue={10}/>
                    </div>
                    <div className="input-group">
                        <label>Total number of years</label>
                        <input type="number" className="input-number w-full" step={1} ref={numberOfYearInput}
                               defaultValue={20}/>
                    </div>
                    <div className="mt-5 w-full flex justify-between">
                        <button className="badge-green-square" onClick={process}>Calculate</button>
                        <button className="badge-green-square" onClick={save}>Save</button>
                    </div>
                </div>
                <div className="col-span-4 bg-default rounded p-5">
                    <h1 className="text-center mb-5">Saved pattern</h1>

                    {
                        savedPattern?.map(saved => (
                            <div key={saved.name} className="flex justify-between mt-3">
                                <div className="font-bold">
                                    {saved.name}
                                </div>
                                <div className="flex justify-between">
                                    <button className="badge-green-square" onClick={() => selectPattern(saved.name)}>
                                        Go it
                                    </button>
                                    <button className="badge-red-square mx-3" onClick={() => removePattern(saved.name)}>
                                        <TrashIcon size={6}/>
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="col-span-6 bg-default rounded p-5">
                    <ResultAsArray key={reload} result={result}/>
                </div>
            </div>
        </div>
    )
}