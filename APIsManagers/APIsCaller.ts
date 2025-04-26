export async function CallGetAPI1(url: string, callback?: (data: any) => any): Promise<any> {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return false;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      
      if (callback) {
        return callback(response);
      }
  
      return data; // return the raw data if no callback is passed
  
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  export async function CallGetAPI(url: string, callback?: (data: any) => any): Promise<any> {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return false;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
  
        
      if (callback) {
        return callback(response);
      }        
  
    } 
    catch (error) {
      console.error(error);
      return false;
    }
  }
  