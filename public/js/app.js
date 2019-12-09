console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#messageOne')
const messageTwo=document.querySelector('#messageTwo')

//messageOne.textContent='PASSING TEXT TO #MESSAGEONE'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    messageOne.textContent='Loading....'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecastData.temperature+' '+data.forecastData.rain_chance+' '+data.forecastData.summary
            }
        })
    })
})