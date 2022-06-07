import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DateTimePickerProps} from '@mui/x-date-pickers/DateTimePicker';
import { TextField, FormControl, FormLabel } from '@mui/material';

export interface FieldTypeDateTimeProps extends Omit<DateTimePickerProps<Date, Date>, 'renderInput'> {
  helperText?: string;
  error?: boolean;
  required?: boolean;
};

const FieldTypeDateTime = ({label, helperText, error, required, ...props}: FieldTypeDateTimeProps) => {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          data-testid="zds-date-picker"
          renderInput={(params) => 
            <TextField
              
              {...params}
              helperText={helperText}
              error={error}
            />
          }
          // Spread props at the end to allow prop overrides
          {...props}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default FieldTypeDateTime;