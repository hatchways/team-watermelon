
export const cutContentLength = (str, limit,defaultStrin)=>{
    if(!str || str == null){
        return defaultStrin
    }
    str = str.toString();
    if(str.length > limit){
        return str.slice(0, limit) + '...'
    }
    return str
}

export const covertNumberDecimal=(numberDecimal)=>{
    const strArr = JSON.stringify(numberDecimal).split('"')
    if(strArr.length >= 4){
        return strArr[3];
    }
    return ""
};