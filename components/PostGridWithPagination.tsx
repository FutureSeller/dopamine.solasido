"use client";

import Link from "next/link";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetPostReturnType,
  POST_PAGE_SIZE,
  getPosts,
} from "@/queries/get-posts";
import { Spinner } from "./Spinner";
import { LazyImage } from "./LazyLoadImage";
import { ReactNode } from "react";

export const PostGridWithPagination = (props: {
  id: number;
  tags?: ReactNode;
}) => {
  const supabase = useSupabaseBrowser();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam }) =>
        getPosts({ client: supabase, id: pageParam }),
      initialPageParam: props?.id,
      getNextPageParam: (lastPage: GetPostReturnType) => {
        if (
          !lastPage.posts?.length ||
          lastPage.posts?.length < POST_PAGE_SIZE
        ) {
          return null;
        }

        return lastPage.posts[lastPage.posts.length - 1].id ?? null;
      },
    });

  return (
    <section>
      <h2 className="sr-only">여우툰 목록</h2>
      <>{props.tags}</>
      <ul className="grid grid-cols-3 gap-1 py-1">
        {data?.pages.map((page) => {
          return page.posts?.map((post) => (
            <li
              key={post.id}
              className="relative hover:brightness-75 aspect-square transition-all duration-300 bg-gray-600"
            >
              <Link
                href={`/post/${post.id}`}
                className="absolute block focus:outline-none focus:ring-1 focus:ring-orange-300 z-10"
                scroll={false}
                passHref
              >
                <LazyImage src={post.thumbnail} alt={post.title} />
              </Link>
            </li>
          ));
        })}
      </ul>
      {hasNextPage && (
        <button
          className="flex justify-center items-center w-full mt-1 py-2 bg-orange-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
