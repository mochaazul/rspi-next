import styled from 'styled-components';

interface ModalStyleProps {
	width?: string;
	$noPadding: boolean;
	$bgColor: string;
	$borderRadius?: string;
	backdropColor?: string;
	$padding: string;
	overflow?: string;
	bottomSheet?: boolean;
	$paddingSm: string;
}

const ModalStyle = styled.div<ModalStyleProps>`
  position: fixed;
  
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 9999;

  .modal-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }
 

  .modal-header{
    padding: ${ props => props.$noPadding ? '0px' : props => props.$padding };
    padding-top: 16px;
    padding-bottom: 0px;
  }

  .modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${ props => props.backdropColor || 'rgba(0, 0, 0, 0.5)' };
    z-index: 0;
  }

  .modal-content-wrapper {
    position: relative;
    z-index: 10;
  }

  .modal-content-container {
    width: ${ props => props.width ? props.width : 'unset' };
    border-radius: ${ props => props.$borderRadius || '5px' };
    background: white;
    z-index: 1;
  }
  
  
  .modal-content {
    padding: ${ props => props.$noPadding ? '0px' : props => props.$padding };
    max-height: 95vh;
    overflow-y: ${ props => props.overflow ?? 'scroll' };

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    
    &::-webkit-scrollbar {
      display: none;
    }

    @media screen and (max-width: 500px) {
      overflow: auto;
      padding: ${ props => props.$noPadding ? '0px' : props => props.$paddingSm };
    }
  }
  @media screen and (max-width: 500px) {
    .modal-content-container.bottom-sheet{
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .modal-wrapper.bottom-sheet{
      align-items: flex-end;
    }
    .modal-content.bottom-sheet{
      max-height: 65vh;
      padding-top: 0px;
    }
  }

  .modal-title {
    padding: 15px 20px 10px 20px;
    border-bottom: 1px solid #444444;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1)
  }

  .close-btn {
    position: absolute;
    right: 40px;
    top: 45px;
    width: fit-content;
    margin-left: auto;
    cursor: pointer;

    @media screen and (max-width: 500px) {
      right: 20px;
      top: 25px;
    }
  }
  
  @keyframes slideUp {
    0% {
      transform: translate(0px, -100vh);
      opacity: 0;
    }

    100% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
  }
  
  @keyframes slideDown {
    0% {
      transform: translate(0px, 0px);
      opacity: 1;
    }
    
    100% {
      transform: translate(0px, -100vh);
      opacity: 0;
    }
  }

  .backdrop-open-animation {
    animation: fadeIn 300ms ease forwards;
  }
  
  .backdrop-close-animation {
    animation: fadeOut 300ms ease forwards;
  }

  .open-animation {
    animation: slideUp 500ms ease forwards;
  }

  .close-animation {
    animation: slideDown 500ms ease forwards;
  }
`;

export default ModalStyle;