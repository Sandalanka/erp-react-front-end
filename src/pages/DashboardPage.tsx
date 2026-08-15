const stats = [
  { label: "Today's Sales", value: '$0.00' },
  { label: 'Monthly Sales', value: '$0.00' },
  { label: 'Total Expenses', value: '$0.00' },
  { label: 'Net Profit', value: '$0.00' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your business performance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
