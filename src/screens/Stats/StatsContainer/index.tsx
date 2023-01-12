import { useSelector } from "react-redux";
import { State } from "reducers/types";
import PageWrapper from "components/PageWrapper";
import useSelectedParks from "hooks/useSelectedParks";
import latLong from "data/latLong";
import StatsPage from "screens/Stats/StatsPage";

const StatsContainer = () => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const { selectedParks } = useSelectedParks(isLoggedIn);
  return (
    <PageWrapper>
      <StatsPage selected={selectedParks} parks={latLong} />
    </PageWrapper>
  );
};

export default StatsContainer;
