import { PropsStop, StopLocation  } from "../interfaces";

function BusStop(props:PropsStop){
    let info = props.stop.StopLocation;

    let handleClick = ()=>{ 
        props.setFavoriteStop({extId: info.extId, name: info.name}) 
        props.sethiddStops(false)
    }

    return(
        <article>
            <h3>{info.name}</h3>
            <button onClick={  handleClick }>Spara hållplats</button>
        </article>
    )
}
export default BusStop
export type {StopLocation, PropsStop}