import React from "react";
import { Provider } from "react-redux";
import store from "store";
import Modal from "components/ui/Modal";
import ParkContainer from "components/ParkContainer";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Modal />
      <ParkContainer />
    </Provider>
  );
};

export default App;
