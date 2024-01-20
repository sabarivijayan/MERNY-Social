import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recommendation() {
  const [username, setUsername] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/user/profile');
      const { username } = response.data;
      setUsername(username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = () => {
    setIsFollowing(true);
  };

  return (
    <div>
      <h3>Recommendations</h3>
      <div>
        {/* Username */}
        <h3>{username}</h3>
      </div>
      <div>
        {/* Follow button */}
        {isFollowing ? (
          <button disabled>Following</button>
        ) : (
          <button onClick={handleFollow}>Follow</button>
        )}
      </div>
    </div>
  );
}

export default Recommendation;
