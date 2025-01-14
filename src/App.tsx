import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/router"; 

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes /> 
      </Router>
    </Provider>
  );
};

export default App;
