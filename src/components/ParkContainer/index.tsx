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
  const [saveError, setSaveError]= useState<string | undefined>();
  const { loading, parks } = useParks(selectedDropdownItem);
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);

  useEffect(() => {
    const stored = loadState() || [];
    setSelectedParks(stored);
  }, []);

  const saveToStorage = () => {
    saveState(selectedParks);
  };

  const handleSubmit = async () => {
    try {
      await updateParks(selectedParks);
    } catch (err: any) {
      setSaveError('Your changes could not be saved. Please try again later.')
    }
  };

  const handleListItemChange = (item: string) => {
    setSelectedDropdownItem(item);
    // save to storage or save data
    if (isLoggedIn) {
      handleSubmit();
    } else {
      saveToStorage();
    }
  };

  const handleChange = (parks: string[]) => {
    setSelectedParks(parks);
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
        saveError={saveError}
      />
    </PageWrapper>
  );
};

export default ParkContainer;
