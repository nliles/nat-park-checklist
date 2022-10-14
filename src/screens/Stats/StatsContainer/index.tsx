import PageWrapper from "components/PageWrapper";
import { useParks, useSelectedParks } from "hooks";
import StatsPage from "screens/Stats/StatsPage";

const StatsContainer = () => {
  const { parks } = useParks();
  const { selectedParks } = useSelectedParks();
  return (
    <PageWrapper>
      <StatsPage selected={selectedParks} parks={parks} />
    </PageWrapper>
  );
};

export default StatsContainer;
