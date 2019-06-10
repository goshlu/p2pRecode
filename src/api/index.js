export const fetchNav = "p2pMenu";
import request from "../request";

export const fetchUser = () => request("/user").then(res => res.data.datas);

export const fetchRest = (params) => request
("/refund/refunds",{params}).then(
    res => {
        return res.data;
        // console.log(res.data.data);
    }
        
    );
    export const fetchRecode = (params) => request
    ("/refund/record",{params}).then(
        res => {
           return res.data;
        }
            
        );
// export const fetchRecode = (params) => request("/refund/record",{params}).then(res => res.data.datas);
// export const fetchRest = (username,phone,status,page,limit) => request("/refund/refunds").then(res => res.data.datas);
export const fetchAdd = () => request("/add").then(res => res.data.datas);
export const fetchBorrow = () => request("/borrow").then(res => res.data.datas);
export const fetchInv = () => request("/Inv").then(res => res.data.datas);