'use client';
import { useState } from 'react';

import Tabs from '@/components/ui/Tabs';

import { TabContainerStyle, TabsStyle } from './style';
import { FindADoctor } from './components';
import { useScopedI18n } from '@/locales/client';
import { HospitalDetail, I_MasterDoctor } from '@/interface';
import { ClinicResponse } from '@/interface/clinic';
import { I_SpecialtyDropdownResponse } from '@/interface/specialities';

const ServicesTabs = ({
	hospitals,
	specialtys
}: {
	hospitals: HospitalDetail[],
	specialtys: I_SpecialtyDropdownResponse[],
}) => {
	const t = useScopedI18n('page.landingPage.services');
	const tabsData = [t('tabsLabel.0')];
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [isActive, setIsActive] = useState(false);

	const toggleIsActive = (status: boolean) => () => {
		setIsActive(status);
	};

	return (
		<TabContainerStyle className='w-full container-page max-sm:px-4'>
			<div className={ `backdrop ${ isActive ? 'active' : '' }` } onClick={ toggleIsActive(false) } />
			<TabsStyle className={ `${ isActive ? 'active' : 'top-4 md:-top-[58px]' }` } onClick={ toggleIsActive(true) }>
				<Tabs
					activeTabIndex={ activeTabIndex }
					setActiveTabIndex={ setActiveTabIndex }
					tabsData={ tabsData }
					isBackground={ true }
					className='rounded-t-[10px] overflow-hidden'
				/>
				<div className='w-full'>
					<FindADoctor
						isTelemedicine={ activeTabIndex === 1 }
						hospitals={ hospitals }
						specialtys={ specialtys }
					/>
				</div>
			</TabsStyle>
		</TabContainerStyle>
	);
};

export default ServicesTabs;