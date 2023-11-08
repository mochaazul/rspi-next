import React from 'react';
import {
	useLocation,
	useNavigation,
	useOutlet
} from 'react-router-dom';

import { Footer, Header, CallForAmbulance } from '@/components';

import {
	OutletStyle,
	OutletStyleType,
	PanelH1,
	PanelH2,
	PanelH3,
	PanelH4,
	PanelV1
} from './style';
import DevTools from '@/components/DevTools';
import { appStage } from '@/config';
import MedicalRecordReminder from '@/components/MedicalRecordReminder';

// we use this values to determine where shoul we display reminder component
const blacklistedRoute = ['/patient-portal', '/doctor-detail', '/book-appointment'];

const Layout = (props: { containerStyle?: OutletStyleType; footerShow?: boolean; }) => {
	const Outlet = useOutlet();
	const { pathname } = useLocation();

	const shouldRenderReminder = !blacklistedRoute.some(route => pathname.includes(route));

	return (
		<>
			<Header />
			<OutletStyle { ...props.containerStyle }>
				{ Outlet }
			</OutletStyle>
			{ props.footerShow !== false &&
				<CallForAmbulance />
			}
			{ props.footerShow !== false &&
				<Footer />
			}
			{
				appStage !== 'prod' &&
				<DevTools />
			}
			{
				shouldRenderReminder &&
				<MedicalRecordReminder />
			}
		</>
	);
};

export default Object.assign(React.memo(Layout), {
	PanelH1: PanelH1,
	PanelH2: PanelH2,
	PanelH3: PanelH3,
	PanelH4: PanelH4,
	PanelV1: PanelV1
});