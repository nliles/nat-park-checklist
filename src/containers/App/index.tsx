import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToasterAlert from "components/ui/ToasterAlert";
import ProtectedRoute from "components/ProtectedRoute";
import store from "store";
import ParkContainer from "screens/Checklist/ParkContainer";
import StatsContainer from "screens/Stats/StatsContainer";
import "./index.scss";

const App = () => {
  return (
    <Provider store={store}>
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
        <ToasterAlert />
    </Provider>
  );
};

export default App;
