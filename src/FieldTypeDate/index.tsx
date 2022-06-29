import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps} from '@mui/x-date-pickers/DatePicker';
import { FormControl, FormLabel, TextField } from '@mui/material';

export interface FieldTypeDateProps extends Omit<DatePickerProps<Date, Date>, 'renderInput'> {
  helperText?: string;
  error?: boolean;
  required?: boolean;
};

const FieldTypeDate = ({label, helperText, error, required, ...props}: FieldTypeDateProps) => {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          data-testid="zds-date-picker"
          renderInput={(params) => 
            <TextField
              {...params}
              helperText={helperText}
              error={error}
              size="small"
            />
          }
          // Spread props at the end to allow prop overrides
          {...props}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default FieldTypeDate;