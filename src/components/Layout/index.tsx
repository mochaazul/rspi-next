import React from 'react';

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

const Layout = (props: { containerStyle?: OutletStyleType; footerShow?: boolean; }) => {
	// const Outlet = useOutlet();

	return (
		<>
			<Header />
			<OutletStyle { ...props.containerStyle }>
				{/* { Outlet } */}
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