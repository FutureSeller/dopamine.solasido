import { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/components/Profile";
import { getProfile } from "@/queries/get-profile";
import {
  GetPostByTagReturnType,
  POST_PAGE_SIZE,
  getPostsByTag,
} from "@/queries/get-posts";
import { QueryClient } from "@tanstack/react-query";
import { PostGridByTag } from "@/components/PostGridByTag";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = "force-static";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = createClient();
  const { data: tag } = await supabase
    .from("TAG")
    .select()
    .eq("slug", params.slug)
    .single()
    .throwOnError();

  return {
    title: tag?.name
      ? `태그 - ${tag?.name} | 그냥, 여우!`
      : (await parent).title,
    description:
      `${tag?.name} 관련 에피소드 모음` || (await parent).description,
    keywords: (await parent).keywords,
    openGraph: {
      url: `https://dopamine.solasido.design/tag/${params.slug}`,
      title: `태그 - ${tag?.name} | 그냥, 여우!`,
      description: `${tag?.name} 관련 에피소드 모음 | 우당탕탕 여우의 신혼 일상툰`,
      type: "article",
    },
    twitter: {
      title: `태그 - ${tag?.name} | 그냥, 여우!`,
      description: `${tag?.name} 관련 에피소드 모음 | 우당탕탕 여우의 신혼 일상툰`,
    },
  };
}

export default async function TagPage({ params: { slug } }: Props) {
  const supabase = createClient();
  const queryClient = new QueryClient();
  const profile = await getProfile({ client: supabase });
  const { data: tag } = await supabase
    .from("TAG")
    .select()
    .eq("slug", slug)
    .single()
    .throwOnError();

  const { data: topPost } = await supabase
    .from("POST")
    .select("id, TAG!inner(*)")
    .order("id", { ascending: false })
    .eq("TAG.slug", slug)
    .limit(1)
    .single()
    .throwOnError();

  if (topPost?.id == null) {
    return null;
  }

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", slug],
    queryFn: async ({ pageParam }) => {
      return await getPostsByTag({ client: supabase, id: pageParam, slug });
    },
    initialPageParam: topPost?.id + 1,
    getNextPageParam: (lastPage: GetPostByTagReturnType) => {
      if (!lastPage.posts?.length || lastPage.posts?.length < POST_PAGE_SIZE) {
        return null;
      }

      return lastPage.posts[lastPage.posts.length - 1].id ?? null;
    },
  });

  return (
    <div className="w-full max-w-3xl min-w-[320px] px-4 sm:px-8">
      <Profile profile={profile} />
      <div className="py-2 w-full">
        <h1 className="text-2xl font-bold text-white py-2">#{tag?.name}</h1>
        <PostGridByTag id={topPost.id} slug={slug} />
      </div>
    </div>
  );
}
