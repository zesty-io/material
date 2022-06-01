import { useRef } from 'react';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { Button, InputAdornment } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

export interface FieldTypeColorProps extends Omit<OutlinedTextFieldProps, 'variant'> {}

const FieldTypeColor = ({InputProps, InputLabelProps, ...props }: FieldTypeColorProps) => {

  return (
      <MuiTextField
        size="small"
        variant='outlined'
        type='color'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                  // References color input via event in order to open color picker
                  const input = e.currentTarget?.parentElement?.parentElement?.firstElementChild as HTMLInputElement;
                  input?.click()
                }}
              >
                <BrushIcon fontSize='small' />
              </Button>
            </InputAdornment>
          ),
          // Spread props at the end to allow Input prop overrides
          ...InputProps,
        }}
        InputLabelProps={{
          shrink: true,
          // Spread props at the end to allow InputLabel prop overrides
          ...InputLabelProps,
        }}
        // Spread props at the end to allow prop overrides
        {...props}
      />
  );
};

export default FieldTypeColor;
