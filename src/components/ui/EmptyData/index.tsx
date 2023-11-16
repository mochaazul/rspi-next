import { Images, colors } from '@/constant';
import { Text } from '@/components/ui';
import Image from 'next/image';

interface PropsType {
	menu: string;
}

const EmptyData = (props: PropsType) => {

	return (
		<div className='flex flex-col items-center mt-[40px]'>
			<img src={ Images.Empty } alt='empty-placeholder'/>
			<Text
				text={ `Yah! Belum ada ${ props.menu } saat ini` }
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