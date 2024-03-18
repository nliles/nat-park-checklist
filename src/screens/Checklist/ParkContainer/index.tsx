import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
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
import flattenParks from "helpers/flattenParks";
import ParkDesignation, { ParkDesignationType } from "enum/ParkDesignation";
import copy from "./copy";

const ParkContainer = () => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const query = useQuery();
  const designation = query.get("designation") || ParkDesignation.NAT_PARK;
  const selectedDropdownItem = camelCase(designation) as ParkDesignationType;
  const showAll = 'nationalParkUnit' === selectedDropdownItem;
  const { isLoading, parks } = useParks(selectedDropdownItem);
  const { isLoading: isSelectedLoading, selectedParks, setSelectedParks } = useSelectedParks(isLoggedIn);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      parkData: {
        nationalPark: [],
        internationalHistoricSite: [],
        nationalBattlefield: [],
        nationalBattlefieldPark: [],
        nationalBattlefieldSite: [],
        nationalMilitaryPark: [],
        nationalHistoricPark: [],
        nationalHistoricSite: [],
        nationalLakeshore: [],
        nationalMemorial: [],
        nationalMonument: [],
        nationalParkway: [],
        nationalPreserve: [],
        nationalReserve: [],
        nationalRecreationArea: [],
        nationalRiver: [],
        nationalScenicTrail: [],
        nationalSeashore: [],
        nationalWildAndScenicRiver: [],
        otherDesignation: [],
      },
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
      setInitialValues({});
      setSelectedCount(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedParks) {
      let currentParks = showAll ? Object.values(selectedParks).flat(1) : (selectedParks[selectedDropdownItem] || []);
      const total = flattenParks(selectedParks).length;
      setSelectedCount(total - currentParks.length);
      setInitialValues(selectedParks);
    }
  }, [selectedParks, selectedDropdownItem, showAll]);

  const handleOnSubmit = async (values: any) => {
    try {
      if (showAll) {
        // TODO: Send put request
      } else {
        const { parks } = await updateParks(selectedDropdownItem, values.parkData[selectedDropdownItem]);
        setSelectedParks(parks);
      }
      for (const [key, value] of Object.entries(values)) {
        const { parks } = await updateParks(key as ParkDesignationType, value as string[]);
        setSelectedParks(parks);
      }
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
        count={selectedCount + Object.values(formData).flat(1).length}
        isLoading={isLoading || isSelectedLoading}
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
