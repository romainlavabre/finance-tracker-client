import {useEffect, useState} from "react";
import api from "../../api/api";
import isNull from "../../mixin/global/isNull";
import priceFormatter from "../../mixin/global/priceFormatter";

export default function () {
    const [patrimony, setPatrimony] = useState(null);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setPatrimony((await api.statistic.patrimony()));
    }

    if (isNull(patrimony)) return null;

    return (
        <div className="relative  bg-default h-full text-center rounded">
            <div className="absolute w-full text-center top-[30%] text-3xl font-bold my-auto">
                {priceFormatter(patrimony.total)} €
            </div>

            <h1 className="absolute bottom-0 w-full">Patrimony</h1>
        </div>
    );
}