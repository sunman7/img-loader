import "./App.css";
import React, {Suspense, lazy} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Switch, Route} from "react-router-dom";

import Loading from "./components/Loading";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import History from "./pages/History";
//懒加载
const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const About = lazy(() => import("./pages/About"));

function App() {
    return (
        <div className="app">
            <Header/>
            <main>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" exact component={About}/>
                        <Route path="/history" exact component={History}/>
                    </Switch>
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
