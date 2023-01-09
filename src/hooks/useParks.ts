import { useState, useEffect } from "react";
import { Park } from "types/park";
import { PARK_INFO, NPS_API, API_KEY } from "../constants";
import sortParks from "helpers/sortParks";
import formatParks from "helpers/formatParks";

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
      let data;
      const storageKey = selectedItem ? selectedItem.toString() : "data";
      try {
        let data = JSON.parse(sessionStorage.getItem(storageKey) || "[]");
        if (!data.length) {
          const res = await fetch(
            `${NPS_API}/parks?parkCode=${codes}&limit=496&sort=fullName&api_key=${API_KEY}`
          );
          const json = await res.json();
          data = sortParks(formatParks(json.data, selectedItem));
          sessionStorage.setItem(storageKey, JSON.stringify(data));
        }
        setParks(data);
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
