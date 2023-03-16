console.log('Client side JS file has loaded')


const formelem = document.querySelector('form')
const searchElem = document.querySelector('input')

formelem.addEventListener('submit', (e)=> {

    e.preventDefault()

    const searchTerm=searchElem.value
    console.log(searchTerm)

    const locElem = document.querySelector("#loc")
    const forecastElem = document.querySelector("#fore")

    locElem.textContent = 'Results are loading....'
    forecastElem.innerHTML = ''


    fetch('http://localhost:3000/weather?address='+searchTerm).then((response)=> {
    response.json().then((data) => {
           

        if(data.error){
            console.log(data.error)
            locElem.innerHTML = data.error        
        }
        else
        {            
            locElem.innerHTML = data.location
            forecastElem.innerHTML = data.forecast
            
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})
})