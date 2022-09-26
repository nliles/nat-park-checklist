import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

  useEffect(() => {
    const stored = loadState() || [];
    setSelectedParks(stored);
  }, []);

  const saveToStorage = () => {
    saveState(selectedParks);
  };

  const handleListItemChange = (item: string) => {
    setSelectedDropdownItem(item);
    saveToStorage();
  };

  const handleSelected = (parkId: string) => {
    const isSelected = selectedParks.includes(parkId);
    const newItems = [...selectedParks];
    if (isSelected) {
      const index = selectedParks.indexOf(parkId);
      newItems.splice(index, 1);
      setSelectedParks(newItems);
    } else {
      newItems.push(parkId);
      setSelectedParks(newItems);
    }
  };

  return (
    <PageWrapper count={selectedParks.length}>
      <ParkView
        loading={loading}
        selectedParks={selectedParks}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleSelected={handleSelected}
        handleListItemChange={handleListItemChange}
        handleSaveData={saveToStorage}
      />
    </PageWrapper>
  );
};

export default ParkContainer;
