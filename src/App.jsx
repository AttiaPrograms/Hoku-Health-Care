import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AboutUs from "./components/about/AboutUs";
import AboutPage from "./pages/AboutPage";
import ReviewPage from "./pages/ReviewPage";
import "./index.css";

function App(){
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<AdminDashboard/>} />
       <Route path="/about" element={<AboutUs />} />
       <Route path="/aboutpage" element={<AboutPage/>} />
       <Route path="/review" element={<ReviewPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;