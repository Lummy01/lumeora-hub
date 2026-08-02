type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export default function StepCard({
  number,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:scale-105 hover:border-violet-500/30 hover:shadow-2xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-xl font-bold">
        {number}
      </div>

      <h3 className="mt-6 text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 text-gray-400 leading-7">
        {description}
      </p>

    </div>
  );
}
