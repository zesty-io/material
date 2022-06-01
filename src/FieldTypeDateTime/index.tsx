import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, DateTimePickerProps} from '@mui/x-date-pickers/DateTimePicker';
import { TextField, TextFieldProps } from '@mui/material';

export interface FieldTypeDateTimeProps extends Omit<DateTimePickerProps<Date, Date>, 'renderInput'> {
  /**
   * Props passed to TextField component
   */
  textFieldProps?: TextFieldProps;
};

const FieldTypeDateTime = ({textFieldProps, ...props}: FieldTypeDateTimeProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        data-testid="zds-date-picker"
        renderInput={(params) => 
          <TextField
            InputLabelProps={{
              shrink: true,
              // Spread props at the end to allow InputLabelProps overrides
              ...textFieldProps?.InputLabelProps,
            }}
            {...params}
            // Spread props at the end to allow textFieldProps overrides
            {...textFieldProps}
          />
        }
         // Spread props at the end to allow prop overrides
        {...props}
      />
    </LocalizationProvider>
  );
}

export default FieldTypeDateTime;