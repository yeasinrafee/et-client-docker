import Demos from "@/components/demos/Demos";
import { fetchAPI } from "@/lib/api";
import { demosData as fallbackDemos } from "@/data/demosData";

export default async function DemosPage() {
  const demos = await fetchAPI("/demos");

  return <Demos data={demos || fallbackDemos} />;
}
