import { Components } from '@mui/material'
import { SimplePaletteColorOptions } from '@mui/material/styles';
import palette from './palette'


const components: Components = {
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
               color: (palette.primary as SimplePaletteColorOptions).contrastText,
               backgroundColor: (palette.primary as SimplePaletteColorOptions).main,
               fontSize: "14px",
               lineHeight: "20px",
            },
            arrow: {
               color: (palette.primary as SimplePaletteColorOptions).main,
            }
        }
    }
}

export default components