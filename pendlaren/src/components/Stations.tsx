import { PropsStop} from "../interfaces";

function BusStop(props:PropsStop){
    let info = props.stop.StopLocation;
    console.log(info)
    
    let handleClick = ()=>{ 
        props.setFavoriteStop({extId: info.extId, name: info.name , dist: info.dist}) 
        props.sethiddStops(false)
    }

    return(
        <article>
            <p>{info.dist}m till hållplats</p>
            <h3>{info.name}</h3>
            <button onClick={  handleClick }>Spara hållplats</button>
        </article>
    )

}
export default BusStop
