import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getParks, updateParks } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import useParks from "hooks/useParks";
import flattenParks from "helpers/flattenParks";
import Response, { ResponseKey } from "enum/Response";
import ParkDesignation, { ParkDesignationType } from "enum/ParkDesignation";
import PageWrapper from "components/PageWrapper";

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] =
    useState<ParkDesignationType>(ParkDesignation.NAT_PARK);
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [selectedParks, setSelectedParks] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [saveFormRes, setSaveFormRes] = useState<ResponseKey>();
  const { loading, parks } = useParks(selectedDropdownItem);
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const delay = 3;

  useEffect(() => {
    if (!isLoggedIn) {
      setInitialValues([]);
      setSelectedParks([]);
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
    const fetchParks = async () => {
      try {
        const { parks } = await getParks();
        const currentSelectedParks = parks?.[selectedDropdownItem] || [];
        const total = flattenParks(parks).length;
        setSelectedCount(total - currentSelectedParks.length);
        setInitialValues(currentSelectedParks);
        setSelectedParks(currentSelectedParks);
      } catch (e) {
        // TODO: handle error
      }
    };
    if (isLoggedIn) {
      fetchParks();
    }
  }, [isLoggedIn, selectedDropdownItem]);

  const handleSubmit = async (hideSaveFormRes?: boolean) => {
    try {
      const { parks } = await updateParks(selectedDropdownItem, selectedParks);
      const currentSelectedParks = parks[selectedDropdownItem] || [];
      setInitialValues(currentSelectedParks);
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
      setSelectedParks((parks) => [...parks, value]);
    } else {
      setSelectedParks((parks) => parks.filter((p) => p !== value));
    }
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
      />
    </PageWrapper>
  );
};

export default ParkContainer;
