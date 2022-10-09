import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "Auth";
import store from "store";
import Modal from "components/ui/Modal";
import ParkContainer from "components/ParkContainer";
import StatsContainer from "components/StatsContainer";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Auth>
        <Modal />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ParkContainer />} />
            <Route path="/stats" element={<StatsContainer />} />
          </Routes>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
};

export default App;
