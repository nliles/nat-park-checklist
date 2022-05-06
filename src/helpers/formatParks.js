const formatParks = (items) => {
  return item.sort( (a, b) => a.fullName.localeCompare(b.fullName, 'fr', { ignorePunctuation: true }));
}

export default formatParks
