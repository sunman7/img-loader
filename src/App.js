import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import History from "./pages/History";

function App() {
    return (
        <div className="app">
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" exact component={About}/>
                <Route path="/history" exact component={History}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default App;
