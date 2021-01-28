import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Switch, Route} from "react-router-dom";

import React, {Suspense, lazy} from "react";
import Loading from "./components/Loading";


const Home = lazy(() => {
    import("./pages/Home");
});
const History = lazy(() => {
    import("./pages/History");
});
const About = lazy(() => {
    import("./pages/About");
});

function App() {
    return (
        <div className="app">
            <Header/>
            <Suspense fallback={Loading}>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/about" exact component={About}/>
                    <Route path="/history" exact component={History}/>
                </Switch>
            </Suspense>
            <Footer/>
        </div>
    );
}

export default App;
