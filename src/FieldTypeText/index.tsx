import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel, Box, InputAdornment } from '@mui/material';
import { ReactNode } from 'react';

export interface FieldTypeTextProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 150
   */
  maxLength?: number;
  value: string;
  endLabel?: ReactNode;
}

const FieldTypeText = ({label, maxLength = 150, value, helperText, required, endLabel, ...props }: FieldTypeTextProps) => {

  return (
    <FormControl fullWidth required={required}>
      {/* Sets flex order to make appended required asterisk properly positioned */}
      <FormLabel sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', '& .MuiFormLabel-asterisk': {order: 2}}}>
        <Box sx={{ order: 1}}>{label}</Box> 
        <Box sx={{ order: 3, flex: 1, textAlign: 'right'}}>{endLabel}</Box>
      </FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        value={value}
        error={value?.length > maxLength}
        helperText={value?.length > maxLength ? 'Your input is over the specified limit' : helperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{fontSize: '14px'}}>
              {value?.length}/{maxLength}
            </InputAdornment>
          ),
          }}
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeText;
