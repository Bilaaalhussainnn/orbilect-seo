import JsonLd from "./json-ld";
import { pageSchema } from "@/lib/orbilect-search";
export default function PageStructuredData({ route, name, description }: { route: string; name?: string; description?: string }) { return <JsonLd data={pageSchema(route, { name, description })} />; }
