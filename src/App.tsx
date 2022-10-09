import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth, { ProtectedRoute } from "Auth";
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
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <StatsContainer />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
};

export default App;
