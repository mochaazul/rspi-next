import styled from 'styled-components';

export const TabsDataStyle = styled.div`

    @media screen and (max-width: 650px) {
      overflow-x: hidden;
      -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
      scrollbar-width: none;  /* Hide scrollbar for Firefox */

      &::-webkit-scrollbar {
        display: none; /* Hide scrollbar for Chrome, Safari and Opera */
      }
        
    }
`;
