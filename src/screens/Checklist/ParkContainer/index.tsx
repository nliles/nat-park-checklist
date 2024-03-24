import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { SelectedParks } from "types";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import kebabCase from "lodash/kebabCase";
import camelCase from "lodash/camelCase";
import { updateParks, updateParkDesignation } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import useParks from "hooks/useParks";
import useSelectedParks from "hooks/useSelectedParks";
import useQuery from "hooks/useQuery";
import { ParkDesignationType } from "enum/ParkDesignation";
import copy from "./copy";

const ParkContainer = () => {
  const [selectedState, setSelectedState] = useState<string | null>();
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const query = useQuery();
  const designation = query.get("designation");
  const selectedDropdownItem = designation
    ? (camelCase(designation) as ParkDesignationType)
    : undefined;
  const { isLoading, parks } = useParks(selectedDropdownItem, selectedState);
  const {
    isLoading: isSelectedLoading,
    selectedParks,
    setSelectedParks,
  } = useSelectedParks(isLoggedIn);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      parkData: selectedParks,
    },
  });

  const {
    watch,
    reset,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    reset({ parkData: selectedParks });
  }, [selectedParks, reset]);

  const formData: SelectedParks = watch("parkData");

  const handleOnSubmit = async () => {
    try {
      if (selectedDropdownItem) {
        const { parks } = await updateParkDesignation(
          selectedDropdownItem as ParkDesignationType,
          formData[selectedDropdownItem as ParkDesignationType]
        );
        setSelectedParks(parks);
      } else {
        const { parks } = await updateParks(formData);
        setSelectedParks(parks);
      }
      toast.success(copy.updateSuccess);
    } catch (err: any) {
      if (err?.status !== 401) {
        toast.error(copy.updateError);
      }
    }
  };

  const handleListItemChange = (item?: string | null) => {
    if (isLoggedIn && isDirty) {
      handleOnSubmit();
    }
    navigate(item ? `/?designation=${kebabCase(item)}` : "");
  };

  return (
    <FormProvider {...methods}>
      <ParkView
        isLoading={isLoading || isSelectedLoading}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleListItemChange={handleListItemChange}
        selectState={setSelectedState}
        handleOnSubmit={handleOnSubmit}
      />
    </FormProvider>
  );
};

export default ParkContainer;
