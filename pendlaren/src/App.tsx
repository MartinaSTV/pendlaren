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
import { FavoriteStopType, CoordsType, ResponseData } from './interfaces'
import TimePlace from './components/TimePlace'

function App() {
  const [message, setMessage] = useState('')
  
  const [coords, setcoords] = useState<CoordsType>({ longitude: 0, lattitude: 0})
  const [Stops, setStops] = useState<ResponseData[]>([])
  const [favoriteStop, setFavoriteStop] = useState<FavoriteStopType | null >(null)
  const [times, setTimes]= useState([])
  console.log('Times: ', times)
  
  let stopLocation = Stops.map((stop: ResponseData)=>{
    return <BusStop stop = { stop } key = {stop.StopLocation.extId} setFavoriteStop = { setFavoriteStop } />
  })
  
//times= { favoriteStop?.extId===stop.StopLocation.extId ? times : null }
 
  let timetable = times?.map((timeInfo)=>( <TimePlace timeInfo = { timeInfo }/> ))

  
  return (
    <div>
    <h1>Reseplanerare</h1>
    <button onClick={ ()=>{getCordinates(setMessage, setcoords) } }>Planera resa från din plats</button>
    <p>{ message }</p>
    
    <button onClick={ ()=>{getBusStops(coords, setStops) } } >Visa närmaste hållplatser</button>
    <h2>Dina Hållplatser</h2>
    <article>{stopLocation}</article>
    <h2>Din valda hållplats är: { favoriteStop?.name }</h2>
    <button onClick={ ()=>{ getDepatures( favoriteStop, setTimes )} }>visa avgångar</button>
    { times ? timetable : <p>Välj Hållplats</p>}
    
    </div>
    )
  }
  
  export default App
  export type {CoordsType, ResponseData}
  