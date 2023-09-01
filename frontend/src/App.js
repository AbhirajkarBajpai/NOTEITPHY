import AboutPage from './components/Pages/about';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import "./App.css";
import LandingPage from './components/Pages/landing';
import { Routes,Route} from 'react-router-dom';
import Notes from './components/Pages/Notes';
import Login from './components/Pages/login';
import Signup from './components/Pages/signup';
import ProfilePage from './components/Pages/ProfilePage';

function App() {
  return (
    <>
    <Header></Header>
    <main style={{minHeight:"75vh"}}>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </main>
    <Footer></Footer>
    </>
  );
}
export default App;

