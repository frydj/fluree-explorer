import { removeContextFromKeys } from "../utilities/utilities";

export default MusicGroup = (data) => {
  let group = removeContextFromKeys(data?.data);
  if (!group) {
    return;
  }
  let url = null;
  if (group.sameAs.startsWith("http")) {
    url = group.sameAs;
  }
  return (
    <>
      <div style={{fontWeight: "bold"}}>
        {url 
          ? <a href={url}>{group.name}</a>
          : group.name
        }
      </div>
    </>
  )
}