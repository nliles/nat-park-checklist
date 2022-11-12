import { useState, useEffect } from "react";
import { Park } from "types";
import { PARK_INFO, NPS_API, API_KEY } from "../constants";
import { formatParks, sortParks } from "helpers";

function useParks(selectedItem?: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [parks, setParks] = useState<Park[]>([]);

  useEffect(() => {
    const fetchParks = async () => {
      let codes: any = [];
      if (selectedItem) {
        codes = PARK_INFO[selectedItem].codes;
      } else {
        const mappedParks = Object.values(PARK_INFO).map((obj) => obj.codes);
        codes = Array.prototype.concat.apply([], mappedParks);
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${NPS_API}/parks?parkCode=${codes}&limit=466&sort=fullName&api_key=${API_KEY}`
        );
        const json = await res.json();
        console.log(formatParks(json.data, selectedItem));
        const sorted = sortParks(formatParks(json.data, selectedItem));
        setParks(sorted);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchParks();
  }, [selectedItem]);

  return {
    error,
    loading,
    parks,
  };
}

export default useParks;
