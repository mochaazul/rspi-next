import { colors } from '@/constant';
import styled from 'styled-components';

interface StyleProps {
	fontFamily?: string;
	fontSize?: string;
	textalign?: string;
	fontStyle?: string;
	fontDecoration?: string;
	fontWeight?: string;
	color?: string;
	lineheight?: string;
	isGradient?: boolean;
}

const TextStyle = styled.div<StyleProps>`
  /* width: fit-content; */
  ${ props => `
    font-style: ${ props.fontStyle || 'unset' };
    font-size: ${ props.fontSize || '16px' };
    font-weight: ${ props.fontWeight || 'unset' };
    text-align: ${ props.textalign || 'left' };
    line-height: ${ props.lineheight || 'unset' };
    color: ${ props.color || colors.grey.darker };
    ${ !!props.fontDecoration && `border-bottom: 1px solid ${ props.color };` }

    &, h1, h2, h3, h4, h5, p {
      color: ${ props.color || colors.grey.darker };
    }

    h1 {
      font-size: ${ props.fontSize || '44px' };
      text-align: ${ props.textalign || 'left' };
      font-weight: ${ props.fontWeight || '700' };
      line-height: ${ props.lineheight || '41px' };
    }

    h2 {
      font-size: ${ props.fontSize || '32px' };
      text-align: ${ props.textalign || 'left' };
      font-weight: ${ props.fontWeight || '700' };
      line-height: ${ props.lineheight || '41px' };
      
      @media screen and (max-width: 500px) {
        font-size: ${ props.fontSize || '24px' };
        line-height: ${ props.lineheight || '31px' };
      }
    }

    h3 {
      font-size: ${ props.fontSize || '24px' };
      text-align: ${ props.textalign || 'left' };
      font-weight: ${ props.fontWeight || 'unset' };
      font-weight: ${ props.fontFamily };
      line-height: ${ props.lineheight || '36px' } ;

      span {
        font-size: ${ props.fontSize || '2rem' };
        text-align: ${ props.textalign || 'left' };
        font-weight: ${ props.fontWeight || 'unset' };
      }
    }
    
    h4 {
      font-size: ${ props.fontSize || '1.7rem' };
      text-align: ${ props.textalign || 'left' };
      font-weight: ${ props.fontWeight || 'unset' };
    }
    
    p,
    pre {
      font-size: ${ props.fontSize || '16px' };
      text-align: ${ props.textalign || 'left' };
      font-weight: ${ props.fontWeight || 'unset' };
			line-height: ${ props.lineheight || '18px' } ;
    }

    @media screen and (max-width: 720px) {
      h1 {
        font-size: 34px;
      }

      h3 {
        font-size: 24px;
        line-height: 36px;
      }

      h4 {
        font-size: 16px;
        line-height: 26px;
      }

      p,
      pre {
        font-size: 14px;
        line-height: 24px;
      }
    }

    pre {
      white-space: normal;
    }
  `}
`;

export default TextStyle;