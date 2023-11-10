import { colors } from '@/constant';
import styled from 'styled-components';

export const WrapperMobileAppBanner = styled.div`
	width: 100%;
	background: ${ colors.blue.lighter };
	display: flex;
	padding: 0 165px;
	margin-top: 80px;

	@media screen and (max-width: 1438px) {
		padding: 0 120px 0 140px;
	}
	@media screen and (max-width: 1385px) {
		padding: 0 90px 0 110px;
	}
	@media screen and (max-width: 1320px) {
		padding: 0 60px 0 80px;
	}
	@media screen and (max-width: 1265px) {
		padding: 0 0 0 50px;
	}
	@media screen and (max-width: 640px) {
		padding: 24px 16px;
	}

`;