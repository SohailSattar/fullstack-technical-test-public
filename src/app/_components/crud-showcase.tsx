import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { CreatePost } from "./create-post";

export default async function CrudShowcase() {
  const latestPost = await api.post.getLatest();

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Latest Post</CardTitle>
      </CardHeader>
      <CardContent>
        {latestPost ? (
          <p className="truncate">Your most recent post: {latestPost.name}</p>
        ) : (
          <p>You have no posts yet.</p>
        )}
        <CreatePost />
      </CardContent>
    </Card>
  );
}
