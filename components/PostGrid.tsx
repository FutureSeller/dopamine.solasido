import Link from 'next/link';
import { Database } from '@/types/supabase';

export const PostGrid = ({
	posts,
}: {
	posts: Array<Database['public']['Tables']['POST']['Row']> | null;
}) => {
	if (posts === null) return null;

	return (
		<ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 py-1">
			{posts.map((post) => (
				<li
					key={post.id}
					className="relative hover:brightness-75 aspect-square transition-all duration-300 w-full h-auto"
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
			))}
		</ul>
	);
};
