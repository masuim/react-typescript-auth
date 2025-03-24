import { Heading } from "src/components/atoms/Heading.tsx/Heading";
import { Text } from "src/components/atoms/Typography/Text";
import { InternalLinkButton } from "src/components/atoms/InternalLinkButton/InternalLinkButton";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
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
    </div>
  );
}
