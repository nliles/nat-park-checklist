import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth, { ProtectedRoute } from "Auth";
import store from "store";
import ParkContainer from "screens/Checklist/ParkContainer";
import StatsContainer from "screens/Stats/StatsContainer";
import "./index.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Auth>
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
          <div id="modal-root" />
        </BrowserRouter>
      </Auth>
    </Provider>
  );
};

export default App;
