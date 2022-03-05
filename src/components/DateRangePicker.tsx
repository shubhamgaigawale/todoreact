import React from 'react';
import { DateRangePicker, DateRange } from "materialui-daterange-picker";

type Props = {}

const DateRangeControl = (props:any) => {

    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<DateRange>({});
   
    const toggle = () => setOpen(!open);
   
    return (
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => setDateRange(range)}
      />
    );

}

export default DateRangeControl;