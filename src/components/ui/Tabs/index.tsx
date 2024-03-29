'use client';
import React, { useEffect, useRef, useState } from 'react';

import { colors } from '@/constant';
import Text from '@/components/ui/Text';

import { TabsDataStyle } from './style';

type Props = {
	activeTabIndex: number;
	setActiveTabIndex: React.Dispatch<React.SetStateAction<number>>;
	tabsData: string[];
	isBackground?: boolean;
	className?: HTMLDivElement['className'];
	onClickItem?: (i: number) => void;
};

const Tabs: React.FC<Props> = ({
	activeTabIndex,
	setActiveTabIndex,
	tabsData,
	isBackground,
	className,
	onClickItem,
}) => {
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
	const tabsRef = useRef<any>([]);

	useEffect(() => {
		function setTabPosition() {
			const currentTab: any = tabsRef.current[activeTabIndex];

			setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
			setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
		}

		setTabPosition();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', setTabPosition);
		}

		if (typeof window !== 'undefined') {
			return window.removeEventListener('resize', setTabPosition);
		}

		return;
	}, [activeTabIndex]);

	return (
		<TabsDataStyle className={ className }>
			<div className='relative border-solid border-b-[1px] border-b-white/20'>
				<div className='flex space-x-4'>
					{ tabsData.map((tab, idx) => {
						return (
							<button
								key={ idx }
								ref={ el => (tabsRef.current[idx] = el) }
								style={ { backgroundColor: activeTabIndex === idx && isBackground ? colors.paradiso.light : '' } }
								className={ `${ !isBackground ? 'py-4 sm:py-5' : 'py-4 sm:py-5 px-[37px]' } transition-all duration-300` }
								onClick={ () => {
									if (onClickItem) {
										onClickItem(idx);
									}
									setActiveTabIndex(idx);
								} }>
								<Text
									text={ tab }
									fontWeight='700'
									color={ activeTabIndex === idx ? colors.paradiso.default : colors.grey.dark } />
							</button>
						);
					}) }
				</div>
				<span
					className='absolute bottom-0 block h-1 transition-all duration-300'
					style={ {
						left: tabUnderlineLeft,
						width: tabUnderlineWidth,
						backgroundColor: colors.paradiso.default
					} }
				/>
			</div>
		</TabsDataStyle>
	);
};

export default Tabs;