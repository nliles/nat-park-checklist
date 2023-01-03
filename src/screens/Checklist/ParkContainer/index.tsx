import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getParks, updateParks } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import { useParks } from "hooks";
import { PARK_DESIGNATION_KEY } from "../../../constants";
import flattenParks from "helpers/flattenParks";
import Response, { ResponseKey } from "enum/Response";
import PageWrapper from "components/PageWrapper";

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(
    PARK_DESIGNATION_KEY.NAT_PARK
  );
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [selectedParks, setSelectedParks] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [saveFormRes, setSaveFormRes] = useState<ResponseKey>();
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
        }
        const currentSelectedParks = data?.[selectedDropdownItem] || [];
        const total = data ? flattenParks(data).length : 0;
        setSelectedCount(total - currentSelectedParks.length);
        setInitialValues(currentSelectedParks);
        setSelectedParks(currentSelectedParks);
      } catch (e) {
        // TODO: handle error
      }
    };
    fetchParks();
  }, [isLoggedIn, selectedDropdownItem]);

  const handleSubmit = async () => {
    setSaveFormRes(undefined);
    try {
      const { parks } = await updateParks(selectedDropdownItem, selectedParks);
      const currentSelectedParks = parks[selectedDropdownItem] || [];
      setInitialValues(currentSelectedParks);
      setSaveFormRes(Response.SUCCESS);
    } catch (err) {
      setSaveFormRes(Response.ERROR);
    }
  };

  const handleListItemChange = (item: string) => {
    if (isLoggedIn) {
      handleSubmit();
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
      />
    </PageWrapper>
  );
};

export default ParkContainer;
