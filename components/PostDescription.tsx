import { Database } from "@/types/supabase";

export const PostDescription = ({
  post,
}: {
  post: Database["public"]["Tables"]["POST"]["Row"] | null;
}) => {
  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-semibold">{post?.title}</h2>
      <p className="pt-2 break-keep">{post?.description}</p>
    </div>
  );
};
