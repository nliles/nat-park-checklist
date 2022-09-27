import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getParks, updateParks } from "services/park.service";
import { State } from "reducers/types";
import { Response } from "types";
import ParkView from "components/ParkView";
import { useParks } from "hooks";
import { PARK_DESIGNATION_KEY } from "../../constants";
import PageWrapper from "components/PageWrapper";
import { loadState, saveState } from "storage/sessionStorage";

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    PARK_DESIGNATION_KEY.NAT_PARK
  );
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [selectedParks, setSelectedParks] = useState<string[]>([]);
  const [saveFormRes, setSaveFormRes] = useState<Response | undefined>();
  const { loading, parks } = useParks(selectedDropdownItem);
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);

  useEffect(() => {
    if (!isLoggedIn) {
      setInitialValues([]);
      setSelectedParks([]);
      setSaveFormRes(undefined);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchParks = async () => {
      if (isLoggedIn) {
        try {
          const { parks } = await getParks();
          setInitialValues(parks);
        } catch (e) {
          // TODO: handle error
        }
      } else {
        const stored = loadState() || [];
        setSelectedParks(stored);
      }
    };
    fetchParks();
  }, [isLoggedIn]);

  const saveToStorage = () => {
    saveState(selectedParks);
  };

  const handleSubmit = async () => {
    try {
      await updateParks(selectedParks);
      setSaveFormRes("success");
    } catch (err) {
      setSaveFormRes("error");
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

  const handleOnChange = (values: string[]) => {
    setSelectedParks(values);
  };

  return (
    <PageWrapper count={selectedParks.length}>
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
