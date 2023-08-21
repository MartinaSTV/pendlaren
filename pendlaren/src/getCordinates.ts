
import { SetStops, SetTimeTab, CoordsType, StopLocation } from "./interfaces"

async function getCordinates(): Promise<CoordsType>{
    return new Promise ((resolve, reject) => {
        if( 'geolocation' in navigator){

                navigator.geolocation.getCurrentPosition(pos => {

                    const position: CoordsType = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                    resolve(position)
                    }, error => {
                    reject(error.message)
                })

            } else{
                reject('Please upgrade your browser to use this web app.')
            }
    })
}

async function getBusStops(coords: CoordsType, setStops: SetStops){
//skicka med kordinater till API och spara hållplatser i useState i App
    console.log(coords.latitude)

    const API = `https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=${ coords.latitude }&originCoordLong=${ coords.longitude}&format=json&accessId=${import.meta.env.VITE_API_KEY }`

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

async function getData(){ 

    let response =  await fetch(`https://api.resrobot.se/v2.1/trip?format=json&originId=740000001&destId=740000003&passlist=true&showPassingPoints=true&accessId=${import.meta.env.VITE_API_KEY}`
    ) 
    const data = await response.json()
    console.log(data)

    }


export { getCordinates, getBusStops, getDepatures, getData }

