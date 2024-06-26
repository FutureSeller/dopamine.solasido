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
import { Tag } from "@/components/Tag";

export const dynamic = "force-static";

export default async function Home() {
  const supabase = createClient();
  const queryClient = new QueryClient();
  const profile = await getProfile({ client: supabase });

  const { data: tags } = await supabase
    .from("TAG")
    .select("name,slug")
    .throwOnError();

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
      <div className="w-full max-w-3xl min-w-[240px] px-4 sm:px-8">
        <Profile profile={profile} />
        <PostGridWithPagination
          id={topPost.id}
          tags={
            <nav className="flex items-center h-12 sm:h-16">
              <ul className="flex gap-2 overflow-x-scroll scrollbar-hide">
                {tags?.map((tag) => (
                  <li key={tag.name}>
                    <Tag tag={tag} />
                  </li>
                ))}
              </ul>
            </nav>
          }
        />
      </div>
    </HydrationBoundary>
  );
}
