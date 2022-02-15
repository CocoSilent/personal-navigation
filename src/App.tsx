import React from "react";
import Header from "./components/Header";
import BaiDu from "./components/BaiDu";
import Nav from "./components/Nav";
// import Footer from "./components/Footer";

function App() {
    return (
        <div className="app">
            <Header />
            <BaiDu />
            <Nav />
            {/*<Footer />*/}
        </div>
    )
}

export default App;
