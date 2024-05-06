import { createClient } from "@/utils/supabase/server";
import { Modal } from "./modal";
import { PostSwiper } from "@/components/Swiper/PostSwiper";
import { PostDescription } from "@/components/PostDescription";
import { getPostById } from "@/queries/get-post-by-id";

export default async function PostModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const post = await getPostById({ client: supabase, id });

  return (
    <Modal>
      <PostSwiper post={post} />
      <PostDescription post={post} />
    </Modal>
  );
}
