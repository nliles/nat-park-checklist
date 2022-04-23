import { useState, useEffect } from 'react'
import { NAT_PARK_CODES, NPS_API, API_KEY } from "../constants";

function useParks() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
  const [parks, setParks] = useState([])

	useEffect(() => {
			const fetchParks = async () => {
          setLoading(true)
          try {
            const res = await fetch(`${NPS_API}/parks?parkCode=${NAT_PARK_CODES}&limit=466&sort=fullName&api_key=${API_KEY}`)
            const json = await res.json()
            setParks(json.data)
            setLoading(false)
          } catch (e) {
            setError(true)
            setLoading(false)
          }
      }
    fetchParks()
	}, [])

	return {
		error,
		loading,
    parks
	}
}

export default useParks
