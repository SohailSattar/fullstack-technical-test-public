import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";

export default async function PostTable() {
  const posts = await api.post.getLast10();

  return (
    <Card>
      <CardContent>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="content-end px-4 py-2">#</TableHead>
              <TableHead className="content-end px-4 py-2">Id</TableHead>
              <TableHead className="content-end px-4 py-2">
                Post Title
              </TableHead>
              <TableHead className="content px-4 py-2">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="px-4 py-2">
                  {posts.indexOf(post) + 1}
                </TableCell>
                <TableCell className="px-4 py-2">{post.id}</TableCell>
                <TableCell className="px-4 py-2">{post.name}</TableCell>
                <TableCell className="px-4 py-2">
                  {new Date(post.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
