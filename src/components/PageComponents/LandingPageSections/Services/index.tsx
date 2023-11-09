'use client';
import  { useState } from 'react';

import Tabs from '@/components/ui/Tabs';

import { TabContainerStyle, TabsStyle } from './style';
import { FindADoctor } from './components';
// import { useScopedI18n } from '@/locales/client';

const ServicesTabs = () => {
	// const t = useScopedI18n('page.landingPage.services');
	const tabsData = ['label1'];
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [isActive, setIsActive] = useState(false);

	const toggleIsActive = (status: boolean) => () => {
		setIsActive(status);
	};

	return (
		<TabContainerStyle>
			<div className={ `backdrop ${ isActive ? 'active' : '' }` } onClick={ toggleIsActive(false) } />
			<TabsStyle className={ `${ isActive ? 'active' : '' }` } onClick={ toggleIsActive(true) }>
				<Tabs
					activeTabIndex={ activeTabIndex }
					setActiveTabIndex={ setActiveTabIndex }
					tabsData={ tabsData }
					isBackground={ true }
					className='rounded-t-[10px] overflow-hidden'
				/>
				<div className='mt-[30px]'>
					<FindADoctor isTelemedicine={ activeTabIndex === 1 } />
				</div>
			</TabsStyle>
		</TabContainerStyle>
	);
};

export default ServicesTabs;