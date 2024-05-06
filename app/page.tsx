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

export default async function Home() {
  const supabase = createClient();
  const queryClient = new QueryClient();
  const profile = await getProfile({ client: supabase });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      return await getPosts({ client: supabase, page: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetPostReturnType) => {
      if (!lastPage.posts?.length || lastPage.posts?.length < POST_PAGE_SIZE) {
        return null;
      }

      return lastPage.page + 1;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-between py-4 sm:py-8 bg-black text-white">
        <div className="max-w-4xl min-w-[320px] px-4 sm:px-8">
          <Profile profile={profile} />
          <PostGridWithPagination />
        </div>
      </main>
    </HydrationBoundary>
  );
}
