type CategoryCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function CategoryCard({
  icon,
  title,
  description,
}: CategoryCardProps) {
  return (
    <div className="glass-card cursor-pointer rounded-2xl p-6">

      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="mt-5 text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-gray-400">
        {description}
      </p>

    </div>
  );
}