const NOTION_API_KEY = 'API';
const NOTION_DATABASE_ID = 'your-database-id';

async function fetchData() {
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-08-16', // Update with the latest Notion API version
      },
      body: JSON.stringify({
        // Your query here
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Notion.');
    }

    const data = await response.json();
    // Process and use the data in your React components.
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
