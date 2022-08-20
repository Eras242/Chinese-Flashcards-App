import "./stylesheets/App.css";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import ThemeContext from "./context/ThemeContext";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Main from "./components/Main";

function App() {
  return (
    <ThemeContext>
      <AppContext>
        <div className="App">
          <Stats />
          <Header />
          <Main />
        </div>
      </AppContext>
    </ThemeContext>
  );
}

export default App;
