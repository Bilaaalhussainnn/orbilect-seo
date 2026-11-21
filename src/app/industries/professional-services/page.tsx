import { permanentRedirect } from "next/navigation";

// Retired category: use the directory of the nine active industries.
export default function Page() {
  permanentRedirect("/industries");
}
