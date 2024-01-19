import styled from 'styled-components';

export const PrivacyPolicyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const HeaderSection = styled.div`
  padding: 24px 24px 0px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type NumberContainerProps = {
	isActive?: boolean;
};

type PrivacyProps = {
  lang?: string;
}

export const NumberContainer = styled.div<NumberContainerProps>`
  background-color: #D4D2D8;
  ${ props => props.isActive && 'background-color: #2A2536;' }
  color: white;
  font-size: 20px;
  font-weight: 900;
  height: 33px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 99999px;
`;

export const Divider = styled.div`
  height: 2px;
  width: 80px;
  border-top: 2px dashed #D4D2D8;
`;

export const ScrollableContentContainer = styled.div<PrivacyProps>`
  line-height: 24px;
  font-size: 16px;
  max-height: 400px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ul, ol {
    list-style: auto !important;
  }

  li {
    line-height:${ props => props.lang === 'id' ? '50px' : '25px' };
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #F0F2F9;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #D4D2D8;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const FooterSection = styled.div`
  align-items: center;
  background-color: #FAFAFA;
  padding: 24px;
`;