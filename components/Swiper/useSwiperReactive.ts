import { useCallback, useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';

export const useSwiperReactive = () => {
	const swiper = useSwiper();
	const [, setSignal] = useState({});
	const forceRerender = useCallback(() => setSignal({}), []);

	useEffect(() => {
		if (swiper) {
			swiper.on('slideChange', forceRerender);

			return () => {
				swiper.off('slideChange', forceRerender);
			};
		}
	}, [swiper, forceRerender]);

	return swiper;
};
