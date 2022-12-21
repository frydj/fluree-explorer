import { removeContextFromKeys } from "../../utilities/utilities";

const Performers = (data) => {
  console.log("performers", data);
  const performers = removeContextFromKeys(data?.data);
  return (
    <div>
      <span style={{fontWeight: "bold"}}>Performers:</span>
        {performers.map(p => {
          p = removeContextFromKeys(p);
          return <><br />{p.name}</>
        })}
    </div>
  );
}

const MusicEvent = (data) => {
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
    <li
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-gray text-center shadow"
      style={{backgroundColor: "whitesmoke"}}
    >
      <div className="flex flex-1 flex-col p-8">
        {image && <img className="mx-auto h-32 flex-shrink-0" src={image} alt="" />}
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {url 
            ? <a href={url}>{event.name}</a>
            : event.name
          }
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <div className="text-sm text-gray-500">
            {event.description}
          </div>
          <div className="mt-3">
            <div className="rounded-full px-2 py-1 text-xs font-medium text-green-800">
              {event.performers &&
                <Performers data={event.performers} />
              }
            </div>
          </div>
        </dl>
      </div>
    </li>
  )
}

export default MusicEvent;