import { createSearchParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { SelectedParks } from "types";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import kebabCase from "lodash/kebabCase";
import camelCase from "lodash/camelCase";
import {
  updateUserParks,
  updateUserParkDesignation,
} from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import useParks from "hooks/useParks";
import useSelectedParks from "hooks/useSelectedParks";
import useQuery from "hooks/useQuery";
import { ParkDesignationType } from "enum/ParkDesignation";
import filterParks from "./filterParks";
import copy from "./copy";

const ParkContainer = () => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const query = useQuery();
  const designation = query.get("designation") || "";
  const selectedState = query.get("state")?.toUpperCase();
  const selectedDesignation = camelCase(designation) as ParkDesignationType;
  const { isLoading, parks } = useParks(selectedDesignation, selectedState);
  const filteredParks = filterParks(parks, selectedDesignation, selectedState);

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

  const formData: SelectedParks = watch("parkData");

  useEffect(() => {
    reset({ parkData: selectedParks });
  }, [selectedParks, reset]);

  const handleOnSubmit = async () => {
    try {
      if (selectedDesignation) {
        const { parks } = await updateUserParkDesignation(
          selectedDesignation as ParkDesignationType,
          formData[selectedDesignation as ParkDesignationType]
        );
        setSelectedParks(parks);
      } else {
        const { parks } = await updateUserParks(formData);
        setSelectedParks(parks);
      }
      toast.success(copy.updateSuccess);
    } catch (err: any) {
      if (err?.status !== 401) {
        toast.error(copy.updateError);
      }
    }
  };

  const handleParamUpdate = ({
    designation = selectedDesignation,
    state = selectedState,
  }: {
    designation?: string | null;
    state?: string | null;
  }) => {
    const params = {
      ...(designation && { designation: kebabCase(designation) }),
      ...(state && { state: state.toLowerCase() }),
    };
    navigate({
      search: createSearchParams(params).toString(),
    });
  };

  const handleListItemChange = ({
    designation,
    state,
  }: {
    designation?: string | null;
    state?: string | null;
  }) => {
    if (isLoggedIn && isDirty) {
      handleOnSubmit();
    }
    handleParamUpdate({ designation, state });
  };

  return (
    <FormProvider {...methods}>
      <ParkView
        isLoading={isLoading || isSelectedLoading}
        selectedDesignation={selectedDesignation}
        selectedState={selectedState}
        parks={filteredParks || []}
        handleListItemChange={handleListItemChange}
        handleOnSubmit={handleOnSubmit}
      />
    </FormProvider>
  );
};

export default ParkContainer;
