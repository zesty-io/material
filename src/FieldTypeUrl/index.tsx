import { useRef } from 'react';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel, InputAdornment } from '@mui/material';

export interface FieldTypeUrlProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 2000
   */
  maxLength?: number;
  value: string;
}

const FieldTypeUrl = ({label, maxLength = 2000, value, helperText, inputProps, ...props }: FieldTypeUrlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormControl fullWidth>
      <FormLabel sx={{display: 'flex', justifyContent: 'space-between'}}>
        <div>{label}</div> 
        <div>{value.length}/{maxLength}</div>
      </FormLabel>
      <MuiTextField
        size="small"
        type='url'
        variant='outlined'
        value={value}
        inputProps={{
          ref: inputRef,
          // Spread props at the end to allow inputProps prop overrides
          ...inputProps,
        }}
        error={(value && !inputRef.current?.validity.valid) || value.length > maxLength}
        helperText={value.length > maxLength ? 'Your input is over the specified limit' : (value && !inputRef.current?.validity.valid) ? 'Your input is not a valid url' : helperText}
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeUrl;
