// import { Park } from '../types'

const sortParks = (parks) => {
  return parks.sort( (a, b) => a.fullName.localeCompare(b.fullName, 'fr', { ignorePunctuation: true }));
}

export default sortParks
