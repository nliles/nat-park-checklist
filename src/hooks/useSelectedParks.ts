import { useState, useEffect } from "react";
import { getParks } from "services/park.service";
import toast from "react-hot-toast";
import { loadState, saveState } from "storage/sessionStorage";
import { Parks } from "types";
import copy from "./copy";

const defaultValues = {
  nationalPark: [],
  nationalBattlefield: [],
  nationalBattlefieldPark: [],
  nationalBattlefieldSite: [],
  nationalMilitaryPark: [],
  nationalHistoricPar: [],
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
}

function useSelectedParks(isLoggedIn: boolean) {
  const [selectedParks, setSelectedParks] = useState<Parks>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const storageKey = "selectedParks";

  useEffect(() => {
    const fetchParks = async () => {
      try {
        setIsLoading(true)
        let data = loadState(storageKey);
        if (!data.length) {
          const { parks } = await getParks();
          data = parks;
          saveState(storageKey, JSON.stringify(data));
        }
        setSelectedParks(data);
      } catch (err: any) {
        if (err?.status !== 401) {
          toast.error(copy.selectedParksError);
        }
      } finally {
        setIsLoading(false)
      }
    };
    if (isLoggedIn) {
      fetchParks();
    } else {
      sessionStorage.removeItem(storageKey);
      setSelectedParks({});
    }
  }, [isLoggedIn]);

  return {
    isLoading,
    selectedParks,
    setSelectedParks,
  };
}

export default useSelectedParks;
