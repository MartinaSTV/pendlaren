import { CoordsType } from "./App"
import { StopLocation } from "./interfaces"
import { SetMessageType, SetCoordsType, SetStops, SetTimeTab } from "./interfaces"

function getCordinates(setMessage: SetMessageType, setcoords:SetCoordsType ){
//Hämta kordinatater från webbläsaren med navigator och spara i useState i app. Gör en async på denna
    if( 'geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition )=>{

            const lat = position.coords.latitude
            const lon = position.coords.longitude
            console.log(lat, lon)
            setcoords({ longitude: lon, lattitude: lat })
            setMessage('')

        }, error =>{
            console.log('Please enable position to use this app')
            setMessage( 'Please enable position to use this app')
        })
    }
}

async function getBusStops(coords: CoordsType, setStops: SetStops){
//skicka med kordinater till API och spara hållplatser i useState i App
    console.log(coords.lattitude)

    const API = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${ coords.lattitude }&originCoordLong=${ coords.longitude}&format=json&accessId=${import.meta.env.VITE_API_KEY }`

    const response = await fetch( API)
    const data = await response.json()
    console.log(data)
    console.log(data.stopLocationOrCoordLocation)

    setStops(data.stopLocationOrCoordLocation)  
}

async function getDepatures(stopInfo: StopLocation, setTimes: SetTimeTab){
    //skicka med extId och hämta departure samt en Error if location not valid
    console.log(stopInfo.extId)
    const API_KEY: string = import.meta.env.VITE_API_KEY;

    let url =` https://api.resrobot.se/v2.1/departureBoard?id=${ stopInfo.extId }&format=json&accessId=${ API_KEY}`

    const response = await fetch(url)
    const data = await response.json() 
    console.log(data)
    setTimes(data.Departure)
}

export { getCordinates, getBusStops, getDepatures }