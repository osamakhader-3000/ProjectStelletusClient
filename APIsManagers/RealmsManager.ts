import urls from './urls.json'
import Realm from '../DataTransferObjects/Realm'


export default function ListRealms(name:string) {
  
  const realmsdomain = urls['realms-domain'];

    // Declare an async function inside useEffect
    const fetchData = async () => {
      try {

          var url = urls['realms-list']+'?';
          if(name != null)
            url+='name='+name;

        const response = await fetch(realmsdomain + url);
        
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