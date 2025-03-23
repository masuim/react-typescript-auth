import { Link } from "react-router-dom";
import { cn } from "src/lib/utils";
import { buttonVariants } from "src/components/atoms/Button/Button";
import { theme } from "src/config/theme";

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
            className={cn(buttonVariants({ variant: theme.button.primary }))}
          >
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
}
