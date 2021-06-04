import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./component/utils/Header";
import Footer from "./component/utils/Footer";
import Home from "./component/Home";
import Policy from "./component/Policy";
import NoteFound from "./component/NotFound";
import Disclaimar from "./component/Desclimar";

function App() {
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
