import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Spinner />
    </section>
  );
}
