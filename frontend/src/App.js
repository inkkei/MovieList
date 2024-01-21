import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { About } from "./pages/About";
import { Lists } from "./pages/Lists";
import { DetailMovie } from "./pages/DetailMovie";
import { Account } from "./pages/Account";

import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Movies } from "./pages/Movies";
import { UserContext } from "./components/UserContext";
import { Info } from "./pages/Info";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="wrapper">
      <UserContext.Provider value={{ user }}>
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/about" element={<About />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/account" element={<Account />} />
            <Route path="/movie/:id" element={<DetailMovie />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
