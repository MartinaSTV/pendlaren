import'./timeplace.css'
function TimePlace({timeInfo}){

    return(
        <article className='timetable'>
            <p className='time'>Hållpats: {timeInfo.stop}</p>
                <article className='text'>
                    <p className='time'>Fordon: {timeInfo.name}</p>
                    <p className='time'>Avgång: {timeInfo.time}</p>
                </article>
        </article>
    )
}
export default TimePlace