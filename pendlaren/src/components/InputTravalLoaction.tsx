import { useState } from "react"
import { TravalInfo } from "../interfaces"
import './inputtravallocation.css'
import { getData } from "../getCordinates"

//du har ett namn, hämta cordinaterna för namnet.
//hämta avgångar för dessa kordinater.

function InputTravalLocation(){

    const[ locationDeparture , setlocationDeparture]= useState('')
    const[ locationDestination , setlocationDestination]= useState('')

    let traval:TravalInfo = {
        departure: locationDeparture,
        arrival: locationDestination
    }

    function data(){

        getData()
    }
 
    return(
        <article className="travalLocation">
            <p>Resfrån</p>
            <input className="input" type="text" placeholder="avgång" onChange={ (e)=>{ setlocationDeparture(e.target.value) }}/>
            <p>Destination</p>
            <input className="input" type="text" placeholder="Destination" onChange={ (e)=>{ setlocationDestination(e.target.value) }  }/>
            <button className="button" onClick={ data }>sök resa</button>
        </article>
    )
}
export default InputTravalLocation