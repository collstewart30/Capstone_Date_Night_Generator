import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NPStoBackend = () => {

    const [user, setUser] = useState('');
    const [event_id, setEvent_id] = useState('');
    const [park_id, setPark_id] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [image_url, setImage_url] = useState('');
    const [park_name, setPark_name] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [saveCurrent, setSaveCurrent] = useState('');
    const [saveFuture, setSaveFuture] = useState('');
    const [completed, setCompleted] = useState('');
    const [isFavorite, setIsFavorite] = useState('');


    let recordNPSData = {
        user: user,
        event_id: event_id,
        park_id: park_id,
        title: title,
        url: url,
        image_url: image_url,
        park_name: park_name,
        state: state,
        description: description,
        type: type,
        saveCurrent: saveCurrent,
        saveFuture: saveFuture,
        completed: completed,
        isFavorite: isFavorite
    }


    function handleSubmit(event) {
        event.preventDefault();
        
    }

    return ( 
        console.log('Sent NPS data to backend')
     );
}
 
export default NPStoBackend;