import React, {
	useEffect,
	useState
} from 'react';
import * as Icons from 'react-feather';
import Image from 'next/image';
import Text from '@/components/ui/Text';
import Picker from '@/components/ui/Picker';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import images from '@/constant/images';
import icons from '@/constant/icons';
import { colors } from '@/constant';

const languageItem = [
	{
		key: 'id',
		label: 'ID',
		value: 'id',
		longLabel: 'Bahasa Indonesia',
		icon: <icons.IDFlag alt='' className='w-5 h-5 flex-shrink-0 mr-3' />
	},
	{
		key: 'en',
		label: 'EN',
		value: 'en',
		longLabel: 'English',
		icon: <icons.ENFlag alt='' className='w-5 h-5 flex-shrink-0 mr-3' />
	}
];

export const LanguageSelector = () => {

	const setLanguage = useChangeLocale();
	const currentLang = useCurrentLocale();

	const [showLanguagePicker, setShowLanguagePicker] = useState<boolean>(false);

	const onChangeLanguage = (value: any) => {
		setLanguage(value);
		setShowLanguagePicker(false);
	};
	
	return (
		<>
			<div className='flex h-[21px]'>
				{ languageItem.find(item => currentLang === item.value)?.icon }
			</div>
			<div className='flex items-center gap-[5px] cursor-pointer' onClick={ () => setShowLanguagePicker(!showLanguagePicker) }>
				<Text fontSize='16px' fontWeight='900' color='white'>
					{ languageItem.find(item => currentLang === item.value)?.label }
				</Text>
				<icons.LightArrowDown alt='' />
				<div className='absolute right-0 top-10'>
					<Picker show={ showLanguagePicker } className='!mt-0 !shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)]'>
						{
							languageItem.map((item, index) => (
								<div
									key={ index }
									className={ `cursor-pointer p-5 ${ index > 0 ? 'border-t border-[#F0F2F9]' : '' }` }
									onClick={ () => onChangeLanguage(item.value) }
								>
									<>
										{ item.icon }
										<Text
											fontSize='16px'
											fontWeight='700'
											lineHeight='19px'
											color={ item.value === currentLang ? colors.green.brandAccent : colors.black.general }
											text={ item.longLabel }
										/>
									</>
									<Icons.Check className={ `check-icon ${ item.value === currentLang ? '' : 'hidden' }` } size={ 20 } />
								</div>
							))
						}
					</Picker>
				</div>
			</div>
		</>
	);
}

export default LanguageSelector;