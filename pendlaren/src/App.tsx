// hämta kordinater
// hämta hållpltaser
// skriv ut hållplater och visa för användare. Med component?
// Spara hållplats valet från användaren: Spara i localStorage eller redux eller skicka props.
// visa avgångar för anvädaren.
//level upp om tid finnss

import { useState } from 'react'
import './App.css'
import { getCordinates, getBusStops, getDepatures } from './getCordinates'
import BusStop from './components/Stations'

interface CoordsType{
  longitude: number,
  lattitude: number
}
interface ResponseData{
  StopLocation: ResponseDataLocation[]
}
interface ResponseDataLocation{name: String, id: String }

function App() {
  const [message, setMessage] = useState('')

  const [coords, setcoords] = useState<CoordsType>({ longitude: 0, lattitude: 0})
  const [Stops, setStops] = useState<ResponseData[]>([])
  const [favoriteStop, setFavoriteStop] = useState({})
 
   let stopLocation = Stops.map((stop)=>{

   return <BusStop stop = { stop } key = {stop.StopLocation.id} setFavoriteStop = { setFavoriteStop } /> 

  })

  return (
    <div>
      <h1>Reseplanerare</h1>
      <button onClick={ ()=>{getCordinates(setMessage, setcoords) } }>Planera resa från din plats</button>
      <p>{ message }</p>

      <button onClick={ ()=>{getBusStops(coords, setStops) } } >Visa närmaste hållplatser</button>
      <h2>Dina Hållplatser</h2>
      <article>{stopLocation}</article>
      <h2>Din valda hållplats är: { favoriteStop.name }</h2>
      <button onClick={ ()=>{ getDepatures( favoriteStop )} }>visa avgångar</button>
  
    </div>
  )
}

export default App
export type {CoordsType, ResponseData}
