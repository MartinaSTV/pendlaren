import { CoordsType } from "./App"
import { ResponseData } from "./App"
import { StopLocation } from "./components/Stations"
type SetMessageType = React.Dispatch<React.SetStateAction<string>>
type SetCoordsType = React.Dispatch<React.SetStateAction<CoordsType>>
type setStops = React.Dispatch<React.SetStateAction<ResponseData[]>>

function getCordinates(setMessage: SetMessageType, setcoords:SetCoordsType ){

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

const API_KEY: string = 'acd1d9e9-765b-470e-aa21-cd3889234d83';

async function getBusStops(coords: CoordsType, setStops: setStops){

    console.log(coords.lattitude)

    const API = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${ coords.lattitude}&originCoordLong=${ coords.longitude}&format=json&accessId=${API_KEY}`

    const response = await fetch( API)
    const data = await response.json()
    console.log(data)
    console.log(data.stopLocationOrCoordLocation)

    setStops(data.stopLocationOrCoordLocation)  

}

async function getDepatures(stopInfo: StopLocation){
    //skicka med extId och hämta departure
    console.log(stopInfo.extId)

    const response = await fetch(`https://api.resrobot.se/v2.1/departureBoard?id=${ stopInfo.extId }format=json&accessId=${API_KEY}`)
    const data = await response.json() 
    console.log(data)

}

export { getCordinates, getBusStops, getDepatures }