import MuiTextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

export interface FieldTypeTextProps extends Omit<OutlinedTextFieldProps, 'variant'> {
   /**
   * Max length of the field
   * @default 150
   */
  maxLength?: number;
  value: string;
}

const FieldTypeText = ({maxLength = 150, value, helperText, InputProps, InputLabelProps, ...props }: FieldTypeTextProps) => {

  return (
      <MuiTextField
        size="small"
        variant='outlined'
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <>{value.length}/{maxLength}</>
            </InputAdornment>
          ),
          // Spread props at the end to allow Input prop overrides
          ...InputProps,
        }}
        InputLabelProps={{
          shrink: true,
          // Spread props at the end to allow InputLabel prop overrides
          ...InputLabelProps,
        }}
        error={value.length > maxLength}
        helperText={value.length > maxLength ? 'Your input is over the specified limit' : helperText}
        // Spread props at the end to allow prop overrides
        {...props}
      />
  );
};

export default FieldTypeText;
