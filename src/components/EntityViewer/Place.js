import { removeContextFromKeys } from "../../utilities/utilities";

const Place = (data) => {
  console.log("place", data);
  const place = removeContextFromKeys(data?.data);
  if (!place) {
    return;
  }
  let url = null;
  if (place.url?.startsWith("http")) {
    url = place.url;
  } else if (place.sameAs?.startsWith("http")) {
    url = place.sameAs;
  }
  let image = null;
  if (place.image?.startsWith("http")) {
    image = place.image;
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
            ? <a href={url}>{place.name || "No name available"}</a>
            : place.name
          }
        </h3>
      </div>
    </li>
  )
}

export default Place;