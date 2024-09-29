'use client';

import Link from 'next/link';
import { LazyImage } from './LazyLoadImage';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

interface PostGridSectionProps {
	children: ReactNode;
}

export const PostGridSection = ({ children }: PostGridSectionProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const order = searchParams.get('order') ?? 'desc';

	return (
		<section>
			<h2 className="sr-only">여우툰 목록</h2>
			<nav className="flex justify-end py-2 [&>*]:ml-2">
				<Link
					href={`${pathname}?order=desc`}
					className={[
						'block text-sm hover:text-amber-500 sm:text-base',
						order !== 'asc' && 'text-amber-500',
					].join(' ')}
					prefetch={false}
					replace
					passHref
				>
					최신화부터 보기
				</Link>
				<span className="not-sr-only">|</span>
				<Link
					href={`${pathname}?order=asc`}
					className={[
						'block text-sm hover:text-amber-500 sm:text-base',
						order === 'asc' && 'text-amber-500',
					].join(' ')}
					prefetch={false}
					replace
					passHref
				>
					첫화부터 보기
				</Link>
			</nav>
			<Suspense
				fallback={
					<ul className="grid grid-cols-2 sm:grid-cols-3 gap-1 py-1">
						{Array.from({ length: 21 }).map((_, index) => {
							return (
								<li
									key={index}
									className="relative hover:brightness-75 aspect-square transition-all duration-300 bg-gray-600"
								>
									<LazyImage src="" alt="" />
								</li>
							);
						})}
					</ul>
				}
			>
				{children}
			</Suspense>
		</section>
	);
};
