mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RlZWxlcmZhbjg0MCIsImEiOiJja3V2MmFmOGE2NTRwMndtYTF5bWgxZWsxIn0.Rr-KsIHWs21p5YQOI9c9uA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-71.104081, 42.365554],
  zoom: 14,
});

var marker = new mapboxgl.Marker()
  .setLngLat([-71.093729, 42.357575])
  .addTo(map);

var counter = 0;

async function busGetLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

const busStops = [];

async function run() {
  const locations = await busGetLocations();
  // console.log(new Date());
  for (i = 0; i < locations.length; i++) {
    console.log(locations[i].attributes.latitude);
    console.log(locations[i].attributes.longitude);
    busStops.push([
      locations[i].attributes.longitude,
      locations[i].attributes.latitude,
    ]);
  }
}

async function move() {
  const locations = await run();
  setTimeout(() => {
    if (counter >= busStops.length) return;
    const nextBustStop = busStops[counter];
    marker.setLngLat(nextBustStop);
    counter++;
    move();
  }, 15000);
}

// setTimeout(count, 500);
console.log(busStops);

console.log(counter);
