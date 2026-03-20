// src/pages/auth/callback.tsx
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import { useContext, useEffect } from 'react';

export default function AuthCallback() {
    const navigate = useNavigate();

    const { userService: userService } = useContext(DependencyContext);

    useEffect(() => {

        async function handleMicrosoftLoginCallback() {

            let result = await userService.MicrosoftLoginCallBack();
            if (result)
                navigate("/");

        }

        handleMicrosoftLoginCallback();

    }, []);


    return (
        <div>
            <h2>Processing authentication...</h2>
            <p>Please wait while we log you in.</p>
        </div>
    );


}
