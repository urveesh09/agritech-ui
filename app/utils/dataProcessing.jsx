import hull from 'hull.js';

// Function to process data fetched from the API
export const processData = (jsonData, selectedColumn) => {
  // Assuming jsonData is an array of objects with lat, lng, and the selected column
  const validData = jsonData.filter(row => row.lat && row.lng);
  // console.log(validData[2])
  const points = validData.map(row => [row.lat, row.lng]);
  const x = validData.map(row => row.lat);
  const y = validData.map(row => row.lng);
  const intensityMax = Math.max(...validData.map(row => row[selectedColumn]));
  const intensityMin = Math.min(...validData.map(row => row[selectedColumn]));
  let xsum = 0;
  let ysum = 0;
  for (let i = 0; i < x.length; i++) {
    xsum += x[i];
    ysum += y[i];
  }
  let starterLat = xsum / x.length;
  let starterLng = ysum / y.length;
  const heatmapPoints = validData.map(row => ({
    lat: row.lat,
    lng: row.lng,
    intensity: (row[selectedColumn] - intensityMin) / (intensityMax - intensityMin),
    value: row[selectedColumn]
  }));

  // Calculate the convex hull
  const polygonCoordinates = hull(points, 15); // 15 is the concavity parameter
  const starters = [starterLat, starterLng];

  return { polygonCoordinates, heatmapPoints, starters };
};
