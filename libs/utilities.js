function Fdate(stringDate){
    const today = new Date();

    const newDate = new Date(stringDate);
    const fullDate = newDate.toDateString()
  

    const M = newDate.getMinutes()
    const h = newDate.getHours()
    const s = newDate.getSeconds()
    return `${h}:${M} - ${fullDate}`
}

function viewFormater(num=Number){

    if (num < 1000){
        console.log(num)
        return num
    }

    if(num >= 100 && num < 1000000){
        console.log(`${(num/1000).toFixed(1)}K`)
        return `${(num/1000).toFixed(1)}K`
    }
    if(num >= 1000000 && num < 1000000000){
        console.log(`${(num/1000000).toFixed(1)}M`)
        return `${(num/1000000).toFixed(1)}M`
    }
    
    if(num >= 1000000000 && num < 1000000000000){
        console.log(`${(num/1000000000).toFixed(1)}B`)
        return `${(num/1000000000).toFixed(1)}B`
    }

    if(num >= 1000000000000){
        console.log(`${(num/1000000000000).toFixed(1)}T`)
        return `${(num/1000000000000).toFixed(1)}T`
    }

    console.log(num)
}


export {Fdate, viewFormater};