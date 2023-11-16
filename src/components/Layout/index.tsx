import React from 'react';

import {
	OutletStyle,
	OutletStyleType,
	PanelH1,
	PanelH2,
	PanelH3,
	PanelH4,
	PanelV1
} from './style';

type LayoutProps = {
	containerStyle?: OutletStyleType;
	children?: React.ReactNode;
};

const Layout = ({ containerStyle, children }: LayoutProps) => {
	return (
		<OutletStyle { ...containerStyle }>
			{ children }
		</OutletStyle>
	);
};

export default Object.assign(React.memo(Layout), {
	PanelH1: PanelH1,
	PanelH2: PanelH2,
	PanelH3: PanelH3,
	PanelH4: PanelH4,
	PanelV1: PanelV1
});