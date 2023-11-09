import styled from 'styled-components';

type ModalType = {
  modalVisible?: boolean;
};

const DashoardStyle = styled.div`
  padding: 30px;
  
  .list-container {
    display: flex;
    flex-wrap: wrap;
  }

  .posts {
    margin: 5px;
    padding: 10px 20px;
    border-radius: 10px;
    border: 3px solid var(--color-blue-100);
    background-color: var(--color-yellow-100);
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    width: 100%;
  }
  
  h1 {
    color: var(--color-blue-100);
  }
`;

const FloatingButton = styled.div`
  position: fixed !important;
  bottom: 20px;
  right: 10px;
  width:50px;
  height:50px;
  background: tomato;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  button {
    min-width: auto !important;
    color: white;
    padding: 0 !important;
    background-color: unset !important;
  }
`;

const Modal = styled.div<ModalType>`
    width:100vw ;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 99;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    top:0;
    visibility: ${ props => props.modalVisible ? 'visible' : 'hidden' };
    `;

const ContentModal = styled.div`
      width: 300px;
      background: white ;
      position:relative;
      z-index: 9999;
      padding: 10px;
    `;

export { DashoardStyle, FloatingButton, Modal, ContentModal };
