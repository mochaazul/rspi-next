'use client';

import { Images, colors } from '@/constant';
import { Text } from '@/components/ui';
import { useScopedI18n } from '@/locales/client';

interface PropsType {
	menu: string;
}

const EmptyData = (props: PropsType) => {
	const t = useScopedI18n('global');

	return (
		<div className='flex flex-col items-center mt-[40px]'>
			<img src={ Images.Empty.src } alt='empty-placeholder' />
			<Text
				text={ t('emptyData', { label: props.menu?.toLowerCase() || 'data' }) }
				fontWeight='400'
				fontSize='20px'
				lineHeight='30px'
				textAlign='center'
				color={ colors.grey.solid }
				className='mt-[16px]'
			/>
		</div>
	);
};

export default EmptyData;