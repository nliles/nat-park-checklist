const sortParks = (items) => {
  return items.sort( (a, b) => a.fullName.localeCompare(b.fullName, 'fr', { ignorePunctuation: true }));
}

export default sortParks
