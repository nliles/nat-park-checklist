import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { Parks } from "types";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import kebabCase from "lodash/kebabCase";
import camelCase from "lodash/camelCase";
import { updateParkDesignation, updateParks } from "services/park.service";
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
  const designation = query.get("designation");
  const selectedDropdownItem = designation ? camelCase(designation) : undefined;
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

  console.log('selected parks', selectedParks)

  useEffect(() => {
    reset({ parkData: selectedParks });
  }, [selectedParks, reset]);

  const formData: Parks = watch().parkData;

  const handleOnSubmit = async () => {
    try { 
      if (selectedDropdownItem) {
        const { parks } = await updateParkDesignation(selectedDropdownItem as ParkDesignationType, formData[selectedDropdownItem as ParkDesignationType]);
        setSelectedParks(parks);
      } else {
        console.log(formData)
        // const { parks } = await updateParks(formData);
        // console.log('saved parks', parks);
        // setSelectedParks(parks);
      }
      toast.success(copy.updateSuccess);
    } catch (err: any) {
      if (err?.status !== 401) {
        toast.error(copy.updateError);
      }
    }
  };

  const handleListItemChange = (item?: string) => {
    if (isLoggedIn && isDirty) {
      handleOnSubmit();
    }
    navigate(item ? `/?designation=${kebabCase(item)}` : '');
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
