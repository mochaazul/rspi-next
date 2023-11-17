import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';

const Covid19 = () => {

	return (
		<div className='justify-center items-center flex-col flex' style={ { margin: 'auto' } }>
			<Text text={ 'Sudahkah Anda menjalani tes COVID-19?' } fontSize='28px' fontWeight='900' lineHeight='57px' textAlign='center' />
			<Text text={ 'Mari lindungi Anda dan orang-orang yang Anda cintai dengan tes COVID-19 sedini mungkin' } fontWeight='400' fontSize='20px' textAlign='center' lineHeight='24px' />
			<Button
				label='Buat Janji Temu'
				type='submit'
				className='mt-[18px] w-[178px]'
			/>
		</div>
	);
};

export default Covid19;