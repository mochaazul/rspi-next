import { colors } from '@/constant';
import styled from 'styled-components';

export const BookAppointmentContainer = styled.div`
	background-color: #FAFAFA;
  .content-wrapper {
    width: fit-content;
    padding: 30px 120px 58px 120px;
    margin-top: 50px;
    border-radius: 10px;
    background: var(--pure-white, #FFF);
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.05);
    li {
      line-height: 21px;
    }
  }
`;

export const FormRow = styled.div`
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  flex: 1;
  gap: 24px;
`;

export const FormCol = styled.div`
  display: flex;
  flex: 1;

`;

export const BottomBar = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  z-index: 999;
  bottom: 0;
  border-top: 1px solid ${ colors.grey.lighterOpacity };
  padding-top: 26px;
  padding-bottom: 30px;
  background: ${ colors.white.default };
`;

export const DisclaimerAlert = styled.div`
  background-color: rgba(53, 136, 136, 0.1);
  padding: 24px;
  border-radius: 8px;
`;

export const ConfirmationModalContainer = styled.div`
`;

export const DoctorProfileWidgetContainer = styled.div`
  margin-top: 24px;
  background-color: ${ colors.grey.lightest };
  padding: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  border-radius: 10px;
`;

export const DoctorProfileImage = styled.img`
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

export const SuccessConfModalContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;