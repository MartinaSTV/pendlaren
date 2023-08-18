// hämta kordinater
// hämta hållpltaser
// skriv ut hållplater och visa för användare. Med component?
// Spara hållplats valet från användaren: Spara i localStorage eller redux eller skicka props.
// visa avgångar för anvädaren.
//level upp om tid finns

import { useState } from 'react'
import './App.css'
import { getCordinates, getBusStops, getDepatures } from './getCordinates'
import BusStop from './components/Stations'
import { FavoriteStopType, CoordsType, ResponseData, setTimeTab, SetTimeTables } from './interfaces'
import TimePlace from './components/TimePlace'

function App() {
  //sparar data och uppdaterar
  const [message, setMessage] = useState('')
  const [coords, setcoords] = useState<CoordsType>({ longitude: 0, lattitude: 0})
  const [Stops, setStops] = useState<ResponseData[]>([])
  const [favoriteStop, setFavoriteStop] = useState<FavoriteStopType | null >(null)
  const [times, setTimes]= useState<setTimeTab>([])
  console.log(times)
  const [hiddStops, sethiddStops] = useState(true)// döljer hållplatser om false
  
  // skriver ut hållplatser
  let stopLocation = Stops.map((stop: ResponseData)=>{
    return <BusStop stop = { stop } key = {stop.StopLocation.extId} setFavoriteStop = { setFavoriteStop }  sethiddStops={ sethiddStops}/>
  })
 
  //skriver ut tider 
  let timetable = times?.map((timeInfo:SetTimeTables)=>( <TimePlace timeInfo = { timeInfo } key={ timeInfo.extId}/> ))

  return (
    <div className='travelplaner'>
    <h1>Reseplanerare</h1>
    <button onClick={ ()=>{getCordinates(setMessage, setcoords) } }>Planera resa från din plats</button>
    <p>{ message }</p>
    <button onClick={ async()=>{ await getBusStops(coords, setStops) } } >Visa närmaste hållplatser</button>
    <article>{hiddStops? stopLocation: <p></p>}</article>
    <article>   { Stops.length> 0? <h2>Din valda hållplats är: { favoriteStop?.name }</h2>  : ''} </article>
   { favoriteStop? <button className='button-departures' onClick={ ()=>{ getDepatures( favoriteStop, setTimes )} }>visa avgångar</button>: null}
      { times ? timetable : <p>Välj Hållplats</p>}
    </div>
    )
  }
  
  export default App
  export type {CoordsType, ResponseData}
  