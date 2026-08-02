type FeaturedCardProps = {
  icon: string;
  title: string;
  type: string;
};

export default function FeaturedCard({
  icon,
  title,
  type,
}: FeaturedCardProps) {
      return (
    <div className="glass-card cursor-pointer rounded-2xl p-6">
      <div className="text-5xl">{icon}</div>

      <h3 className="mt-4 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-gray-400">
        {type}
      </p>
    </div>
  );
}