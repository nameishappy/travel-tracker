import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [search] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");
  return [lat,lng];
}
