import { useState } from "react";
import { CALENDER_DATA } from "../../constant";

const Calender = () => {

    const [events , setEvents] = useState(CALENDER_DATA.events);

    return <div className="calender flex flex-col">
        <p className="font-bold py-5">Upcoming Events</p>
        <ul>
            { events.length > 0 ? events.map((ev , index) => 
                <li key={index} className="flex flex-row justify-between">
                    <span>{ev.title}</span>
                    <button>Register</button>
                </li> 
            ) : <div>No Upcoming events !</div>}
        </ul>
    </div>
}

export default Calender;
