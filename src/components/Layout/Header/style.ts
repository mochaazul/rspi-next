import styled from 'styled-components';
import colors from '../../../constant/colors';

const HeaderStyle = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  z-index: 1000;
  top: 0;

  .navbar {
    box-shadow: 0px 4px 4px 0px rgba(53, 136, 136, 0.12);
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

  .dropdownNavbar {
    border-radius: 10px;
    border: 1px solid ${ colors.grey.lightest };
    background: ${ colors.white.default };
    box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.05);
    max-height: 300px;
    overflow-y: auto;
    width: 480px;
  }

  .dropdownPosition {
    top: 0;
    padding-top: 55px;
    left: 0;
    z-index: 1;
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
    height: calc(100vh - 64px);
    max-width: 100%;
    background-color: #fff;
    z-index: 99;
    transition: all 500ms ease;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  .nav-menu {
    padding: 16px;
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
    .logo a {
      svg {
        height: 50px;
        width: 100px;
      }
    }
  }
`;

export const DesktopMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  display: flex;

  li {
    display: block;
    transition-duration: 0.5s;
   }
   
   li:hover {
     cursor: pointer;
   }
   .dropdown-wrapper{
    visibility: hidden;
    opacity: 0;
    position: absolute;
    display: none;
    background-color: white;
    width: 480px;
    z-index: 20;
    top: 100%;
    left: 0;
    transition: all 0.5s ease;
   }
   
  
   li ul {
    max-height: 320px;
    overflow-y: auto;
  }
  
   li:hover > .dropdown-wrapper,
   li .dropdown-wrapper:hover {
    visibility: visible;
    opacity: 1;
    display: block;
    transition: all 0.5s ease;
  }
  
  li ul li {
    clear: both;

  }
`;

export default HeaderStyle;
