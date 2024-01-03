'use client';
import { colors } from '@/constant';
import styled from 'styled-components';

export const TextContainer = styled.div`
  line-height: 30px;
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
	h1,h2,h3,h4,h5,h6,p,span {
		font-size: revert;
    line-height: revert;
		font-weight: revert;
	}
	a {
		color: revert;
		text-decoration: revert;
	}
	ul, ol {
		list-style: revert;
    margin: revert;
    padding: revert;
	}
`;