import { useSelector } from "react-redux";
import { State } from "reducers/types";
import PageWrapper from "components/PageWrapper";
import useSelectedParks from "hooks/useSelectedParks";
import StatsPage from "screens/Stats/StatsPage";
import useParks from "hooks/useParks";

const StatsContainer = () => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const { selectedParks } = useSelectedParks(isLoggedIn);
  const { parks } = useParks();
  return (
    <PageWrapper>
      <StatsPage selected={selectedParks} parks={parks} />
    </PageWrapper>
  );
};

export default StatsContainer;
