import { useState, useEffect } from 'react'
import { PARK_CODES, NPS_API, API_KEY } from "../constants";
import { sortParks } from "../helpers";

function useParks(selectedItem: string) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
  const [parks, setParks] = useState([])

	useEffect(() => {
			const fetchParks = async () => {
					const codes = PARK_CODES[selectedItem]
          setLoading(true)
          try {
            const res = await fetch(`${NPS_API}/parks?parkCode=${codes}&limit=466&sort=fullName&api_key=${API_KEY}`)
            const json = await res.json()
						const sorted = sortParks(json.data)
            setParks(sorted)
            setLoading(false)
          } catch (e) {
            setError(true)
            setLoading(false)
          }
      }
		if (selectedItem) {
		   fetchParks()
		}
	}, [selectedItem])

	return {
		error,
		loading,
    parks
	}
}

export default useParks