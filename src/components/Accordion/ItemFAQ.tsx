import { useEffect, useState } from 'react';
import * as Icons from 'react-feather';
import Link from 'next/link';

import { colors } from '@/constant';
import { Text } from '@/components';

import { ItemType } from '.';
import { ItemStyle } from './style';
import languages from '@/constant/languages';

const { readMoreLabel } = languages.page.contactUs.faq;

const ItemFAQ = (props: ItemType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleToggleOpen = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (props.isOpen !== undefined) {
			setIsOpen(props.isOpen);
		}
	}, [props.isOpen]);

	return (
		<ItemStyle isOpen={ isOpen } className='flex flex-row'>
			<div className='flex-1'>
				<div className='flex cursor-pointer' onClick={ handleToggleOpen }>
					<div className='flex-1'>
						<Text
							fontSize='16px'
							lineHeight='24px'
							fontType='h4'
							fontWeight='700'
							color={ colors.grey.darker }
							subClassName='max-sm:text-[16px] max-sm:leading-[23px]'
						>
							{ props.title }
						</Text>
					</div>
				</div>
				<div className='item-desc'>
					{
						props.isJSXDesc ? props.desc_jsx :
							<Text
								fontSize='14px'
								lineHeight='22px'
								fontType={ props.readMore ? null : 'p' }
								fontWeight='400'
								color={ colors.grey.darker }
								className={ `${ props.desc !== '' ? 'mt-[15px]' : '' }` }
								subClassName='text-justify'
							>
								{ props.readMore ? props.desc.substring(0, 250) : props.desc }
								{
									props.readMore ?
										<Link href={ `/contact-us/faq/${ props.index }` }>
											<Text
												fontSize='14px'
												lineHeight='21px'
												fontType={ null }
												fontWeight='700'
												color={ colors.paradiso.accent1 }
												className='ml-1 inline-block'
												subClassName='text-justify max-sm:leading-[18px]'
												text={ readMoreLabel }
											/>
										</Link> :
										null
								}
							</Text>
					}
				</div>
			</div>
			<div className='grow-0 cursor-pointer' onClick={ handleToggleOpen }>
				{
					isOpen ? <Icons.MinusCircle /> : <Icons.PlusCircle />
				}
			</div>
		</ItemStyle>
	);
};

export default ItemFAQ;