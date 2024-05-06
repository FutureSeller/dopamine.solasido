import { createClient } from "@/utils/supabase/server";
import { Modal } from "./modal";
import { PostSwiper } from "@/components/Swiper/PostSwiper";
import { PostDescription } from "@/components/PostDescription";

export default async function PostModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("POST")
    .select()
    .eq("id", id)
    .single();

  return (
    <Modal>
      <PostSwiper post={post} />
      <PostDescription post={post} />
    </Modal>
  );
}
