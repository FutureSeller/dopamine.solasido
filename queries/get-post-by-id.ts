import { TypedSupabaseClient } from '@/types/client';

export async function getPostById(params: {
	client: TypedSupabaseClient;
	id: string;
}) {
	const { data: post } = await params.client
		.from('POST')
		.select()
		.eq('id', params.id)
		.single()
		.throwOnError();

	return post;
}
