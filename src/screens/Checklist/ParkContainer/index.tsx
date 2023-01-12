import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateParks } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import useParks from "hooks/useParks";
import useSelectedParks from "hooks/useSelectedParks";
import flattenParks from "helpers/flattenParks";
import Response, { ResponseKey } from "enum/Response";
import ParkDesignation, { ParkDesignationType } from "enum/ParkDesignation";
import PageWrapper from "components/PageWrapper";

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] =
    useState<ParkDesignationType>(ParkDesignation.NAT_PARK);
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [currentSelectedParks, setCurrentSelectedParks] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [saveFormRes, setSaveFormRes] = useState<ResponseKey>();
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const { loading, parks } = useParks(selectedDropdownItem);
  const { selectedParks, setSelectedParks } = useSelectedParks(isLoggedIn);

  const delay = 3;

  useEffect(() => {
    if (!isLoggedIn) {
      setInitialValues([]);
      setCurrentSelectedParks([]);
      setSelectedCount(0);
      setSaveFormRes(undefined);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (delay && saveFormRes) {
      let timer = setTimeout(() => setSaveFormRes(undefined), delay * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay, saveFormRes]);

  useEffect(() => {
    if (selectedParks) {
      const currentParks = selectedParks[selectedDropdownItem] || [];
      const total = flattenParks(selectedParks).length;
      setSelectedCount(total - currentParks.length);
      setInitialValues(currentParks);
      setCurrentSelectedParks(currentParks);
    }
  }, [selectedParks, selectedDropdownItem]);

  const handleSubmit = async (hideSaveFormRes?: boolean) => {
    try {
      const { parks } = await updateParks(selectedDropdownItem, currentSelectedParks);
      setSelectedParks(parks)
      if (!hideSaveFormRes) {
        setSaveFormRes(Response.SUCCESS);
      }
    } catch (err) {
      if (!hideSaveFormRes) {
        setSaveFormRes(Response.ERROR);
      }
    }
  };

  const handleListItemChange = (item: string) => {
    if (isLoggedIn) {
      handleSubmit(true);
    }
    setSelectedDropdownItem(item as ParkDesignationType);
  };

  const handleOnChange = (value: string, checked: boolean) => {
    if (checked) {
      setCurrentSelectedParks((parks) => [...parks, value]);
    } else {
      setCurrentSelectedParks((parks) => parks.filter((p) => p !== value));
    }
  };

  return (
    <PageWrapper count={selectedCount + currentSelectedParks.length}>
      <ParkView
        loading={loading}
        initialValues={initialValues}
        selectedParks={currentSelectedParks}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleListItemChange={handleListItemChange}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        saveFormRes={saveFormRes}
      />
    </PageWrapper>
  );
};

export default ParkContainer;
