import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import kebabCase from "lodash/kebabCase"
import camelCase from "lodash/camelCase"
import { createParks, updateParks } from "services/park.service";
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
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const query = useQuery();
  const designation = query.get("designation") || ParkDesignation.NAT_PARK
  const selectedDropdownItem = camelCase(designation) as ParkDesignationType
  const { loading, parks } = useParks(selectedDropdownItem);
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
      const currentParks = selectedParks[selectedDropdownItem] || [];
      const total = flattenParks(selectedParks).length;
      setSelectedCount(total - currentParks.length);
      setInitialValues(currentParks);
    }
  }, [selectedParks, selectedDropdownItem]);

  const handleOnSubmit = async (values: string[]) => {
    try {
      let returnedParks;
      if (Object.keys(selectedParks).length === 0) {
        const { parks } = await createParks(selectedDropdownItem, values);
        returnedParks = parks
      } else {
        const { parks } = await updateParks(selectedDropdownItem, values);
        returnedParks = parks
      }
      setSelectedParks(returnedParks);
      toast.success(copy.updateSuccess);
    } catch (err: any) {
      if (err?.status !== 401) {
        toast.error(copy.updateError);
      }
    }
  };

  const handleListItemChange = (item: string) => {
    if (isLoggedIn && isDirty) {
      handleOnSubmit(formData);
    }
    navigate(`/?designation=${kebabCase(item)}`);
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
      />
    </FormProvider>
  );
};

export default ParkContainer;
