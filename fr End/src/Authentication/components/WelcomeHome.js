import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
import FileCard from './FileCard';
  const WelcomeUser = () => {
    const { id } = useParams(); // Extract the user ID from the URL params
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:5000/app/user/${id}`) // Use the user ID in the URL
        .then(response => response.json())
        .then(data => {
          console.log({data})
          setUser(data.user); 
        })
        .catch(error => console.error('Error fetching user data:', error));
    }, [id]); 
    return (
      <div>
        {user && (
          <>
            <h1>Welcome, {user.UserName}</h1>
            <div>ID: {user._id}</div>
          <FileCard userId={user._id}/>
          </>
        )}
      </div>
    );
  };
  
  export default WelcomeUser;