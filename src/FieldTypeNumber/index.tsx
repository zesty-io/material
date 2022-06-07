import { FormControl, FormLabel } from '@mui/material';
import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';

export interface FieldTypeNumberProps extends Omit<OutlinedTextFieldProps, 'variant'> {}

const FieldTypeText = ({label, ...props }: FieldTypeNumberProps) => {

  return (
    <FormControl fullWidth>
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
