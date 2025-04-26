import urls from './urls.json'

      
export default function ListUsers() {
  
    var usersdomain = urls["users-domain"];
    
    const fetchData = async () => {
      try {

        var url = `${usersdomain}${urls["users-list"]}`;   

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return data;

      } catch (error) {
        console.error(error);
      }
    };

    return  fetchData(); // Call the async function
  
}
