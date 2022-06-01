import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps} from '@mui/x-date-pickers/DatePicker';
import { TextField, TextFieldProps } from '@mui/material';

export interface FieldTypeDateProps extends Omit<DatePickerProps<Date, Date>, 'renderInput'> {
  /**
   * Props passed to TextField component
   */
  textFieldProps?: TextFieldProps;
};

const FieldTypeDate = ({textFieldProps, ...props}: FieldTypeDateProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        data-testid="zds-date-picker"
        renderInput={(params) => 
          <TextField
            InputLabelProps={{
              shrink: true,
              ...textFieldProps?.InputLabelProps,
            }}
            {...params}
            {...textFieldProps}
          />
        }
        {...props}
      />
    </LocalizationProvider>
  );
}

export default FieldTypeDate;