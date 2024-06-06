import { Database } from "@/types/supabase";
import Link from "next/link";

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
      <h2 className="text-base sm:text-xl font-semibold">
        <Link
          href={post.link}
          className="block focus:outline-none focus:ring-1 focus:ring-amber-300 hover:text-amber-500"
          target="_blank"
          rel="noreferrer"
          passHref
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-sm sm:text-base pt-2 break-keep">{post.description}</p>
    </div>
  );
};
