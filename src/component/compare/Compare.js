import PastPermormance from "./PastPermormance";
import CumulativeYield from "./CumulativeYield";

export default function () {

    return (
        <div className="grid grid-cols-2 gap-4 p-5">
            <div className="col-span-1 bg-default rounded">
                <PastPermormance/>
            </div>
            <div className="col-span-1 bg-default rounded">
                <CumulativeYield/>
            </div>
        </div>
    )
}