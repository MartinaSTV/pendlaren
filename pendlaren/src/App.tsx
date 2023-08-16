// hämta kordinater
// hämta hållpltaser
// skriv ut hållplater och visa för användare. Med component?
// Spara hållplats valet från användaren: Spara i localStorage eller redux eller skicka props.
// visa avgångar för anvädaren.


import { useState } from 'react'
import './App.css'
import { getCordinates, getBusStops } from './getCordinates'
import BusStop from './components/Stations'

interface CoordsType{
  longitude: number,
  lattitude: number
}
interface ResponseData{
  StopLocation: { name: String,
                  id: String
                }
}

function App() {
  const [message, setMessage] = useState('')

  const [coords, setcoords] = useState<CoordsType>({ longitude: 0, lattitude: 0})
  const [Stops, setStops] = useState<ResponseData[]>([])
  let [favoriteStop, setFavoriteStop] = useState()

  
  function cordinates(){
    getCordinates(setMessage, setcoords)
  }
  function showStops (){
    getBusStops(coords, setStops)
   }
 
   let stopLocation = Stops.map((stop)=>{

   return <BusStop stop ={ stop } key = {stop.StopLocation.id} setFavoriteStop = { setFavoriteStop } /> 

  })

  return (
    <div>
      <h1>Reseplanerare</h1>
      <button onClick={ cordinates }>Planera resa från din plats</button>
      <p>{ message }</p>

      <button onClick={ showStops } >Visa närmaste hållplatser</button>
      <h2>Dina Hållplatser</h2>
      <article>{stopLocation}</article>
      <h2>Din valda hållplats är: </h2>

    </div>
  )
}

export default App
export type {CoordsType}
