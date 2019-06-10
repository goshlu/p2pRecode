export const fetchNav = "p2pMenu";
import request from "../request";

export const fetchUser = () => request("/user").then(res => res.data.datas);
export const fetchBus = () => request("/bus").then(res => res.data.datas);
export const fetchRest = (params) => request("/refund/refuns",{params}).then(res => res.data.datas);
export const fetchAdd = () => request("/add").then(res => res.data.datas);
export const fetchBorrow = () => request("/borrow").then(res => res.data.datas);
export const fetchInv = () => request("/Inv").then(res => res.data.datas);