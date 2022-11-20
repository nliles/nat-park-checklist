import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getParks, updateParks } from "services/park.service";
import { State } from "reducers/types";
import { Response } from "types";
import ParkView from "screens/Checklist/ParkView";
import { useParks } from "hooks";
import { PARK_DESIGNATION_KEY } from "../../../constants";
import getAllParks from "helpers/getAllParks";
import PageWrapper from "components/PageWrapper";
import { loadState, saveState } from "storage/sessionStorage";

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    PARK_DESIGNATION_KEY.NAT_PARK
  );
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [selectedParks, setSelectedParks] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [saveFormRes, setSaveFormRes] = useState<Response | undefined>();
  const { loading, parks } = useParks(selectedDropdownItem);
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);

  useEffect(() => {
    if (!isLoggedIn) {
      setInitialValues([]);
      setSelectedParks([]);
      setSelectedCount(0);
      setSaveFormRes(undefined);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        let data;
        if (isLoggedIn) {
          const { parks } = await getParks();
          data = parks;
        } else {
          const stored = loadState() || {};
          data = stored;
        }
        const currentSelectedParks = data[selectedDropdownItem] || [];
        const total = getAllParks(data);
        setSelectedCount(total - currentSelectedParks.length);
        setInitialValues(currentSelectedParks);
        setSelectedParks(currentSelectedParks);
      } catch (e) {
        // TODO: handle error
      }
    };
    fetchParks();
  }, [isLoggedIn, selectedDropdownItem]);

  const saveToStorage = () => {
    const parks = {
      [selectedDropdownItem]: selectedParks,
    };
    saveState(parks);
  };

  const handleSubmit = async () => {
    setSaveFormRes(undefined);
    try {
      const { parks } = await updateParks(selectedDropdownItem, selectedParks);
      const currentSelectedParks = parks[selectedDropdownItem] || [];
      setInitialValues(currentSelectedParks);
      setSaveFormRes("success");
    } catch (err) {
      setSaveFormRes("error");
    }
  };

  const handleListItemChange = (item: string) => {
    // save to storage or save data
    if (isLoggedIn) {
      handleSubmit();
    } else {
      saveToStorage();
    }
    setSelectedDropdownItem(item);
  };

  const handleOnChange = (values: string[]) => {
    setSelectedParks(values);
  };

  return (
    <PageWrapper count={selectedCount + selectedParks.length}>
      <ParkView
        loading={loading}
        initialValues={initialValues}
        selectedParks={selectedParks}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleListItemChange={handleListItemChange}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        saveFormRes={saveFormRes}
        setSaveFormRes={setSaveFormRes}
      />
    </PageWrapper>
  );
};

export default ParkContainer;
