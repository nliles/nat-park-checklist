import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateParks } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "components/ParkView";
import { useParks } from "hooks";
import { PARK_DESIGNATION_KEY } from "../../constants";
import PageWrapper from "components/PageWrapper";
import { loadState, saveState } from "storage/sessionStorage";

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    PARK_DESIGNATION_KEY.NAT_PARK
  );
  const [selectedParks, setSelectedParks] = useState<string[]>([]);
  const { loading, parks } = useParks(selectedDropdownItem);
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);

  useEffect(() => {
    const stored = loadState() || [];
    setSelectedParks(stored);
  }, []);

  const saveToStorage = () => {
    saveState(selectedParks);
  };

  const handleListItemChange = (item: string) => {
    setSelectedDropdownItem(item);
    // save to storage or save data
    if (isLoggedIn) {
      updateParks(selectedParks);
    } else {
      saveToStorage();
    }
  };

  const handleChange = (parks: string[]) => {
    setSelectedParks(parks);
  };

  const handleSubmit = async () => {
    await updateParks(selectedParks);
  };

  return (
    <PageWrapper count={selectedParks.length}>
      <ParkView
        loading={loading}
        selectedParks={selectedParks}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleChange={handleChange}
        handleListItemChange={handleListItemChange}
        handleSaveData={saveToStorage}
        handleSubmit={handleSubmit}
      />
    </PageWrapper>
  );
};

export default ParkContainer;
