import { removeContextFromKeys } from "../utilities/utilities";

export default MusicEvent = (data) => {
  const event = removeContextFromKeys(data?.data);
  if (!event) {
    return;
  }
  let url = null;
  if (event.url?.startsWith("http")) {
    url = event.url;
  }
  let image = null;
  if (event.image?.startsWith("http")) {
    image = event.image;
  }
  return (
    <>
      {image && 
        <div><img src={image} /></div>
      }
      <div style={{fontWeight: "bold"}}>
        {url 
          ? <a href={url}>{event.name}</a>
          : event.name
        }
      </div>
      {event.description &&
        <div>{event.description}</div>
      }
      {event.performers &&
        <Performers data={event.performers} />
      }
    </>
  )
}