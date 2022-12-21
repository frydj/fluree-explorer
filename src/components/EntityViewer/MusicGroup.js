import { removeContextFromKeys } from "../../utilities/utilities";

const MusicGroup = (data) => {
  let group = removeContextFromKeys(data?.data);
  if (!group) {
    return;
  }
  let image = null;
  if (group.image?.startsWith("http")) {
    image = group.image;
  }
  let url = null;
  if (group.sameAs.startsWith("http")) {
    url = group.sameAs;
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
            ? <a href={url}>{group.name}</a>
            : group.name
          }
        </h3>
      </div>
    </li>
  )
}

export default MusicGroup;