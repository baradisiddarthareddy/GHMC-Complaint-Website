export const toGeoJSON = (lat, lng) => ({
  type: "Point",
  coordinates: [parseFloat(lng), parseFloat(lat)],
});
