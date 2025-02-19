
// CUSTOM DATE
export const formatDate = (date) => {
    const newDate = new Date(date)
    const formatter = Intl.DateTimeFormat('es-CU', {
	dateStyle: 'medium',
	timeStyle: 'medium',
	hour12: true,
	timeZone: 'America/Havana'
    })
    const formattedDate = formatter.format(newDate)

    const yyyy = newDate.getFullYear()
    let mm = newDate.getMonth() + 1
    let dd = newDate.getDate()
    let hh = newDate.getHours()
    let min = newDate.getMinutes()
    let sec = newDate.getSeconds()

    if (dd < 10) dd = `0${dd}`
    if (mm < 10) mm = `0${mm}`
    if (hh < 10) hh = `0${hh}`
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`

//    return `${dd}-${mm}-${yyyy}.${hh}:${min}:${sec}`
    return `${formattedDate}`
}

// GET YEAR
export const getYear = () => {
    const timestamp = Date.now()
    const date = new Date(timestamp)
    const year = date.getFullYear()
    
    return year
}
