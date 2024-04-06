import { useSelector } from "react-redux";
import { State } from "reducers/types";
import PageWrapper from "components/PageWrapper";
import useSelectedParks from "hooks/useSelectedParks";
import useParks from "hooks/useParks";
import StatsPage from "screens/Stats/StatsPage";

const StatsContainer = () => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const { selectedParks } = useSelectedParks(isLoggedIn);
  const { parks, total } = useParks();
  return (
    <PageWrapper>
      <StatsPage selected={selectedParks} parks={parks} total={total} />
    </PageWrapper>
  );
};

export default StatsContainer;
