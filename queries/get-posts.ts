import { TypedSupabaseClient } from "@/types/client";

export const POST_PAGE_SIZE = 12;

export async function getPosts(params: {
  client: TypedSupabaseClient;
  page: number;
}) {
  const { data: posts } = await params.client
    .from("POST")
    .select("*")
    .order("post_at", { ascending: false })
    .range(
      params.page * POST_PAGE_SIZE,
      params.page * POST_PAGE_SIZE + POST_PAGE_SIZE - 1
    )
    .throwOnError();

  return { posts, page: params.page };
}

export type GetPostReturnType = Awaited<ReturnType<typeof getPosts>>;
