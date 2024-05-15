"use client";

import Link from "next/link";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  GetPostByTagReturnType,
  POST_PAGE_SIZE,
  getPostsByTag,
} from "@/queries/get-posts";
import { Spinner } from "./Spinner";
import { LazyImage } from "./LazyLoadImage";
import { InfiniteScrollObserver } from "./InfiniteScrollObserver";

export const PostGridByTag = (props: { id: number; slug: string }) => {
  const supabase = useSupabaseBrowser();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", props.slug],
      queryFn: async ({ pageParam }) =>
        getPostsByTag({ client: supabase, id: pageParam, slug: props.slug }),
      initialPageParam: props?.id,
      getNextPageParam: (lastPage: GetPostByTagReturnType) => {
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
        <InfiniteScrollObserver onIntersect={fetchNextPage}>
          {isFetchingNextPage ? (
            <div className="flex justify-center items-center py-2">
              <Spinner className="w-8 h-8" />
            </div>
          ) : null}
        </InfiniteScrollObserver>
      )}
    </section>
  );
};
