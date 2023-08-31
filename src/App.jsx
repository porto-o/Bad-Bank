// App.js
import React from "react";
import { DataProvider } from "./context/DataContext";
// App.js
import NavBar from "./routes/NavBar";

function App() {
  return (
    <DataProvider>
      <div >
        <NavBar />
      </div>
      
    </DataProvider>
  );
}

export default App;
