const getPaginationFilters = params => {
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 5;
  const skip = (page - 1) * limit;
  const sortBy = params.sortBy;
  const sortOrder = params.sortOrder;
  const sort = {};

  if (sortBy) {
    sort[sortBy] = sortOrder === 'asc'
      ? 1
      : sortOrder === 'desc'
        ? -1
        : 1
  }

  return { skip, limit, sort };
}

module.exports = {
  getPaginationFilters: getPaginationFilters
}