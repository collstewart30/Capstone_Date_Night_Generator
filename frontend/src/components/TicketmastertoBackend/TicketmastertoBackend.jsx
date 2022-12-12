import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketmastertoBackend = () => {

    const [user, setUser] = useState('');
    const [event_id, setEvent_id] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [eventType, setEventType] = useState('');
    const [state, setState] = useState('');
    const [saveCurrent, setSaveCurrent] = useState('');
    const [saveFuture, setSaveFuture] = useState('');
    const [completed, setCompleted] = useState('');
    const [isFavorite, setIsFavorite] = useState('');


    let recordTicketmasterData = {
        user: user,
        event_id: event_id,
        name: name,
        url: url,
        image: image,
        eventType: eventType,
        state: state,
        saveCurrent: saveCurrent,
        saveFuture: saveFuture,
        completed: completed,
        isFavorite: isFavorite
    }


    function handleSubmit(event) {
        event.preventDefault();
        
    }

    return ( 
        console.log('Send Tickemaster Data to Backend')
     );
}
 
export default TicketmastertoBackend;