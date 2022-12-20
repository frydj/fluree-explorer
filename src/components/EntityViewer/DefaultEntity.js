import { removeContextFromKeys } from "../utilities/utilities";

export default DefaultEntity = (data) => {
  let entity = removeContextFromKeys(data?.data);
  if (!entity) {
    return;
  }
  return (
    <div>
      <div>
        {entity["name"] || "No name listed"}
      </div>
      {entity["image"] &&
        <div>
          <img src={entity["image"]} style={{width: "300px"}} />
        </div>
      }
    </div>
  )
}