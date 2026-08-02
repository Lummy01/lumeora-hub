type CreatorCardProps = {
  avatar: string;
  name: string;
  role: string;
  resources: string;
};

export default function CreatorCard({
  avatar,
  name,
  role,
  resources,
}: CreatorCardProps) {
  return (
    <div className="glass-card cursor-pointer rounded-2xl p-6 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-3xl">
        {avatar}
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {name}
      </h3>

      <p className="mt-2 text-gray-400">
        {role}
      </p>

      <div className="mt-5 rounded-xl bg-violet-500/10 py-2 text-violet-300">
        {resources}
      </div>

    </div>
  );
}
