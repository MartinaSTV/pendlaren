import { CoordsType } from "./App"
import { ResponseData } from "./App"
import { StopLocation } from "./components/Stations"
type SetMessageType = React.Dispatch<React.SetStateAction<string>>
type SetCoordsType = React.Dispatch<React.SetStateAction<CoordsType>>
type setStops = React.Dispatch<React.SetStateAction<ResponseData[]>>

function getCordinates(setMessage: SetMessageType, setcoords:SetCoordsType ){
//Hämta kordinatater från webbläsaren med navigator och spara i useState i app
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

async function getBusStops(coords: CoordsType, setStops: setStops){
//skicka med kordinater till API och spara hållplatser i useState i App
    console.log(coords.lattitude)

    const API = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${ coords.lattitude }&originCoordLong=${ coords.longitude}&format=json&accessId=${import.meta.env.VITE_API_KEY }`

    const response = await fetch( API)
    const data = await response.json()
    console.log(data)
    console.log(data.stopLocationOrCoordLocation)

    setStops(data.stopLocationOrCoordLocation)  

}

async function getDepatures(stopInfo: StopLocation){
    //skicka med extId och hämta departure samt en Error if location not valid
    console.log(stopInfo.extId)
    const API_KEY: string = import.meta.env.VITE_API_KEY;

    let url =` https://api.resrobot.se/v2.1/departureBoard?id=${ stopInfo.extId }&format=json&accessId=${ API_KEY}`

    const response = await fetch(url)
    const data = await response.json() 
    console.log(data)

}

export { getCordinates, getBusStops, getDepatures }