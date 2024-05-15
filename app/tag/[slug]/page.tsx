import { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/components/Profile";
import { getProfile } from "@/queries/get-profile";
import Link from "next/link";
import { LazyImage } from "@/components/LazyLoadImage";

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
  const profile = await getProfile({ client: supabase });
  const { data: tag } = await supabase
    .from("TAG")
    .select()
    .eq("slug", slug)
    .single()
    .throwOnError();
  const { data: posts } = await supabase
    .from("POST")
    .select("*, TAG!inner(*)")
    .order("id", { ascending: false })
    .eq("TAG.slug", slug);

  return (
    <div className="w-full max-w-3xl min-w-[320px] px-4 sm:px-8">
      <Profile profile={profile} />
      <div className="py-2 w-full">
        <h1 className="text-2xl font-bold text-white py-2">#{tag?.name}</h1>
        <ul className="grid grid-cols-3 gap-1 py-1">
          {posts?.map((post) => {
            return (
              <li
                key={post.id}
                className="relative hover:brightness-75 aspect-square transition-all duration-300 bg-gray-600"
              >
                <Link
                  href={`/post/${post.id}`}
                  className="absolute block focus:outline-none focus:ring-1 focus:ring-amber-300 z-10"
                  scroll={false}
                  passHref
                >
                  <LazyImage src={post.thumbnail} alt={post.title} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
