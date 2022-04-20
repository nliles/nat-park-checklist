import { useState, useEffect } from 'react'
import { NPS_API, API_KEY } from "../constants";

function useParks() {
	const [loading, setLoading] = useState(false)
  const [parks, setParks] = useState([])

	useEffect(() => {
			const fetchParks = async () => {
          try {
            const res = await fetch(`${NPS_API}/parks?limit=2000&sort=fullName&api_key=${API_KEY}`)
            const json = await res.json()
             console.log('here', json)
            setParks(json.data)
          } catch (e) {
            console.log(e)
          }
      }
    fetchParks()
	}, [])

	return {
		loading,
    parks
	}
}

export default useParks
