import { TypographyVariantsOptions } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

// Module augmentation
declare module '@mui/material/styles' {
  export interface TypographyVariantsOptions {
    body3?: TypographyStyleOptions;
  }
}

const typography: TypographyVariantsOptions = {
  fontFamily: "'Mulish'",
  h1: {
    fontSize: "36px",
    lineHeight: "44px",
  },
  h2: {
    fontSize: "32px",
    lineHeight: "40px",
  },
  h3: {
    fontSize: "28px",
    lineHeight: "36px",
  },
  h4: {
    fontSize: "24px",
    lineHeight: "32px",
  },
  h5: {
    fontSize: "20px",
    lineHeight: "28px",
  },
  h6: {
    fontSize: "16px",
    lineHeight: "22px",
  },
  body1: {
    fontSize: '16px',
    lineHeight : '24px',
  },
  body2: {
    fontSize: '14px',
    lineHeight : '20px',
  },
  body3: {
    fontSize: '12px',
    lineHeight: '18px',
    letterSpacing: '0.15px',
  },
  subtitle1: {
    fontSize: '16px',
    lineHeight: "28px",
  },
  subtitle2: {
    fontSize: '14px',
    lineHeight: "22px",
  },
  caption: {
    fontSize: '12px',
    lineHeight: "20px",
  },
  overline: {
    fontSize: "12px",
    letterSpacing: "1px",
  },
  
};

export default typography;
