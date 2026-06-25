import type { PickersLocaleText } from "@mui/x-date-pickers-pro";

// Custom MUI X Date Pickers localeText for Hindi (hi-IN).
//
// MUI X ships no Hindi Date Pickers locale (es/zh/ru/nl only), so we supply
// our own. Covers picker UI strings MUI renders itself (OK/Cancel/Clear/Today
// buttons, toolbar titles, clock/calendar aria labels, field placeholders).
//
// Typed Partial<PickersLocaleText<any>>: any key MUI adds in a future version
// falls back to its built-in English rather than erroring.
//
// To add another unshipped locale: create a sibling file exporting a
// Partial<PickersLocaleText<any>> and export it from this package.
const views: Record<string, string> = {
  hours: "घंटे",
  minutes: "मिनट",
  seconds: "सेकंड",
  meridiem: "पूर्वाह्न/अपराह्न",
};

export const hiIN: Partial<PickersLocaleText<any>> = {
  // Calendar navigation
  previousMonth: "पिछला महीना",
  nextMonth: "अगला महीना",
  openPreviousView: "पिछला दृश्य खोलें",
  openNextView: "अगला दृश्य खोलें",
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === "year"
      ? "वर्ष दृश्य खुला है, कैलेंडर दृश्य पर जाएं"
      : "कैलेंडर दृश्य खुला है, वर्ष दृश्य पर जाएं",

  // Range labels
  start: "प्रारंभ",
  end: "समाप्त",
  startDate: "प्रारंभ तिथि",
  startTime: "प्रारंभ समय",
  endDate: "समाप्ति तिथि",
  endTime: "समाप्ति समय",

  // Action buttons
  cancelButtonLabel: "रद्द करें",
  clearButtonLabel: "साफ़ करें",
  okButtonLabel: "ठीक है",
  todayButtonLabel: "आज",

  // Toolbar titles
  datePickerToolbarTitle: "तिथि चुनें",
  dateTimePickerToolbarTitle: "तिथि और समय चुनें",
  timePickerToolbarTitle: "समय चुनें",
  dateRangePickerToolbarTitle: "तिथि सीमा चुनें",

  // Clock labels
  clockLabelText: (view, time, utils, formattedTime) =>
    `${views[view] ?? view} चुनें। ${
      !formattedTime && (time === null || !utils.isValid(time))
        ? "कोई समय चयनित नहीं है"
        : `चयनित समय ${formattedTime ?? utils.format(time, "fullTime")} है`
    }`,
  hoursClockNumberText: (hours) => `${hours} घंटे`,
  minutesClockNumberText: (minutes) => `${minutes} मिनट`,
  secondsClockNumberText: (seconds) => `${seconds} सेकंड`,
  selectViewText: (view) => `${views[view] ?? view} चुनें`,

  // Calendar week number
  calendarWeekNumberHeaderLabel: "सप्ताह संख्या",
  calendarWeekNumberHeaderText: "#",
  calendarWeekNumberAriaLabelText: (weekNumber) => `सप्ताह ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,

  // Open picker dialogue (aria)
  openDatePickerDialogue: (value, utils, formattedDate) =>
    formattedDate || (value !== null && utils.isValid(value))
      ? `तिथि चुनें, चयनित तिथि ${
          formattedDate ?? utils.format(value, "fullDate")
        } है`
      : "तिथि चुनें",
  openTimePickerDialogue: (value, utils, formattedTime) =>
    formattedTime || (value !== null && utils.isValid(value))
      ? `समय चुनें, चयनित समय ${
          formattedTime ?? utils.format(value, "fullTime")
        } है`
      : "समय चुनें",

  // Field section clear
  fieldClearLabel: "साफ़ करें",

  // Table aria labels
  timeTableLabel: "समय चुनें",
  dateTableLabel: "तिथि चुनें",

  // Field section placeholders
  fieldYearPlaceholder: (params) => "व".repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) =>
    params.contentType === "letter" ? "मममम" : "मम",
  fieldDayPlaceholder: () => "दद",
  fieldWeekDayPlaceholder: (params) =>
    params.contentType === "letter" ? "वववव" : "वव",
  fieldHoursPlaceholder: () => "घघ",
  fieldMinutesPlaceholder: () => "मिमि",
  fieldSecondsPlaceholder: () => "सेसे",
  fieldMeridiemPlaceholder: () => "पूअ",

  // Section nouns
  year: "वर्ष",
  month: "माह",
  day: "दिन",
  weekDay: "सप्ताह का दिन",
  hours: "घंटे",
  minutes: "मिनट",
  seconds: "सेकंड",
  meridiem: "पूर्वाह्न/अपराह्न",

  // Empty value
  empty: "खाली",
};
