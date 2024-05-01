import { Database } from "@/types/supabase";

export const PostDescription = ({
  post,
}: {
  post: Database["public"]["Tables"]["POST"]["Row"] | null;
}) => {
  return (
    <div className="p-4 text-white">
      <h3 className="text-xl font-semibold">{post?.title}</h3>
      <p className="pt-2">{post?.description}</p>
    </div>
  );
};
