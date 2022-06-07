import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { Button, FormControl, FormLabel, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface FieldTypeSortProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  value: string;
}

const FieldTypeSort = ({label, value, InputProps, ...props }: FieldTypeSortProps) => {
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        type='number'
        value={value}
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
                  input.value = String(+input.value - 1)
                }}><RemoveIcon fontSize='small' />
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
                  input.value = String(+input.value + 1)
                }}><AddIcon fontSize='small' />
              </Button>
            </InputAdornment>
          ),
          // Spread props at the end to allow Input prop overrides
          ...InputProps,
        }}
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeSort;
