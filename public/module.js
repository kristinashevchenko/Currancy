const module0 = (function () {
    return{
        getCurr(type,onDate){
            return new Promise(((resolve,reject)=>{
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", `http://www.nbrb.by/API/ExRates/Rates/${type}?ParamMode=2&onDate=${onDate}`, true);
                xmlhttp.onload = function () {
                    if (xmlhttp.status === 200) {
                        resolve(xmlhttp.responseText);
                    }
                    else {
                        reject();
                    }
                };
                xmlhttp.send(null);
            }));
        },
    }
}());