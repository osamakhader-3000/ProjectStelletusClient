
import React, { useContext, useState } from 'react';
import { DependencyContext } from '../../context/DependencyContext';

export default function TestSecurity(){

     const { userService: authService } = useContext(DependencyContext);
    const [testResult, setTestResult] = useState<string>("");

   

  return (
    <div>
      <h1>Test Security</h1>
      <button onClick={async () => {
        /*
        let resul1 = authService.CreateAccount('testuser', 'testemail@example.com', 'testpassword');
        let resul2 = authService.CreateAccount('testuser2', 'testemail@examples.com', 'testpassword'); 
        let resul3 = authService.CreateAccount('testuser', 'testemail@example.com', 'testpassword'); 
        let resul4 = authService.Test(); */
        
        let resul5 = authService.Test(); 
        setTestResult("Success");
      }}>Run Test</button>
      <br />
      <p>Test Result: {testResult}</p>
    </div>
  );
}