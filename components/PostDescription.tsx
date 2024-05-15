import { Database } from "@/types/supabase";

export const PostDescription = ({
  post,
}: {
  post: Database["public"]["Tables"]["POST"]["Row"] | null;
}) => {
  if (post === null) {
    return (
      <div className="p-4 text-white">
        <h2 className="text-xl font-semibold">
          앗! 알수없는 오류가 발생했어요.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="pt-2 break-keep">{post.description}</p>
    </div>
  );
};
