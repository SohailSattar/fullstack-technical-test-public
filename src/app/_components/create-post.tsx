"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { api } from "~/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
});

export function CreatePost() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const router = useRouter();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const submitHandler = (data: z.infer<typeof formSchema>) => {
    createPost.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  value={value}
                  onChange={onChange}
                  className="w-full rounded-full px-4 py-2 text-black"
                />
              </FormControl>
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
          variant="custom"
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
