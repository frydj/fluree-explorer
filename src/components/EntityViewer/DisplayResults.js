import DefaultEntity from './DefaultEntity';
import MusicEvent from './MusicEvent';
import MusicGroup from './MusicGroup';
import Place from './Place';

const getDisplayComponent = (type, data) => {
  switch(type) {
    case "MusicGroup":
      return <MusicGroup data={data} />
    case "MusicEvent":
      return <MusicEvent data={data} />;
    case "Place":
      return <Place data={data} />;
    default:
      return <DefaultEntity data={data} />;  
  };
}

const DisplayResults = (results) => {
  console.log("why are you like this", results);
  if (!results || !results.data) { return; }
  results = results.data;
  const entities = results.map(r => {
    return getDisplayComponent(r["rdf:type"][0], r)
  })
  return entities;
}

export default DisplayResults;