import { CoordsType } from "./App"
type SetMessageType = React.Dispatch<React.SetStateAction<string>>
type SetCoordsType = React.Dispatch<React.SetStateAction<CoordsType>>

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

async function getBusStops(coords: CoordsType, setStops){

    console.log(coords.lattitude)
    console.log(coords)

    const API_KEY: string = 'acd1d9e9-765b-470e-aa21-cd3889234d83';
    const API = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${ coords.lattitude}&originCoordLong=${ coords.longitude}&format=json&accessId=${API_KEY}`

    const response = await fetch( API)
    const data = await response.json()
    console.log(data)
    console.log(data.stopLocationOrCoordLocation)

    setStops(data.stopLocationOrCoordLocation)  

}

export {getCordinates, getBusStops }