import request from "../request";

export const fetchUser = () => request("/user").then(res => res.data.datas);
export const fetchBus = () => request("/bus").then(res => res.data.datas);
export const fetchRest = () => request("/rest").then(res => res.data.datas);
export const fetchAdd = () => request("/add").then(res => res.data.datas);
export const fetchBorrow = () => request("/borrow").then(res => res.data.datas);
export const fetchInv = () => request("/Inv").then(res => res.data.datas);

export const fetchNav = "p2pMenu";
export const powerMaZiYuan = "/resource/info"
