// hämta kordinater
// hämta hållpltaser
// skriv ut hållplater och visa för användare. Med component?
// Spara hållplats valet från användaren.
// visa avgångar för anvädaren.
//level upp om tid finns

import { useState } from 'react'
import './App.css'
import { getCordinates, getBusStops, getDepatures } from './getCordinates'
import BusStop from './components/Stations'
import { FavoriteStopType, CoordsType, ResponseData, SetTimeTab, SetTimeTables } from './interfaces'
import TimePlace from './components/TimePlace'

function App() {
  //sparar data och uppdaterar
  const [message, setMessage] = useState('')
  const [coords, setcoords] = useState<CoordsType>({ longitude: 0, lattitude: 0})
  const [Stops, setStops] = useState<ResponseData[]>([])
  const [favoriteStop, setFavoriteStop] = useState<FavoriteStopType | null >(null)
  const [times, setTimes]= useState<SetTimeTab | []>([])
  console.log('tiderna',times)
  const [hiddStops, sethiddStops] = useState(true)// döljer hållplatser om false
  
  // skriver ut hållplatser
  let stopLocation = Stops.map((stop: ResponseData)=>{
    return <BusStop stop = { stop } key = {stop.StopLocation.extId} setFavoriteStop = { setFavoriteStop }  sethiddStops={ sethiddStops}/>
  })
 
  //skriver ut tider , finns en bugg när man vill byta hållplats. då måste man trycka på visa hållplatser igen
  let timetable = times?.map((timeInfo:SetTimeTables)=>( <TimePlace timeInfo = { timeInfo } key={ timeInfo.StopExtId}/> ))

  return (
    <div className='travelplaner'>
      <h1>Reseplanerare</h1>
      <button onClick={ ()=>{ getCordinates(setMessage, setcoords) 
        }  }>Planera resa från din plats</button>
      <p>{ message }</p>
        <article className='travalplaner-coords'>
          <p className='coords'>Dina Kordinater : </p>
          <p className='coords'>Lattitude {coords.lattitude}</p>
          <p className='coords'>Longitude {coords.longitude}</p>
        </article>
      {coords.lattitude >0 ?
      <button onClick={  async()=>{ await getBusStops(coords, setStops)
      sethiddStops(true) 
      } } >Visa närmaste hållplatser</button>: null }
      <article>{hiddStops? stopLocation: <p></p>}</article>
      <article>{ Stops.length> 0? <h2>Din valda hållplats är: { favoriteStop?.name }</h2>  : ''} </article>
      { favoriteStop? <button className='button-departures' onClick={ ()=>{ getDepatures( favoriteStop, setTimes )} }>visa avgångar</button>: null}
        { times ? timetable : <p>Välj Hållplats</p>}
    </div>
    )
  }
  
  export default App

  