import { useForm, FormProvider } from "react-hook-form";
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

const ParkContainer = () => {
  const [selectedDropdownItem, setSelectedDropdownItem] =
    useState<ParkDesignationType>(ParkDesignation.NAT_PARK);
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [saveFormRes, setSaveFormRes] = useState<ResponseKey>();
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const { loading, parks } = useParks(selectedDropdownItem);
  const { selectedParks, setSelectedParks } = useSelectedParks(isLoggedIn);

  const methods = useForm({
    defaultValues: {
      parkData: initialValues,
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
  } = methods;

  useEffect(() => {
    reset({ parkData: initialValues });
  }, [initialValues, reset]);

  const formData = watch().parkData;

  const delay = 3;

  useEffect(() => {
    if (!isLoggedIn) {
      setInitialValues([]);
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
    }
  }, [selectedParks, selectedDropdownItem]);

  const handleOnSubmit = async (values: string[], hideSaveFormRes?: boolean) => {
    try {
      const { parks } = await updateParks(selectedDropdownItem, values);
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
    // if (isLoggedIn) {
    //   handleSubmit(true);
    // }
    setSelectedDropdownItem(item as ParkDesignationType);
  };

  return (
  <FormProvider {...methods}>
      <ParkView
        count={selectedCount + formData.length}
        loading={loading}
        initialValues={initialValues}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleListItemChange={handleListItemChange}
        handleOnSubmit={handleOnSubmit}
        saveFormRes={saveFormRes}
      />
  </FormProvider>
  );
};

export default ParkContainer;
