import { Components } from '@mui/material'
import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material/styles';
import palette from './palette'
import typography from './typography';


const components: Components = {
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
               fontSize: '16px', // TODO: fix this, probably pull in size from typography.ts?
               fontFamily: typography.fontFamily,
               //TODO fix this typing
               color: (palette?.primary as SimplePaletteColorOptions)?.contrastText,
               backgroundColor: (palette?.primary as SimplePaletteColorOptions)?.main,

               padding: "15px, 23px",
               lineHeight: "20px",
               bottom: "26px",
               borderRadius: "4px",
               left: "-7px",
            },
            arrow: {
               color: (palette?.primary as SimplePaletteColorOptions)?.main,
            }
        }
    }
}

export default components