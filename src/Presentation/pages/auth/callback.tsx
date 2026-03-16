// src/pages/auth/callback.tsx
import { DependencyContext } from '../../../context/DependencyContext';
import { useContext, useEffect} from 'react';

export default function AuthCallback() {

    const { relocationService: relocationService,userService: userService } = useContext(DependencyContext);
    
    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        userService.MicrosoftLoginCallBack();

       

        


      
    }, []);


    return (
        <div>
            <h2>Processing authentication...</h2>
            <p>Please wait while we log you in.</p>
        </div>
    );

 
}
