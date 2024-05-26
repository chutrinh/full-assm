function useDataRange(
  dateRange,
  setStartDateFn,
  setEndDateFn,
  setNumberOfDaysFn
) {
  const startDate = new Date(
    `${dateRange.selection.startDate.getFullYear()}-${
      dateRange.selection.startDate.getMonth() + 1
    }-${dateRange.selection.startDate.getDate()}`
  );
  const endDate = new Date(
    `${dateRange.selection.endDate.getFullYear()}-${
      dateRange.selection.endDate.getMonth() + 1
    }-${dateRange.selection.endDate.getDate()}`
  );

  const timeDifference = endDate - startDate;
  const numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  setNumberOfDaysFn(numberOfDays + 1);
  setStartDateFn(startDate);
  setEndDateFn(endDate);
}

export default useDataRange;
