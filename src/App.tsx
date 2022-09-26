import { Provider } from "react-redux";
import Auth from "Auth";
import store from "store";
import Modal from "components/ui/Modal";
import ParkContainer from "components/ParkContainer";
import "./App.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Auth>
        <Modal />
        <ParkContainer />
      </Auth>
    </Provider>
  );
};

export default App;
