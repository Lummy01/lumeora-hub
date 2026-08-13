import FeaturedCard from "./FeaturedCard";
import ResourceList from "./ResourceList";
export default function FeaturedResources() {
  return (
    <section
  id="resources"
  className="mx-auto max-w-7xl px-6 py-24"
>

      <div className="text-center">

        <h2 className="text-4xl font-bold">
          Featured Resources
        </h2>

        <p className="mt-4 text-gray-400">
          Discover creative work shared by the community.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

  

</div>
<ResourceList />
    </section>
  );
}
