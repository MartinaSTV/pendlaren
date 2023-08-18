import { useState } from "react"

function InputTravalLocation(){

    return(
        <article>
            <p>Resfrån</p>
            <input type="text" placeholder="avgång" onChange={ ()=>{ }}/>
            <p>Destination</p>
            <input type="text" placeholder="Destination" />
        </article>
    )
}