
export default function dateFormator(isoString){
    const now = new Date();
    const past = new Date(isoString);
    const seconds = Math.floor((now - past)/10000)

    const intervals = {year:31536000, month:2592000, day:86400, hour:3600, minute:60};
    for(const [unit, secondsInUint] of Object.entries(intervals)){
        const interval = Math.floor(seconds/secondsInUint);
        if(interval>=1){
            return `${interval} ${unit}${interval>1?'s':''} ago`;
        }
    }
    return 'just now'
}
