import React, { useState } from 'react';
import './CardForm.css';
import EmojiPicker from 'emoji-picker-react';

function CardForm({ addCard }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [textOrientation, setTextOrientation] = useState('landscape');
  const [emoji, setEmoji] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [apiKey, setApiKey] = useState(''); // Add state for API key
  const [dbName, setDbName] = useState(''); // Add state for database name

  // Function to handle emoji click
  const handleEmojiClick = (emojiData, event) => {
    console.log('Emoji Data: ', emojiData); // Debugging line
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    addCard(title, subtitle, textOrientation, emoji);
    setTitle('');
    setSubtitle('');
  };

  // Function to fetch data from Notion
  const fetchNotionData = async () => {
    try {
      // Fetch data from Notion using apiKey and dbName
      const data = await fetchDataFromNotion(apiKey, dbName); // Replace with your actual fetch function
      return data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching Notion data:', error);
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="Subtitle"
      />
      <select
        value={textOrientation}
        onChange={(e) => setTextOrientation(e.target.value)}
      >
        <option value="portrait">Portrait</option>
        <option value="landscape">Landscape</option>
      </select>
      <input
        type="text"
        value={emoji || ''}
        onClick={() => setShowEmojiPicker(true)}
        placeholder="Click to select an emoji"
        readOnly
      />
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      <button type="submit">Add Card</button>

      {/* Add input fields for API key and database name */}
      {/* <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="API Key"
      />
      <input
        type="text"
        value={dbName}
        onChange={(e) => setDbName(e.target.value)}
        placeholder="Database Name"
      />
      <button
        type="button"
        onClick={fetchNotionData}
      >
        Fetch Notion Db
      </button> */}
    </form>
  );
}


const fetchDataFromNotion = async (apiKey, dbName) => {
    try {
      // Define the Notion API endpoint for database query
      const endpoint = `https://api.notion.com/v1/databases/${dbName}/query`;
  
      // Make the HTTP request to the Notion API
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2021-08-16', // Use the desired Notion API version
        },
        body: JSON.stringify({
          // Define your query based on the database structure
          // You can specify filters, sorts, and other query parameters here
          // Example query to retrieve all items in the database:
          // {
          //   "filter": {},
          //   "sorts": [{ "property": "created_time", "direction": "ascending" }]
          // }
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Process and return the data as needed
        return data;
      } else {
        throw new Error('Failed to fetch data from Notion');
      }
    } catch (error) {
      console.error('Error fetching data from Notion:', error);
      throw error;
    }
  };
  

export default CardForm;
