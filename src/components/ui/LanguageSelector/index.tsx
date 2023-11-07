import React, {
	useEffect,
	useState
} from 'react';
import * as Icons from 'react-feather';

import Text from '@/components/ui/Text';
import Picker from '@/components/ui/Picker';

import images from '@/constant/images';
import icons from '@/constant/icons';

const languageItem = [
	{
		key: 'id',
		label: 'ID',
		value: 'idn',
		icon: <icons.IDFlag className='mr-[20px] h-[20px]' />
	},
	{
		key: 'en',
		label: 'EN',
		value: 'en',
		icon: <icons.ENFlag className='mr-[20px] h-[20px]' />
	}
];

export const LanguageSelector = () => {

	const [currrentLang, setCurrentLang] = useState<string>();
	const [showLanguagePicker, setShowLanguagePicker] = useState<boolean>(false);

	useEffect(() => {
		// check if the language is set in local storage
			// hasLanguageSet();
		// get language config from local storage, if null we gave it default value
		// (which is not necesarry since it was already handled by hasLanguageSet() function)
		// const lang = getLanguage() ?? 'idn';
		// set local state language to localstorage value
		setCurrentLang('idn');
	}, []);

	const onChangeLanguage = (value: string) => {
		// setLanguage(value);
		setCurrentLang(value);
		setShowLanguagePicker(false);
		// We need to reload the page to change all the content language since the header of the request is changed
		// this is the common approach used by many sites for changing the language
		reload();
	};

	const reload = () => {
		window.location.reload();
	};

	return (
		<>
			<div className='flex items-center gap-[20px]'>
				{ languageItem.find(item => currrentLang === item.value)?.icon }
			</div>
			<div className='flex items-center pl-[20px] gap-[8px] cursor-pointer' onClick={ () => setShowLanguagePicker(!showLanguagePicker) }>
				<Text fontSize='16px' fontWeight='900' color='white'>
					{ languageItem.find(item => currrentLang === item.value)?.label }
				</Text>
				<icons.LightArrowDown />
				<div className='absolute right-[-10px] top-7'>
					<Picker show={ showLanguagePicker }>
						{
							languageItem.map((item, index) => (
								<div
									key={ index }
									className={ `cursor-pointer border-gray block py-4 px-4 flex justify-between items-center ${ index < languageItem.length ? '' : 'border-b' } ${ item.value === currrentLang ? 'active' : '' }` }
									onClick={ () => onChangeLanguage(item.value) }
								>
									<>
										{ item.icon }
										<Text
											fontSize='16px'
											fontWeight='700'
											lineHeight='19px'
											text={ item.label }
											className='flex-1'
										/>
									</>
									<Icons.Check className={ `check-icon ${ item.value === currrentLang ? '' : 'hidden' }` } size={ 20 } />
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