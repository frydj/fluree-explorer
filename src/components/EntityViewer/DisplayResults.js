import DefaultEntity from './DefaultEntity';
import MusicEvent from './MusicEvent';
import MusicGroup from './MusicGroup';

export default DisplayResults = (results) => {
  if (!results) { return; }
  const entities = results.map(r => {
    // TODO: handle multiple types? rather than just grabbing the first one
    switch(r["rdf:type"][0]) {
      case "MusicGroup":
        return <div style={{float: "left"}}><MusicGroup data={r} /></div>;
      case "MusicEvent":
        return <div style={{float: "left"}}><MusicEvent data={r} /></div>;
      default:
        return <div style={{float: "left"}}><DefaultEntity data={r} /></div>;  
    };
  });
  return entities;
}