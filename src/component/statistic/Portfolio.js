import Patrimony from "./Patrimony";
import AveragePricing from "./AveragePricing";
import RiskDistribution from "./RiskDistribution";
import ContinentDistribution from "./ContinentDistribution";
import CountryDistribution from "./CountryDistribution";
import ExchangeTradedFundDistribution from "./ExchangeTradedFundDistribution";
import ProviderDistribution from "./ProviderDistribution";
import SectorDistribution from "./SectorDistribution";
import PastPermormance from "./PastPermormance";
import CumulativeYield from "./CumulativeYield";
import TargetDist from "./TargetDist";
import TargetAcc from "./TargetAcc";

export default function () {
    return (
        <div className="p-5 overflow-y-auto">
            <div className="grid grid-cols-12 grid-rows-4 grid-flow-col gap-4">
                <div className="col-span-2 row-span-2">
                    <Patrimony/>
                </div>
                <div className="col-span-2 row-span-2">
                    <AveragePricing/>
                </div>
                <div className="col-span-2 row-span-2">
                    <TargetDist/>
                </div>
                <div className="col-span-2 row-span-2">
                    <TargetAcc/>
                </div>
                <div className="col-span-4 row-span-4">
                    <ProviderDistribution/>
                </div>
                <div className="col-span-6 row-span-4">
                    <ExchangeTradedFundDistribution/>
                </div>
            </div>
            <div className="grid grid-cols-12 grid-rows-4 grid-flow-col gap-4 mt-4">
                <div className="col-span-5 row-span-4">
                    <PastPermormance/>
                </div>
                <div className="col-span-5 row-span-4">
                    <CumulativeYield/>
                </div>
                <div className="col-span-2 row-span-2">
                    <RiskDistribution/>
                </div>
                <div className="col-span-2 row-span-2">
                    <ContinentDistribution/>
                </div>
            </div>
            <div className="grid grid-cols-12 grid-rows-5 grid-flow-col gap-4 mt-4">
                <div className="col-span-6 row-span-5">
                    <CountryDistribution/>
                </div>
                <div className="col-span-6 row-span-5">
                    <SectorDistribution/>
                </div>
            </div>

        </div>
    );
}