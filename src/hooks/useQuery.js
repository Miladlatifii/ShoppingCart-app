import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

 export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
