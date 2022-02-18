

const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response.data)

    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

// create constant to hold DOM Elements
const DOM_Elements = {
    racers: '.racer-list'
}

// Create racer list html
const createRacer = (position, firstName, lastName, nationality, sponsor, points) =>{
    const html = `<a href='#' class= 'list-group-item list-group-item-action list-group-item-light' > - - - - - - - ${position} - - - - - - -</a>
    <a href='#' class= 'list-group-item list-group-item-action list-group-item-light' >${firstName} ${lastName}  (${nationality})  /  ${sponsor}</a>   
    <a href='#' class= 'list-group-item list-group-item-action list-group-item-light' >Points: ${points}</a>`
 

    // "Paste" new list item on document
    document.querySelector(DOM_Elements.racers).insertAdjacentHTML("beforeend", html)
}

// Function to load each racer
const loadData = async (season, round) =>{
    const racerList = await getData(season, round);

    racerList.forEach(racer => createRacer(racer['position'], racer.Driver['givenName'], racer.Driver['familyName'], racer.Driver['nationality'],
    racer.Constructors[0]['constructorId'], racer['points']));
}

// Grabbing Form Data From a Submit Event
const form = document.querySelector('#getDataForm')

console.log(form)
// Add Event Listener for submit event(s)
form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    let season = document.querySelector('#season').value
    let round = document.querySelector('#round').value

    console.log(event)
    console.log(season, round)
    loadData(season, round)
})


