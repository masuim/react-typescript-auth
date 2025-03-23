import { Link } from "react-router";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">
          React TypeScript Auth Template
        </h1>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
          認証機能を備えた再利用可能なReactテンプレート
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            ログイン
          </Link>
          <a
            href="https://github.com/yourusername/react-typescript-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
