import styled from 'styled-components';
import colors from '../../../constant/colors';

const HeaderStyle = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  z-index: 1000;
  top: 0;

  .navbar {
    width: 100%;
    display: flex;
    margin: auto;
    justify-content: space-between;
    background-color: ${ colors.white.default };
  }

  .leftNav {
    display: flex;
    img {
      margin: auto;
      align-items: center;
    }
  }

  .rightNav {
    display: flex;
    align-items:center;
  }

  .menu {
    display: flex;
    margin-left: 60px;
    align-items: center;
    gap: 20px;
  }

  .navbar-backdrop {
    height: 80px;
  }

  #dropdown {
    right: 0;
    z-index: 1;
    margin-right: 40px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  #dropdownOurHospital {
    left: 0;
    z-index: 1;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    max-height: 300px;
    overflow-y: auto;
  }

  li {
    font-size: 16px;
    font-weight: 700;
    color: ${ colors.grey.darker }
  }

  .mobile-sidebar {
    display: flex;
    flex-direction: column;
    bottom: 0px;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    background-color: #fff;
    z-index: 99;
    transition: all 500ms ease;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  .nav-menu {
    padding: 20px 26px 20px 0;
      p {
        text-align: right;
      }
  }

  .close-icon {
    justify-content: space-between;
    border-bottom: 1px solid #DADADA;
    padding-bottom: 15px;
  }

  @media screen and (max-width: 1360px) {
    .logo a {
      svg {
        height: 50px;
        width: 100px;
      }
    }
    .menu {
      margin-left: 30px;
      gap: 15px;
    }
  }

  @media screen and (max-width: 640px) {
    .navbar {
      padding: 0 15px;
      box-shadow:0px 4px 4px 0px rgba(53, 136, 136, 0.12);
    }
    .logo a {
      svg {
        height: 50px;
        width: 100px;
      }
    }
  }
`;

export default HeaderStyle;
