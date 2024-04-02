import {useDispatch} from "react-redux";
import {openAlert} from "../store/util";

export default function () {
    const dispatch = useDispatch();

    return {
        launch: (text, type = "success") => {
            dispatch(openAlert({
                title: text,
                type: type
            }));
        },
        success: text => {
            dispatch(openAlert({
                title: text,
                type: "success"
            }));
        },
        error: text => {
            dispatch(openAlert({
                title: text,
                type: "error"
            }));
        },
        warning: text => {
            dispatch(openAlert({
                title: text,
                type: "warning"
            }));
        },
        info: text => {
            dispatch(openAlert({
                title: text,
                type: "info"
            }));
        }
    }
}
