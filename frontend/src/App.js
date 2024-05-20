import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/system';

import AppBar from "./components/LogoBar";
import BottomNavigation from './components/BottomNavigation';

import styles from './App.css';

import theme from './components/theme';

import Lists from "./pages/Lists";
import Config from "./pages/config/Config";
import Profile from "./pages/Profile";
import SelectedItems from "./pages/SelectedItems";

import { TmpItemProvider } from "./context/TmpItemContext";
import LanguageContextProvider from "./context/LanguageContext";
import { UserConfigContext } from "./context/userConfigContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LanguageContextProvider>
        <UserConfigContext>
          <TmpItemProvider>
            <Router>
              <Routes>
                <Route path="/" element={ <Lists/> }/>
                <Route path="/lists" element={ <Lists/> }/>
                <Route path="/config" element={ <Config/> }/>
                <Route path="/profile" element={ <Profile/> }/>
                <Route path="/selected-items" element={ <SelectedItems/> }/>
              </Routes>
            </Router>
          </TmpItemProvider>
        </UserConfigContext>
      </LanguageContextProvider>
    </ThemeProvider>
  )
}

export default App;
