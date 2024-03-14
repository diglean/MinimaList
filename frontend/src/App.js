import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/system';

import AppBar from "./components/LogoBar";
import BottomNavigation from './components/BottomNavigation';

import styles from './App.css';

import theme from './components/theme';

import Lists from "./pages/Lists";
import Config from "./pages/Config";
import Profile from "./pages/Profile";
import SelectedItems from "./pages/SelectedItems";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {window.location.pathname !== '/selected-items' && (<AppBar/>)}
        <Routes>
          <Route path="/" element={ <Lists/> }/>
          <Route path="/lists" element={ <Lists/> }/>
          <Route path="/config" element={ <Config/> }/>
          <Route path="/profile" element={ <Profile/> }/>
          <Route path="/selected-items" element={ <SelectedItems/> }/>
        </Routes>
        {window.location.pathname !== '/selected-items' && (<BottomNavigation/>)}
      </Router>
    </ThemeProvider>
  )
}

export default App;
