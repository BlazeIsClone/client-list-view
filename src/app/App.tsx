import { Footer, Header } from "components";
import { Router } from "router";
import "./App.css";

export const App = (): JSX.Element => (
  <div className="App">
    <Header />
    <Router />
    <Footer />
  </div>
);
