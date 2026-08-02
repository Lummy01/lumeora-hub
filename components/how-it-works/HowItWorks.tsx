import StepCard from "./StepCard";

export default function HowItWorks() {
  return (
    <section
  id="about"
  className="mx-auto max-w-7xl px-6 py-24"
>

      <div className="text-center">

        <h2 className="text-4xl font-bold">
          How Lumeora Hub Works
        </h2>

        <p className="mt-4 text-gray-400">
          Share your creativity with the world in four simple steps.
        </p>

      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <StepCard
          number="1"
          title="Create an Account"
          description="Sign up and create your personal creator profile to begin showcasing your work."
        />

        <StepCard
          number="2"
          title="Upload Resources"
          description="Upload designs, documents, presentations, images, code, and other creative files."
        />

        <StepCard
          number="3"
          title="Secure with Shelby"
          description="Your files are securely stored using Shelby's decentralized storage infrastructure for reliability and availability."
        />

        <StepCard
          number="4"
          title="Share & Discover"
          description="Visitors can browse, search, preview, and download your shared resources from anywhere."
        />

      </div>

    </section>
  );
}