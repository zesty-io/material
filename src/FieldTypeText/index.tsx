import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel, InputAdornment } from '@mui/material';

export interface FieldTypeTextProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 150
   */
  maxLength?: number;
  value: string;
}

const FieldTypeText = ({label, maxLength = 150, value, helperText, ...props }: FieldTypeTextProps) => {

  return (
    <FormControl fullWidth>
      <FormLabel sx={{display: 'flex', justifyContent: 'space-between'}}>
        <div>{label}</div> 
        <div>{value.length}/{maxLength}</div>
      </FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        value={value}
        error={value.length > maxLength}
        helperText={value.length > maxLength ? 'Your input is over the specified limit' : helperText}
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeText;
