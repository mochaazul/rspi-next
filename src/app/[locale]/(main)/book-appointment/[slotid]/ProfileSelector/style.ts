import { colors } from '@/constant';
import styled from 'styled-components';

export const ProfileSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  gap: 30px; 
  margin-bottom: 30px;
`;

export const ProfileSelectorCard = styled.div<{ isActive: boolean; }>`
  display: flex;
  min-width: 228px;
  max-width: 228px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid ${ colors.grey.lighter };
  box-shadow: 5px 5px 10px 0px rgba(53, 136, 136, 0.05);
  cursor: pointer;
  transition: all 150ms;
  ${ props => props.isActive && `
  background-color: #E5F5F5; 
  border-color: ${ colors.green.brandAccent }; ` }

`;

export const ProfileCardHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const ProfileCardRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const SelfProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const OtherProfileSection = styled.div`
  display: flex;
  gap: 16px;
`;
export const CardListsContainer = styled.div`
  display: flex;
  flex: 1;
  padding-bottom: 4px;
  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #d1d1d1;
  }

  ::-webkit-scrollbar-thumb:hover {
    height: 8px;
    background: #d1d1d1;
  }
`;

type ProfilePillsProps = {
	color?: string;
};
export const ProfilePills = styled.div<ProfilePillsProps>`
  width: 10px;
  height: 10px;
  display: block;
  border-radius: 50%;
  background-color: ${ props => props.color ? props.color : colors.grey.light };
  .active{

  }
`;
export const NoProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  border: 1px solid #F0F2F9;
  border-radius: 10px;
  padding: 16px;
  gap: 8px;
`;