
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

export const convertNumberDecimal=(numberDecimal)=>{
    const strArr = JSON.stringify(numberDecimal).split('"')
    if(strArr.length >= 4){
        return strArr[3];
    }
    return ""
};

export const getTimeAgo = (createdTime)=> {

    var templates = {
        prefix: "",
        suffix: ' ago',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };
    const template = function(t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    const timer = function(time) {
        if (!time)
            return;
        
        let seconds = (Date.now() - Date.parse(time))/1000;
        let minutes = seconds / 60;
        let hours = minutes / 60;
        let days = hours / 24;
        let years = days / 365;

        const compose= function(){
            if(seconds < 45)
                return template('seconds', seconds)
            else if (seconds < 90)
                return template('minute', 1)
            else if (minutes < 90) 
                return template('hour', 1)
            else if (hours < 24)
                return template('hours', hours)
            else if (hours < 42)
                return template('day', 1)
            else if (days < 30)
                return template('days', days)
            else if (days < 45)
                return template('month', 1)
            else if (days < 365)
                return template('months', days / 30)
            else if (years < 1.5)
                return template('year', 1)
            else
                return template('years', years)
        }
        return templates.prefix + compose() + templates.suffix;
    };
    
    return timer(createdTime)
}