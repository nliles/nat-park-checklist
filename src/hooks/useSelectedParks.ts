import { useState, useEffect } from "react";
import { getParks } from "services/park.service";
import toast from "react-hot-toast";
import { SelectedParks } from "types";
import copy from "./copy";

export const defaultSelectedValues: SelectedParks = {
  nationalPark: [],
  nationalBattlefield: [],
  nationalBattlefieldPark: [],
  nationalBattlefieldSite: [],
  nationalMilitaryPark: [],
  nationalHistoricalPark: [],
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
  internationalHistoricSite: [],
  otherDesignation: [],
};

function useSelectedParks(isLoggedIn: boolean) {
  const [selectedParks, setSelectedParks] = useState<SelectedParks>(
    defaultSelectedValues
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        setIsLoading(true);
        const { parks } = await getParks();
        setSelectedParks(parks);
      } catch (err: any) {
        if (err?.status !== 401) {
          toast.error(copy.selectedParksError);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoggedIn) {
      fetchParks();
    } else {
      setSelectedParks(defaultSelectedValues);
    }
  }, [isLoggedIn]);

  return {
    isLoading,
    selectedParks,
    setSelectedParks,
  };
}

export default useSelectedParks;
