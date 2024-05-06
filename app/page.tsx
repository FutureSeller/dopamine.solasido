import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/components/Profile";
import { PostGrid } from "@/components/PostGrid";

export default async function Home() {
  const supabase = createClient();
  const { data: profile } = await supabase.from("PROFILE").select().single();
  const { data: posts } = await supabase
    .from("POST")
    .select()
    .order("post_at", { ascending: false });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 sm:py-8 bg-black text-white">
      <div className="max-w-4xl min-w-[320px] px-4 sm:px-8">
        <Profile profile={profile} />
        <PostGrid posts={posts} />
      </div>
    </main>
  );
}
