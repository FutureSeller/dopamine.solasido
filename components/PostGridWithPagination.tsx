"use client";

import Link from "next/link";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetPostReturnType,
  getPosts,
  POST_PAGE_SIZE,
} from "@/queries/get-posts";
import { Spinner } from "./Spinner";

export const PostGridWithPagination = () => {
  const supabase = useSupabaseBrowser();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) =>
        getPosts({ client: supabase, page: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage: GetPostReturnType) => {
        if (
          !lastPage.posts?.length ||
          lastPage.posts?.length < POST_PAGE_SIZE
        ) {
          return null;
        }

        return lastPage.page + 1;
      },
    });

  return (
    <section>
      <h2 className="sr-only">여우툰 목록</h2>
      <ul className="grid grid-cols-3 gap-1 py-1">
        {data?.pages.map((page) => {
          return page.posts?.map((post) => (
            <li
              key={post.id}
              className="relative hover:brightness-75 aspect-square transition-all duration-300"
            >
              <Link
                href={`/post/${post.id}`}
                className="block focus:outline-none focus:ring-1 focus:ring-amber-300"
                scroll={false}
                passHref
              >
                <img src={post.thumbnail} alt={post.title} />
              </Link>
            </li>
          ));
        })}
      </ul>
      {hasNextPage && (
        <button
          className="flex justify-center items-center w-full mt-1 py-2 bg-amber-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? (
            <>
              <Spinner />
              <span className="pl-2">불러오는중</span>
            </>
          ) : (
            "더보기"
          )}
        </button>
      )}
    </section>
  );
};
