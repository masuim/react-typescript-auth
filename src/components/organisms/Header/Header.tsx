import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/components/atoms/LinkAndButton/Button/Button";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">アプリ名</h1>
          </div>
          {isAuthenticated && (
            <div className="flex items-center">
              <Button variant="outline" onClick={logout}>
                ログアウト
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
