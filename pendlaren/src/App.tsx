
import { useState } from 'react'
import './App.css'
import { getCordinates, getBusStops, getDepatures } from './getCordinates'
import BusStop from './components/Stations'
import { FavoriteStopType, CoordsType, ResponseData, SetTimeTab, SetTimeTables, SetCordName, NamesLocation } from './interfaces'
import TimePlace from './components/TimePlace'
import ReverseGeolocation from './ReverseGeolocation'
import InputTravalLocation from './components/InputTravalLoaction'

function App() {
  //sparar data och uppdaterar
  const [message, setMessage] = useState('')
  const [coords, setcoords] = useState<CoordsType>({ longitude: 0, latitude: 0})
  const [Stops, setStops] = useState<ResponseData[]>([])
  const [favoriteStop, setFavoriteStop] = useState<FavoriteStopType | null >(null)
  const [times, setTimes]= useState<SetTimeTables[]>([])
  const [hiddStops, sethiddStops] = useState(true)// döljer hållplatser om false
  const [cordToName, setCordToName] = useState<NamesLocation[]>([])


  // skriver ut hållplatser
  let stopLocation = Stops.map((stop: ResponseData)=>{
    return <BusStop stop = { stop } key = {stop.StopLocation.extId} setFavoriteStop = { setFavoriteStop }  sethiddStops={ sethiddStops}/>
  })
 
  //skriver ut tider
  let timetable = times?.map((timeInfo:SetTimeTables) =>( <TimePlace timeInfo = { timeInfo } key={ timeInfo.stopExtId}/> ))

  //skriver ut namnet på din plats
  let nameLocation = cordToName?.map((namelocation:NamesLocation)=>( <p className='coords' key={ namelocation.name } >{namelocation.name}</p> ))

  let cordinates = async()=>{ 
    try{
       const pos = await getCordinates(); 
       setcoords(pos);
       await ReverseGeolocation(pos.latitude, pos.longitude, setCordToName);

    }catch(error){
      setMessage( 'Please enable position to use this app');
    }
  } 

  return (
    <div className='travelplaner'>
      <h1>Reseplanerare</h1>
      <button onClick={ cordinates  }>Planera resa från din plats</button>
      <p>{ message }</p>
        <article className='travalplaner-coords'>
          <p className='coords'>Din plats </p>
          {nameLocation}
        </article>
      {coords.latitude > 0 ?
      <button onClick={  async()=>{ await getBusStops(coords, setStops)
      sethiddStops(true)    
      setTimes([])  
      } } >Visa närmaste hållplatser</button> 
      : null }
     {/*  <article>{coords.latitude > 0 ?<InputTravalLocation/>: null}</article> */}
      <article>{hiddStops? stopLocation: <p></p>}</article>
      <article>{ Stops.length> 0? <h2>Din valda hållplats är: { favoriteStop?.name }</h2>  : ''} </article>
      { favoriteStop? <button className='button-departures' onClick={ ()=>{ getDepatures( favoriteStop, setTimes )} }>visa avgångar</button>: null}
      
        { times ? timetable : <p>Välj Hållplats</p>}
    </div>
    )
  }
  
  export default App

  