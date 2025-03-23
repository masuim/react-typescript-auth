import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">{children}</main>
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorMessage = isRouteErrorResponse(error)
    ? error.status === 404
      ? "ページが見つかりません"
      : "エラーが発生しました"
    : "予期せぬエラーが発生しました";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto text-center">
        <main>
          <div className="sm:flex items-center justify-center">
            <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 sm:text-5xl">
              {isRouteErrorResponse(error) ? error.status : "Error"}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
                  {errorMessage}
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  ページを更新するか、ホームに戻ってお試しください。
                </p>
              </div>
              <div className="mt-6 flex justify-center space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  更新する
                </button>
                <a
                  href="/"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 dark:bg-indigo-900 px-4 py-2 text-sm font-medium text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  ホームに戻る
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
