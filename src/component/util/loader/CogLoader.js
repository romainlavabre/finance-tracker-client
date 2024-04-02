import CogIcon from "../icon/CogIcon.js";

export default function ({size = 6, textColor = "text-blue-500"}) {
    return (
        <div className={"animate-spin flex flex-col items-center " + textColor}>
            <CogIcon size={size}/>
        </div>
    );
}
