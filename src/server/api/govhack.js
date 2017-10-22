import Express from 'express';

import dunedinGeoJson from 'app/assets/data/dunedin.geojson';


const govhackApiServer = new Express();

govhackApiServer.use('/dunedin.geojson', (req, res) => {
  res.type('geojson');
  res.send(dunedinGeoJson);
});

export default govhackApiServer;
