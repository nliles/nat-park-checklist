import { useState, useEffect } from "react";
import { getParks } from "services/park.service";
import { loadState } from "storage/sessionStorage";
import { Parks } from 'types'

function useSelectedParks() {
  const [selectedParks, setSelectedParks] = useState<Parks>({});

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const { parks } = await getParks();
        setSelectedParks(parks);
      } catch (e) {
        // TODO: handle error
      }
    };
    fetchParks();
  }, []);

  return {
    selectedParks,
  };
}

export default useSelectedParks;
