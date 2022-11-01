import { Register } from './components/Register.tsx';
import { Main } from './components/Main.tsx';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="nav">
          <div className="link-item">
            <Link to="/main">Main</Link>
          </div>
          <div className="link-item">
            <Link to="/register">Register</Link>
          </div>
        </nav>
        <Routes>
          <Route
            path="/main"
            element={<Main />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
