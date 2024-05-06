import { createClient } from "@/utils/supabase/server";
import { PostSwiper } from "@/components/Swiper/PostSwiper";
import { Profile } from "@/components/Profile";
import { PostDescription } from "@/components/PostDescription";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPost(id: string) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("POST")
    .select()
    .eq("id", id)
    .single();
  return post;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.id);

  return {
    title: post?.title ? `${post.title} | 그냥, 여우!` : (await parent).title,
    description: post?.description || (await parent).description,
    keywords: (await parent).keywords,
    openGraph: {
      url: `https://dopamine.solasido.design/post/${params.id}`,
      title: `${post?.title || ""} | 그냥, 여우!`,
      description: post?.description || "우당탕탕 여우의 신혼 일상툰",
      images: post?.thumbnail,
      type: "article",
    },
    twitter: {
      title: `${post?.title || ""} | 그냥, 여우!`,
      description: post?.description || "우당탕탕 여우의 신혼 일상툰",
      images: post?.thumbnail,
      card: "summary_large_image",
    },
  };
}

export default async function PostPage({ params: { id } }: Props) {
  const supabase = createClient();
  const { data: profile } = await supabase.from("PROFILE").select().single();
  const post = await getPost(id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8 bg-black text-white">
      <div className="w-full max-w-2xl min-w-[320px] px-8">
        <Profile profile={profile} />
        <div className="py-2 w-full">
          <PostSwiper post={post} />
          <PostDescription post={post} />
        </div>
      </div>
    </main>
  );
}
