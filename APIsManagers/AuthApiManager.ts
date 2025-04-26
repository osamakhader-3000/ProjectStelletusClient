import {User} from '../DataTransferObjects/User'
import {LoginRequest} from '../DataTransferObjects/LoginRequest'
import urls from './urls.json'
import {CallGetAPI} from './APIsCaller'

var securityAppDomain = urls['security-app-domain'];

export function CreateAccount(user:User,afterFunc:Function){
    const saveData = async () => {
      const response = await fetch(securityAppDomain + urls["create-account"], {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        });
        
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem("jwt",token);
          
          if(afterFunc != null && typeof afterFunc == 'function')
          afterFunc();
        
        } else {
          console.log(JSON.stringify(user));
        }
      }
  
      return saveData();
  
  }
  
  export function LoginAccount(loginRequest:LoginRequest){
    const login = async () => {
      const response = await fetch(securityAppDomain + urls["login"], {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
        });

        if(response.ok){
          const data = await response.json();
          const token = data.token;
          localStorage.setItem("jwt",token);         
          return true;   
        }

        return false;

      }
  
      return login();
  }


  export async function CheckLoggedIn() {
    const url = securityAppDomain + urls["check-loggin"];
  
    return await CallGetAPI(url, (response) => {

      if (!response.ok) {
        return false;
      }
  
      return true;
      
    });
  }
  
  export async function Logout() {
    const url = securityAppDomain + urls["logout"];
  
    return await CallGetAPI(url, (response) => {
     
      localStorage.removeItem("jwt");
/*
      if (!response.ok) {
        return false;
      }*/
  
      return true;
      
    });
  }
  
  
    export async function fetchUser(token: string,afterFunc:Function,failed:Function){
        try{
      const response = await fetch(securityAppDomain + urls["secure-user"], {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
            }          
          });
  
          if(response.ok){
            const data = await response.json();            

            if(afterFunc != null && typeof afterFunc == 'function')
              afterFunc(data);            
          }
  
          return false;
        }catch{
          failed();
        }
       
    }


