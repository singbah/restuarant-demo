function Fdate(stringDate){
    const today = new Date();

    const newDate = new Date(stringDate);
    const fullDate = newDate.toDateString()
  

    const M = newDate.getMinutes()
    const h = newDate.getHours()
    const s = newDate.getSeconds()
    return `${h}:${M} - ${fullDate}`
}

export default Fdate;