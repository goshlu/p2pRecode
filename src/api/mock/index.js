import low from "lowdb";
import LocalStorageAdapters from "lowdb/adapters/LocalStorage";
const db = low(new LocalStorageAdapters("mock-data"));
import defaults from "./defaults";
db.defaults(defaults).write();

export const fetchRest = async (/* search */) => {
    const data = db.get("paymentHistory").value();
    return {
        status: 200,
        msg: "success",
        data,
        count: data.length
    };
};

export const fetchRecode = async (/* search */) => {
    const data = db.get("paymentManagement").value();
    return {
        status: 200,
        msg: "success",
        data,
        count: data.length
    };
};

export const updateStatus = async (id, status) => {
    db.get("paymentManagement")
        .find({ id })
        .assign({ status })
        .write();
    return {
        status: 200
    };
};

