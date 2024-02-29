import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/system';

import AppBar from "./components/LogoBar";
import BottomNavigation from './components/BottomNavigation';

import styles from './App.css';

import theme from './components/theme';

import Lists from "./pages/Lists";
import Config from "./pages/Config";
import Profile from "./pages/Profile";
import AddItensToList from "./pages/AddItensToList";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {window.location.pathname !== '/additenstolist' && (<AppBar/>)}
        <Routes>
          <Route path="/" element={ <Lists/> }/>
          <Route path="/lists" element={ <Lists/> }/>
          <Route path="/config" element={ <Config/> }/>
          <Route path="/profile" element={ <Profile/> }/>
          <Route path="/additenstolist" element={ <AddItensToList/> }/>
        </Routes>
        {window.location.pathname !== '/additenstolist' && (<BottomNavigation/>)}
      </Router>
    </ThemeProvider>
  )
}

export default App;
