// Function to get the count of unique names
function countUniqueField(objects, field) {
  const uniqueValues = objects.reduce((acc, obj) => {
    acc.add(obj[field]);
    return acc;
  }, new Set());

  return uniqueValues.size;
}

// usage
// const uniqueNameCount = countUniqueField(objects, 'name');
// console.log(uniqueNameCount);