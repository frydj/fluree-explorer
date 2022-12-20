export const removeContextFromKeys = (object) => {
  if (!object) {return;}
  Object.keys(object).map(key => {
    const newKey = key.substring(key.indexOf(":") + 1);
    object[newKey] = object[key];
    // delete object[key];
  })
  return object;
}