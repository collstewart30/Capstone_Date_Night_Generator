import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YelptoBackend = () => {

    const [user, setUser] = useState('');
    const [business_id, SetBusiness_id] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [image_url, setImage_url] = useState('');
    const [cuisine_type, setCuisine_Type] = useState('');
    const [city, setCity] = useState('');
    const [saveCurrent, setSaveCurrent] = useState('');
    const [saveFuture, setSaveFuture] = useState('');
    const [completed, setCompleted] = useState('');
    const [isFavorite, setIsFavorite] = useState('');


    let recordYelpData = {
        user: user,
        business_id: business_id,
        name: name,
        url: url,
        image_url: image_url,
        cuisine_type: cuisine_type,
        city: city,
        saveCurrent: saveCurrent,
        saveFuture: saveFuture,
        completed: completed,
        isFavorite: isFavorite
    }


// URL first in axios. POST and PUT: request body data

    function handleSubmit(event) {
        event.preventDefault();
        
    }

    return ( 
        console.log('Send Yelp Data to Backend')
     );
}
 
export default YelptoBackend;