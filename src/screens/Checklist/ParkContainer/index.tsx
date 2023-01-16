import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateParks } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import useParks from "hooks/useParks";
import useSelectedParks from "hooks/useSelectedParks";
import useQuery from "hooks/useQuery";
import flattenParks from "helpers/flattenParks";
import ParkDesignation, { ParkDesignationType } from "enum/ParkDesignation";
import copy from "./en";

const ParkContainer = () => {
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const query = useQuery();
  const designation: ParkDesignationType = query.get("designation") as ParkDesignationType || ParkDesignation.NAT_PARK
  const { loading, parks } = useParks(designation);
  const { selectedParks, setSelectedParks } = useSelectedParks(isLoggedIn);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      parkData: initialValues,
    },
  });

  const {
    watch,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset({ parkData: initialValues });
  }, [initialValues, reset]);

  const formData = watch().parkData;

  useEffect(() => {
    if (!isLoggedIn) {
      setInitialValues([]);
      setSelectedCount(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedParks) {
      const currentParks = selectedParks[designation] || [];
      const total = flattenParks(selectedParks).length;
      setSelectedCount(total - currentParks.length);
      setInitialValues(currentParks);
    }
  }, [selectedParks, designation]);

  const handleOnSubmit = async (values: string[]) => {
    try {
      const { parks } = await updateParks(designation, values);
      setSelectedParks(parks);
      toast.success(copy.updateSuccess);
    } catch (err) {
      toast.error(copy.updateError);
    }
  };

  const handleListItemChange = (item: string) => {
    if (isLoggedIn && isDirty) {
      handleOnSubmit(formData);
    }
    navigate(`/?designation=${item}`);
  };

  return (
    <FormProvider {...methods}>
      <ParkView
        count={selectedCount + formData.length}
        loading={loading}
        initialValues={initialValues}
        selectedDropdownItem={designation}
        parks={parks}
        handleListItemChange={handleListItemChange}
        handleOnSubmit={handleOnSubmit}
      />
    </FormProvider>
  );
};

export default ParkContainer;
