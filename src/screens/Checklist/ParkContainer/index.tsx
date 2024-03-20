import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { Parks } from "types";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import kebabCase from "lodash/kebabCase";
import camelCase from "lodash/camelCase";
import { updateParks } from "services/park.service";
import { State } from "reducers/types";
import ParkView from "screens/Checklist/ParkView";
import useParks from "hooks/useParks";
import useSelectedParks from "hooks/useSelectedParks";
import useQuery from "hooks/useQuery";
import ParkDesignation, { ParkDesignationType } from "enum/ParkDesignation";
import copy from "./copy";

const ParkContainer = () => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const query = useQuery();
  const designation = query.get("designation") || ParkDesignation.NAT_PARK;
  const selectedDropdownItem = camelCase(designation) as ParkDesignationType;
  // const showAll = 'nationalParkUnit' === selectedDropdownItem;
  const { isLoading, parks } = useParks(selectedDropdownItem);
  const { isLoading: isSelectedLoading, selectedParks, setSelectedParks } = useSelectedParks(isLoggedIn);
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

  const formData: Parks = watch().parkData;

  const handleOnSubmit = async () => {
    try {
      // TODO: Add PUT request when showing all parks
      const { parks } = await updateParks(selectedDropdownItem, formData[selectedDropdownItem]);
      setSelectedParks(parks);
      toast.success(copy.updateSuccess);
    } catch (err: any) {
      if (err?.status !== 401) {
        toast.error(copy.updateError);
      }
    }
  };

  const handleListItemChange = (item: string) => {
    if (isLoggedIn && isDirty) {
      handleOnSubmit();
    }
    navigate(`/?designation=${kebabCase(item)}`);
  };

  return (
    <FormProvider {...methods}>
      <ParkView
        isLoading={isLoading || isSelectedLoading}
        selectedDropdownItem={selectedDropdownItem}
        parks={parks}
        handleListItemChange={handleListItemChange}
        handleOnSubmit={handleOnSubmit}
      />
    </FormProvider>
  );
};

export default ParkContainer;
