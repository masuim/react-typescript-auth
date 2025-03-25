import { InternalLinkButton } from "@/components/atoms/links/InternalLinkButton";
import { Heading, Text } from "@/components/atoms/typography";
import { PATHS } from "@/features/auth/constants/paths";

export default function Index() {
  return (
    <div className="text-center">
      <Heading level="h1" className="mb-6">
        Auth Template
      </Heading>
      <Text variant="large" className="mb-8">
        認証機能を備えたReactテンプレート
      </Text>
      <InternalLinkButton to={PATHS.AUTH.LOGIN} variant="default">
        ログイン
      </InternalLinkButton>
    </div>
  );
}
