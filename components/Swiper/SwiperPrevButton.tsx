'use client';

import { useSwiperReactive } from './useSwiperReactive';

export default function SwiperPrevButton() {
	const swiper = useSwiperReactive();

	if (swiper.activeIndex === 0) {
		return null;
	}

	return (
		<button
			className={
				'absolute top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2 bg-gray-800 bg-opacity-50 text-white left-2'
			}
			onClick={() => {
				swiper.slidePrev();
			}}
		>
			{`<`}
		</button>
	);
}
