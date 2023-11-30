'use client';
import { useState } from 'react';
import * as Icons from 'react-feather';
import Text from '@/components/ui/Text';
import Picker from '@/components/ui/Picker';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import icons from '@/constant/icons';
import { colors } from '@/constant';
import Image from 'next/image';

const languageItem = [
	{
		key: 'id',
		label: 'ID',
		value: 'id',
		longLabel: 'Bahasa Indonesia',
		icon: <Image src='/images/ic/flag.svg' alt='Indonesia Lang Icon' width={ 20 } height={ 20 } />
	},
	{
		key: 'en',
		label: 'EN',
		value: 'en',
		longLabel: 'English',
		icon: <Image src='/images/ic/eng-flag.svg' alt='English Lang Icon' width={ 20 } height={ 20 } />
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
		<div className='relative flex items-center'>
			<div className='flex items-center gap-2 lg:gap-3 cursor-pointer' onClick={ () => setShowLanguagePicker(!showLanguagePicker) }>
				{ languageItem.find(item => currentLang === item.value)?.icon }
				<div className='flex items-center gap-x-[5px]'>
					<Text fontSize='16px' fontWeight='900' color='white'>
						{ languageItem.find(item => currentLang === item.value)?.label }
					</Text>
					<icons.LightArrowDown />
				</div>
			</div>
			<Picker show={ showLanguagePicker } className='max-lg:min-w-[165px] !mt-0 !mr-0 !shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] left-0 lg:left-auto lg:!right-0 top-7 w-full'>
				{
					languageItem.map((item, index) => (
						<div
							key={ index }
							className={ `flex cursor-pointer py-[15px] lg:py-5 px-5 ${ index > 0 ? 'border-t border-[#F0F2F9]' : '' }` }
							onClick={ () => onChangeLanguage(item.value) }
						>
							<Text
								fontSize='16px'
								fontWeight='700'
								lineHeight='19px'
								color={ item.value === currentLang ? colors.green.brandAccent : colors.black.general }
								text={ item.longLabel }
							/>
						</div>
					))
				}
			</Picker>
		</div>
	);
};

export default LanguageSelector;