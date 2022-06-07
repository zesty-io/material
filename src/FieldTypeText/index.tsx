import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormControl, FormLabel, Box } from '@mui/material';

export interface FieldTypeTextProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 150
   */
  maxLength?: number;
  value: string;
}

const FieldTypeText = ({label, maxLength = 150, value, helperText, required, ...props }: FieldTypeTextProps) => {

  return (
    <FormControl fullWidth required={required}>
      {/* Sets flex order to make appended required asterisk properly positioned */}
      <FormLabel sx={{display: 'flex', justifyContent: 'space-between', '& .MuiFormLabel-asterisk': {order: 2}}}>
        <Box sx={{ order: 1}}>{label}</Box> 
        <Box sx={{ order: 3, flex: 1, textAlign: 'right'}}>{value?.length}/{maxLength}</Box>
      </FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        value={value}
        error={value?.length > maxLength}
        helperText={value?.length > maxLength ? 'Your input is over the specified limit' : helperText}
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeText;
