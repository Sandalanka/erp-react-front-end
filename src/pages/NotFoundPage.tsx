import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-50 px-4 text-center dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Page not found</p>
      <Link
        to="/dashboard"
        className="mt-4 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
