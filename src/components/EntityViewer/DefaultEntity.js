import { removeContextFromKeys } from "../../utilities/utilities";

const DefaultEntity = (data) => {
  let entity = removeContextFromKeys(data?.data);
  console.log("entity", entity);
  if (!entity) {
    return;
  }
  let image = null;
  if (entity.image && entity.image.startsWith("http")) {
    image = entity.image;
  }
  let url = null;
  if (entity.sameAs?.startsWith("http")) {
    url = entity.sameAs;
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
            ? <a href={url}>{entity.name || "No name available"}</a>
            : entity.name || "No name available"
          }
        </h3>
      </div>
    </li>
  )
}

export default DefaultEntity;