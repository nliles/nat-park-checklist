import PageWrapper from "components/PageWrapper";
import { useSelectedParks } from "hooks";
import latLong from "data/latLong";
import StatsPage from "screens/Stats/StatsPage";

const StatsContainer = () => {
  const { selectedParks } = useSelectedParks();
  return (
    <PageWrapper>
      <StatsPage selected={selectedParks} parks={latLong} />
    </PageWrapper>
  );
};

export default StatsContainer;
