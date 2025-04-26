import urls from './urls.json'

      
export default function ListStatuses(realmid:number) {
  

    var statusdomain = urls["status-domain"];
 
    const url = `${statusdomain}api/status/List?realmid=${realmid}`;

    // Declare an async function inside useEffect
    const fetchData = async () => {
      try {
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
