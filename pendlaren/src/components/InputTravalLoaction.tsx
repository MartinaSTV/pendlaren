import { useState } from "react"

function InputTravalLocation(){

    const[ locationDeparture , setlocationDeparture]= useState('')
    const[ locationDestination , setlocationDestination]= useState('')

    return(
        <article>
            <p>Resfrån</p>
            <input type="text" placeholder="avgång" onChange={ (e)=>{ setlocationDeparture(e.target.value) }}/>
            <p>Destination</p>
            <input type="text" placeholder="Destination" onChange={ (e)=>{ setlocationDestination(e.target.value) }  }/>
            <button>sök resa</button>
        </article>
    )
}
export default InputTravalLocation