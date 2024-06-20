import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login/> }/>
      <Route path="/search" element={ <Search/> }/>
      <Route path="/album/:id"/>
      <Route path="/favorites"/>
      <Route path="/profile"/>
      <Route path="/profile/edit"/>
      <Route path="*/"/>
    </Routes>
  );
}

export default App;
