import { NamesLocation, SetCordName } from "./interfaces"

async function ReverseGeolocation(lat:number, lon:number, setCoordToName:SetCordName ){

    const numberOfResponses = 2
    //ändrar url till https för en säkrare som krävs för deploy
     const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${numberOfResponses }&appid=${import.meta.env.VITE_API_KEYT}`
    //try catch
     const response = await fetch(url)
     const data:NamesLocation[] = await response.json() 
     setCoordToName(data)

}
export default ReverseGeolocation
