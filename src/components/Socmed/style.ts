import styled from 'styled-components';
import { colors } from '@/constant';

const SocmedStyle = styled.div`

.socmed-container,
.socmed-bg-content {
	display: flex;
	align-items: center;
	gap: 16px;
	
 	.dark-content {
		min-width: 40px;
		min-height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		transition: 0.5s;
		cursor: pointer;
	
		&:hover {
			transform: translateY(-10px);
		}
	}
}

.socmed-container .content {
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	transition: .5s;
	cursor: pointer;

	&:hover {
		background: ${ colors.green.toscaLight };
		transform: translateY(-10px);
	}
}

.telegram {
	width: 25px;
	height: 25px;
}

.socmed-bg-content .content {
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	transition: .5s;
	background: #141E30;

	&:hover {
		transform: translateY(-10px);
	}
}

.socmed-container .content img {
	min-width: 20px;
	min-height: 20px;
}

@media screen and (max-width: 900px) {
	.socmed-container,
	.socmed-bg-content {
		gap: 5px;
	}
}

`;

export default SocmedStyle;
