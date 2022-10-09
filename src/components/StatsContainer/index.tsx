import PageWrapper from "components/PageWrapper";
import { useParks, useSelectedParks } from "hooks";
import StatsPage from "components/StatsPage";
import Header from "components/Header";
import CircularProgressBar from "components/CircularProgressBar";
import DataTable from "components/DataTable";

const StatsContainer = () => {
  const { parks } = useParks();
  const { selectedParks } = useSelectedParks();

  return (
    <PageWrapper count={selectedParks.length}>
      <StatsPage selected={selectedParks} parks={parks} />
    </PageWrapper>
  );
};

export default StatsContainer;
