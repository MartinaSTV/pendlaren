interface PropsStop{
   // setFavoriteStop: ()={},
    stop: {
        StopLocation:{
            exId: String
            name: String
        }
    }
}

function BusStop(props:PropsStop){
    console.log(props)
    let info = props.stop.StopLocation;

    

    function saveStop(){
    



    }
 
    return(
        <article>
            <h3>{info.name}</h3>
            <button onClick={ saveStop}>Spara hållplats</button>
        </article>
    )

}
export default BusStop