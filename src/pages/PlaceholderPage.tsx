interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        This module hasn't been built yet.
      </p>
    </div>
  );
}
