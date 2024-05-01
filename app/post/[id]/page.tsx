import { createClient } from "@/utils/supabase/server";
import { PostSwiper } from "@/components/Swiper/PostSwiper";
import { Profile } from "@/components/Profile";
import { PostDescription } from "@/components/PostDescription";

export default async function PostPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: profile } = await supabase.from("PROFILE").select().single();
  const { data: post } = await supabase
    .from("POST")
    .select()
    .eq("id", id)
    .single();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8 bg-black text-white">
      <div className="w-full max-w-2xl min-w-[320px] px-8">
        <Profile profile={profile} />
        <div className="py-2 w-full">
          <PostSwiper images={post?.images ?? []} />
          <PostDescription post={post} />
        </div>
      </div>
    </main>
  );
}
