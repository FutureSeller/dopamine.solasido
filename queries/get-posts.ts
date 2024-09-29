import { TypedSupabaseClient } from '@/types/client';

export const POST_PAGE_SIZE = 21;

export async function getPosts(params: {
	client: TypedSupabaseClient;
	id?: number;
}) {
	const { data: posts } = await params.client
		.from('POST')
		.select('*')
		.order('id', { ascending: false })
		.lt('id', params.id)
		.limit(POST_PAGE_SIZE)
		.throwOnError();

	return {
		posts,
		id:
			posts && posts.length > 0 ? Number(posts[posts.length - 1].id) - 1 : null,
	};
}

export type GetPostReturnType = Awaited<ReturnType<typeof getPosts>>;

export async function getPostsByTag(params: {
	client: TypedSupabaseClient;
	slug: string;
	id?: number;
}) {
	const { data: posts } = await params.client
		.from('POST')
		.select('*, TAG!inner(*)')
		.order('id', { ascending: false })
		.lt('id', params.id)
		.eq('TAG.slug', params.slug)
		.limit(POST_PAGE_SIZE)
		.throwOnError();

	return {
		posts,
		id:
			posts && posts.length > 0 ? Number(posts[posts.length - 1].id) - 1 : null,
	};
}

export type GetPostByTagReturnType = Awaited<ReturnType<typeof getPostsByTag>>;
