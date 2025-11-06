import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"

export default function OAuthLogin() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Get started</CardTitle>
                <CardDescription>You will need a GitHub account to continue</CardDescription>
            </CardHeader>
            <Button>
                <p>Login with GitHub</p>
            </Button>
        </Card>
    );
}