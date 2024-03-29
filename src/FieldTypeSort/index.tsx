import { ChangeEvent } from 'react';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { Button, FormControl, FormLabel, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface FieldTypeSortProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  value: string;
}

const FieldTypeSort = ({label, value, InputProps, required, onChange, ...props }: FieldTypeSortProps) => {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        type='number'
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button
                size="small"
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  // References input via click event in order to obtain its value
                  const input = e.currentTarget?.parentElement?.parentElement?.childNodes?.[1] as HTMLInputElement;
                  const newValue = String(+input.value - 1)
                  // Updates internal input value in case component is not controlled
                  input.value = newValue
                  // Mocks an event change
                  const event = {target: {value: newValue}}
                  onChange && onChange(event as ChangeEvent<HTMLTextAreaElement | HTMLInputElement>);
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
                  e.stopPropagation();
                  // References input via click event in order to obtain its value
                  const input = e.currentTarget?.parentElement?.parentElement?.childNodes?.[1] as HTMLInputElement;
                  const newValue = String(+input.value + 1)
                  // Updates internal input value in case component is not controlled
                  input.value = newValue
                  // Mocks an event change
                  const event = {target: {value: newValue}}
                  onChange && onChange(event as ChangeEvent<HTMLTextAreaElement | HTMLInputElement>);
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
