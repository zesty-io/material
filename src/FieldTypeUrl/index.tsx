import { useState } from 'react';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel, Box } from '@mui/material';

export interface FieldTypeUrlProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 2000
   */
  maxLength?: number;
  value: string;
}

const FieldTypeUrl = ({label, maxLength = 2000, value, helperText, required, inputProps, ...props }: FieldTypeUrlProps) => {
  // Use state to hold input reference to re-render once ref changes in case error needs to be shown on mount
  const [inputRef, setInputRef] = useState<HTMLInputElement>();

  return (
    <FormControl fullWidth required={required}>
      {/* Sets flex order to make appended required asterisk properly positioned */}
      <FormLabel sx={{display: 'flex', justifyContent: 'space-between', '& .MuiFormLabel-asterisk': {order: 2}}}>
        <Box sx={{ order: 1}}>{label}</Box> 
        <Box sx={{ order: 3, flex: 1, textAlign: 'right'}}>{value?.length}/{maxLength}</Box>
      </FormLabel>
      <MuiTextField
        size="small"
        type='url'
        variant='outlined'
        value={value}
        inputProps={{
          ref: (inputRef: HTMLInputElement) => setInputRef(inputRef),
          // Spread props at the end to allow inputProps prop overrides
          ...inputProps,
        }}
        error={(value && !inputRef?.validity.valid) || value?.length > maxLength}
        helperText={value?.length > maxLength ? 'Your input is over the specified limit' : (value && !inputRef?.validity.valid) ? 'Your input is not a valid url' : helperText}
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeUrl;
