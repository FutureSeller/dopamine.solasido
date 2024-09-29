import { createClient } from '@/utils/supabase/server';
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from '@tanstack/react-query';
import {
	GetPostReturnType,
	POST_PAGE_SIZE,
	getPosts,
} from '@/queries/get-posts';
import { getProfile } from '@/queries/get-profile';
import { Profile } from '@/components/Profile';
import { PostGridWithPagination } from '@/components/PostGridWithPagination';
import Link from 'next/link';

export default async function Home({
	searchParams,
}: { searchParams: { [key: string]: string | undefined } }) {
	const supabase = createClient();
	const queryClient = new QueryClient();
	const profile = await getProfile({ client: supabase });

	const { data: topPost } = await supabase
		.from('POST')
		.select('id')
		.order('id', { ascending: searchParams.order === 'asc' })
		.limit(1)
		.single()
		.throwOnError();

	if (topPost?.id == null) {
		return null;
	}

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['posts', searchParams.order ?? 'desc'],
		queryFn: async ({ pageParam }) => {
			return await getPosts({
				client: supabase,
				id: pageParam,
				order: searchParams.order,
			});
		},
		initialPageParam: topPost.id,
		getNextPageParam: (lastPage: GetPostReturnType) => {
			if (!lastPage.posts?.length || lastPage.posts?.length < POST_PAGE_SIZE) {
				return null;
			}

			return lastPage.id;
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="w-full max-w-3xl min-w-[240px] px-4 sm:px-8">
				<Profile profile={profile} />
				<PostGridWithPagination
					id={topPost.id}
					filters={
						<nav className="flex justify-end py-2 [&>*]:ml-2">
							<Link
								href="/?order=desc"
								className={[
									'block text-sm hover:text-amber-500 sm:text-base',
									searchParams.order !== 'asc' && 'text-amber-500',
								].join(' ')}
								prefetch={false}
								replace
								passHref
							>
								최신화부터 보기
							</Link>
							<span className="not-sr-only">|</span>
							<Link
								href="/?order=asc"
								className={[
									'block text-sm hover:text-amber-500 sm:text-base',
									searchParams.order === 'asc' && 'text-amber-500',
								].join(' ')}
								prefetch={false}
								replace
								passHref
							>
								첫화부터 보기
							</Link>
						</nav>
					}
				/>
			</div>
		</HydrationBoundary>
	);
}
