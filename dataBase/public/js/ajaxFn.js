function ajaxFn(parms,method,url,callback,async) {
    let httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject("microsoft.XMLHttp")) {
        httpRequest = new ActiveXObject("microsoft.XMLHttp");
    }
    async=async || true;
    if(method.toLowerCase()=="post"){
        httpRequest.open("post", url, async);
    }else if(method.toLowerCase()=="get"){
        httpRequest.open("get", url+"?"+parms, async);
    }

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
           callback(httpRequest.responseText);
        }
    };
    if(method.toLowerCase()=="post"){
        httpRequest.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        httpRequest.send(parms);
    }else if(method.toLowerCase()=="get"){
        httpRequest.send();
    }

}