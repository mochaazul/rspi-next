import styled from 'styled-components';

export const WarningNote = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 16px;
	background: #E5F5F5;
	border-radius: 4px;
	width: 100%;
	gap: 8px;
	margin-bottom: 62px;

	@media screen and (max-width: 640px) {
		margin-bottom: 42px;
	}
`;
