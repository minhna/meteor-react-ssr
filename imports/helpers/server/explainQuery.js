
export const explainQuery = async (collection, query, options) => {
  console.log(`explainQuery on ${collection._name}:`);
  const raw = collection.rawCollection();
  const result = await raw.find(query, options).explain();
  console.log(JSON.stringify(result, null, 2));
  console.log('///////////////////////');
};

export const getIndexes = async (collection) => {
  console.log(`Indexes on ${collection._name}:`);
  const raw = collection.rawCollection();
  const result = await raw.indexes();
  console.log(JSON.stringify(result, null, 2));
  console.log('///////////////////////');
};
