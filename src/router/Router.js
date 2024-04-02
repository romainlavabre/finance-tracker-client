import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Entrypoint from "../view/Entrypoint";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entrypoint/>}/>
            </Routes>
        </BrowserRouter>
    );
}
