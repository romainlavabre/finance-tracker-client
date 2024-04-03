import {useDispatch, useSelector} from "react-redux";
import isNull from "../mixin/global/isNull";
import config from "./config";
import axios from "axios";
import {addOrOverwrite, remove} from "../store/api";
import useAlert from "../use/useAlert";
import enums from "../enum/enums";

let inProgress = [];

export default function useApi() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const alert = useAlert();

    const findOneBy = async (subject, prop, value, role = "sub_admin", consistencyLevel = 1, silent = false) => {
        const name = `findOneBy-${subject}-${prop}-${value}-${role}-${consistencyLevel}`;

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        let entity = searchEntity(subject, prop, value, state, "findOneBy", consistencyLevel);

        if (entity !== null) {
            inProgress = inProgress.filter(item => item !== name);
            return entity;
        }

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/${subject}/${prop === "id" ? value : `by/${prop.replace(new RegExp('_id$'), '')}/${value}`}`, null);

            response.data.lastFetchAt = new Date();

            dispatch(addOrOverwrite({
                subject: subject,
                entity: response.data
            }));

            inProgress = inProgress.filter(item => item !== name);
            return response.data;
        } catch (e) {
            if (!silent) {
                alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : e.response.data.message, "error");
            }

            console.log(e);
            inProgress = inProgress.filter(item => item !== name);
            return null;
        }
    };

    const findAll = async (subject, role = "sub_admin", consistencyLevel = 1, silent = false) => {
        const name = `findOneBy-${subject}-${role}-${consistencyLevel}`;

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        let entity = searchEntity(subject, null, null, state, "findAll", consistencyLevel);

        if (entity !== null) {
            inProgress = inProgress.filter(item => item !== name);
            return entity;
        }

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/${subject}`, null);

            for (let i = 0; i < response.data.length; i++) {
                response.data[i].lastFetchAt = new Date();
            }

            dispatch(addOrOverwrite({
                subject: subject,
                entity: response.data,
                findAllAt: new Date()
            }));

            inProgress = inProgress.filter(item => item !== name);
            return response.data;
        } catch (e) {
            if (!silent) {
                alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : e.response.data.message, "error");
            }

            console.log(e);
            inProgress = inProgress.filter(item => item !== name);
            return null;
        }
    };

    const findAllBy = async (subject, prop, value, role = "sub_admin", consistencyLevel = 1, silent = false) => {
        const name = `findOneBy-${subject}-${prop}-${value}-${role}-${consistencyLevel}`;

        if (inProgress.includes(name)) {
            return null;
        }

        inProgress.push(name);

        let entity = searchEntity(subject, prop, value, state, "findAllBy", consistencyLevel);

        if (entity !== null) {
            inProgress = inProgress.filter(item => item !== name);
            return entity;
        }

        try {

            const response = await axios.get(process.env.REACT_APP_API_URL + `/${subject}/${prop === "id" ? value : `by/${prop.replace(new RegExp('_id$'), '')}/${value}`}`, null);

            for (let i = 0; i < response.data.length; i++) {
                response.data[i].lastFetchAt = new Date();
            }

            const payload = {
                subject: subject,
                entity: response.data,
                prop: prop,
                value: value
            };
            payload[`findAllBy-${prop}`] = new Date();

            dispatch(addOrOverwrite(payload));

            inProgress = inProgress.filter(item => item !== name);
            return response.data;
        } catch (e) {
            console.log(e);
            inProgress = inProgress.filter(item => item !== name);
            return null;
        }
    };

    return {
        findOneBy: findOneBy,
        findAll: findAll,
        findAllBy: findAllBy,
        create: async (subject, payload, role = "sub_admin", silent = false) => {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_API_URL + `/${subject}`,
                    payload,
                    null
                );

                if (!isNull(response.data.id)) {
                    response.data.lastFetchAt = new Date();

                    dispatch(addOrOverwrite({
                        subject: subject,
                        entity: response.data
                    }));
                }

                if (!silent) {
                    alert.launch("OK", "success");
                }

                return response.data.id;
            } catch (e) {
                if (!silent) {
                    alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : e.response.data.message, "error");
                }

                console.log(e);
                return null;
            }
        },
        update: async (subject, id, prop, payload, role = "sub_admin", silent = false) => {
            try {
                const response = await axios.patch(
                    process.env.REACT_APP_API_URL + `/${subject}/${id}/${prop.replace(new RegExp('_id$'), '')}`,
                    payload,
                    null
                );

                if (!silent) {
                    alert.launch("OK", "success");
                }

                response.data.lastFetchAt = new Date();

                dispatch(addOrOverwrite({
                    subject: subject,
                    entity: response.data
                }));

                return true;
            } catch (e) {
                console.log(e);

                if (!silent) {
                    alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : e.response.data.message, "error");
                }

                return false;
            }
        },
        remove: async (subject, id, role = "sub_admin", silent = false) => {
            try {
                await axios.delete(process.env.REACT_APP_API_URL + `/${subject}/${id}`, null);

                dispatch(remove({
                    subject: subject,
                    id: id
                }));

                return true;
            } catch (e) {
                if (!silent) {
                    alert.launch(!isNull(enums.error[e.response.data.message]) ? enums.error[e.response.data.message] : e.response.data.message, "error");
                }

                console.log(e);
                return false;
            }
        }
    }
}

function searchEntity(subject, prop, value, state, method = "findOneBy", consistencyLevel = 1) {
    if (parseInt(consistencyLevel) === 2) {
        return null;
    }

    if (isNull(state.api?.[subject])) {
        return null;
    }

    let result;

    if (value !== null) {
        if (method.startsWith("findOne")) {
            result = state.api[subject].values.find(item => item !== undefined && item[prop] == value);
        } else {
            result = state.api[subject].values.filter(item => item !== undefined && item[prop] == value);
        }
    } else {
        result = state.api[subject].values;
    }

    if (isNull(result) || result.length === 0) {
        return null;
    }

    if (parseInt(consistencyLevel) === 0) {
        return result;
    }

    if (method === "findOneBy") {
        if (new Date().getTime() / 1000 - result.lastFetchAt.getTime() / 1000 > config[subject].cacheLifeTime) {
            return null;
        }
    } else if (method === "findAll") {
        if (!isNull(state.api[subject].metadata.findAllAt)
            && new Date().getTime() / 1000 - state.api[subject].metadata.findAllAt.getTime() / 1000 > config[subject].cacheLifeTimeFindAll) {
            return null;
        }

        for (let i = 0; i < result.length; i++) {
            if (isNull(result[i])) {
                continue;
            }

            if (new Date().getTime() / 1000 - result[i].lastFetchAt.getTime() / 1000 > config[subject].cacheLifeTime) {
                return null;
            }
        }
    } else if (method === "findAllBy") {
        if (!isNull(state.api[subject].metadata[`findAllBy-${prop}`])
            && new Date().getTime() / 1000 - state.api[subject].metadata[`findAllBy-${prop}`].getTime() / 1000 > config[subject][`cacheLifeTimeFindAllBy_${prop}`]) {
            return null;
        }

        for (let i = 0; i < result.length; i++) {
            if (isNull(result[i])) {
                continue;
            }

            if (new Date().getTime() / 1000 - result[i].lastFetchAt.getTime() / 1000 > config[subject].cacheLifeTime) {
                return null;
            }
        }
    }

    return result;
}
