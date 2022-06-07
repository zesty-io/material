import { FormControl, FormLabel } from '@mui/material';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';

export interface FieldTypeNumberProps extends Omit<OutlinedTextFieldProps, 'variant'> {}

const FieldTypeText = ({label, required, ...props }: FieldTypeNumberProps) => {

  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <MuiTextField
        size="small"
        variant='outlined'
        type='number'
        // Spread props at the end to allow prop overrides
        {...props}
      />
    </FormControl>
  );
};

export default FieldTypeText;
