import SaveIcon from "../icon/SaveIcon";

export default function FormLoader() {
    return (
        <div className="rounded p-4 w-full mx-auto h-full">
            <div className="animate-pulse">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="h-2 bg-slate-700 rounded col-start-1 col-end-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-start-4 col-end-5"></div>
                    <div className="h-8 bg-slate-700 rounded col-start-1 col-end-4"></div>
                    <div className="h-8 bg-slate-700 rounded col-start-4 col-end-7"></div>
                </div>
                <div className="grid grid-cols-6 gap-4 w-full mt-5">
                    <div className="h-2 bg-slate-700 rounded col-start-1 col-end-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-start-4 col-end-5"></div>
                    <div className="h-8 bg-slate-700 rounded col-start-1 col-end-4"></div>
                    <div className="h-32 bg-slate-700 rounded col-start-4 col-end-7"></div>
                </div>
                <div className="form-submit">
                    <button className="button-green">
                        <SaveIcon size={5}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
