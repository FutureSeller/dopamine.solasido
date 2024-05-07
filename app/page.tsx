import { createClient } from "@/utils/supabase/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  GetPostReturnType,
  POST_PAGE_SIZE,
  getPosts,
} from "@/queries/get-posts";
import { getProfile } from "@/queries/get-profile";
import { Profile } from "@/components/Profile";
import { PostGridWithPagination } from "@/components/PostGridWithPagination";

export const dynamic = "force-static";

export default async function Home() {
  const supabase = createClient();
  const queryClient = new QueryClient();
  const profile = await getProfile({ client: supabase });

  const { data: topPost } = await supabase
    .from("POST")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
    .single()
    .throwOnError();

  if (topPost?.id == null) {
    return null;
  }

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      return await getPosts({ client: supabase, id: pageParam });
    },
    initialPageParam: topPost?.id + 1,
    getNextPageParam: (lastPage: GetPostReturnType) => {
      if (!lastPage.posts?.length || lastPage.posts?.length < POST_PAGE_SIZE) {
        return null;
      }

      return lastPage.posts[lastPage.posts.length - 1].id ?? null;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-between py-4 sm:py-8 bg-black text-white">
        <div className="w-full max-w-4xl min-w-[320px] px-4 sm:px-8">
          <Profile profile={profile} />
          <PostGridWithPagination id={topPost.id} />
        </div>
      </main>
    </HydrationBoundary>
  );
}
