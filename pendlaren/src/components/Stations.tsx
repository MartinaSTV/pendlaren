interface PropsStop{
    setFavoriteStop: ({})=> void,
    stop: {
        StopLocation: StopLocation
    }
}
interface StopLocation{
    extId: String,
    name: String
}

function BusStop(props:PropsStop){
    //console.log(props)
    let info = props.stop.StopLocation;

    return(
        <article>
            <h3>{info.name}</h3>
            <button onClick={ ()=>{ props.setFavoriteStop({extId: info.extId, name: info.name}) } }>Spara hållplats</button>
        </article>
    )

}
export default BusStop
export type {StopLocation}