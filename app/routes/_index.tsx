import { InternalLinkButton } from "@/components/atoms/links/InternalLinkButton";
import { Heading, Text } from "@/components/atoms/typography";

export default function Index() {
  return (
    <div className="text-center">
      <Heading level="h1" className="mb-6">
        Auth Template
      </Heading>
      <Text variant="large" className="mb-8">
        認証機能を備えたReactテンプレート
      </Text>
      <InternalLinkButton to="/login" variant="default">
        ログイン
      </InternalLinkButton>
    </div>
  );
}
