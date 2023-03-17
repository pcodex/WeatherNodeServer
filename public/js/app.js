console.log('Client side JS file has loaded')


const formelem = document.querySelector('form')
const searchElem = document.querySelector('input')

formelem.addEventListener('submit', (e)=> {

    e.preventDefault()

    const searchTerm=searchElem.value
    console.log(searchTerm)

    const locElem = document.querySelector("#loc")
    const forecastElem = document.querySelector("#fore")
    const wtodayElem = document.querySelector("#wtoday")
    const htodayElem = document.querySelector("#htoday")

    locElem.textContent = 'Results are loading....'
    forecastElem.innerHTML = ''
    wtodayElem.innerHTML = ''
    htodayElem.innerHTML = ''


    fetch('/weather?address='+searchTerm).then((response)=> {
    response.json().then((data) => {
           

        if(data.error){
            console.log(data.error)
            locElem.innerHTML = data.error        
        }
        else
        {            
            locElem.innerHTML = '<b>' + data.location + '</b>'
            forecastElem.innerHTML = data.forecast
            wtodayElem.innerHTML = data.wtoday
            htodayElem.innerHTML = data.htoday
            
            console.log(data.location)
            console.log(data.forecast)
            console.log(data.wtoday)
            console.log(data.htoday)
        }
        
    })
})
})