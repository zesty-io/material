import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { Button, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface FieldTypeSortProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  value: string;
}

const FieldTypeSort = ({value, InputProps, InputLabelProps, sx, ...props }: FieldTypeSortProps) => {
  return (
      <MuiTextField
        size="small"
        variant='outlined'
        type='number'
        value={value}
        sx={{
          width: 165,
           // Spread props at the end to allow sx prop overrides
          ...sx
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                  // References input via event in order to modify its value
                  const input = e.currentTarget?.parentElement?.parentElement?.childNodes?.[1] as HTMLInputElement;
                  console.log('testing input', input)
                  input.value = String(+input.value + 1)
                }}><AddIcon fontSize='small' />
              </Button>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                  // References input via event in order to modify its value
                  const input = e.currentTarget?.parentElement?.parentElement?.childNodes?.[1] as HTMLInputElement;
                  console.log('testing input', input)
                  input.value = String(+input.value - 1)
                }}><RemoveIcon fontSize='small' />
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

export default FieldTypeSort;
