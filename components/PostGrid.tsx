import Link from "next/link";
import { Database } from "@/types/supabase";

export const PostGrid = ({
  posts,
}: {
  posts: Array<Database["public"]["Tables"]["POST"]["Row"]> | null;
}) => {
  if (posts === null) return null;

  return (
    <ul className="grid grid-cols-3 gap-1 py-1">
      {posts.map((post) => (
        <li
          key={post.id}
          className="relative group aspect-square transition-all duration-300"
        >
          <img src={post.thumbnail} alt={post.title} />
          <div className="absolute top-0 left-0 w-full h-full invisible group-hover:visible bg-black bg-opacity-50 flex flex-col justify-center items-center z-10">
            <Link
              href={`/post/${post.id}`}
              className="block bg-black hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 z-20"
              scroll={false}
              passHref
            >
              미리보기
            </Link>
            <Link
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="block bg-black hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 z-20"
            >
              바로가기
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
