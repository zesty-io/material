import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';

export interface FieldTypeNumberProps extends Omit<OutlinedTextFieldProps, 'variant'> {}

const FieldTypeText = ({InputLabelProps, ...props }: FieldTypeNumberProps) => {

  return (
      <MuiTextField
        size="small"
        variant='outlined'
        type='number'
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

export default FieldTypeText;
