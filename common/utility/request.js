export const formEncode = (obj) => {
    let i = 0;
    var data = '';
    Object.keys(obj).forEach(key => {
        if(i===0){
            data += key + "=" + obj[key];
        }else{
            data += "&" + key + "=" + obj[key];
        }
        i++;
    });
    return data;
}
export const remapChildren = () =>{
    
}
export const baseUrl = 'http://charity.hostober.pk';