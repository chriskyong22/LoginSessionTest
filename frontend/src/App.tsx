import React, { useState } from 'react';
import './Stylesheets/App.css';
import { LoginContainer } from "./Components/LoginContainer"
import { LogoutContainer } from "./Components/LogoutContainer"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn && 
        <LoginContainer
          setIsLoggedIn={setIsLoggedIn}
        />
      }

      {isLoggedIn && 
        "You are logged in." &&
        <LogoutContainer
          setIsLoggedIn={setIsLoggedIn}
        />
      }
    </div>
  );
}

export default App;
