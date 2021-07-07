import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./component/utils/Header";
import Footer from "./component/utils/Footer";
import Home from "./component/Home";
import Policy from "./component/Policy";
import NoteFound from "./component/NotFound";
import Disclaimar from "./component/Desclimar";
import About from "./component/About";
import GraphPage from "./component/GraphPage";
import ReactGa from "react-ga";

function App() {
  useEffect(() => {
    ReactGa.initialize("UA-199112654-1");
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div className="bodyWrapper">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/policy">
            <Policy />
          </Route>
          <Route path="/disclaimer">
            <Disclaimar />
          </Route>
          <Route path="/about_us">
            <About />
          </Route>
          <Route path={"/:id"}>
            <GraphPage />
          </Route>
          <Route path="*">
            <NoteFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
