'use client';
import { createGlobalStyle, css } from 'styled-components';

import colors from './colors';
import Sizes from './sizes';

export default createGlobalStyle`

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
    font-family: var(--font-family);
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .p-0 {
    padding: 0 !important;
  }

  svg.svg-green path {
    stroke: ${ colors.paradiso.default };
  }

  svg.svg-white path {
    stroke: ${ colors.white.default };
  }

  .innerHTML {
    line-height: 30px;
    font-size: 20px;
    color: ${ colors.grey.darker };
    ol, ul {
      list-style: initial;
      margin: revert;
      padding: revert;
    }
    &.text-14 {
      font-size: 14px;
      line-height: 18px;
    }
    &.text-16 {
      font-size: 16px;
      line-height: 24px;
    }
  }

  .btn-category {
    padding: 5px 10px;
    border-radius: 5px;
    background: ${ colors.paradiso.default };
    color: white;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }


  @media ${ Sizes.md }{
    .md-p-0 {
      padding: 0 !important;
    }
  }
`;

export const GlobalBoxShadow = css`
  box-shadow: 0px 0px 45px -15px rgba(0, 0, 0, .15);
`;

export const GlobalAllTransition5ms = css`
  transition: all .5s;
`;

export const GlobalAllTransition200ms = css`
  transition: all 200ms;
`;

export const GlobalCardShadow = css`
	box-shadow: 5px 5px 100px rgba(53, 136, 136, 0.12);
	border-radius: 16px;
`;

export const GlobalCardShadow2 = css`
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
`;