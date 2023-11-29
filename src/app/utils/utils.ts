import { format, toDate, utcToZonedTime } from "date-fns-tz";

export const getCurrentZonedDate = () => utcToZonedTime(toDate(format(Date.now(), 'yyyy-MM-dd', { timeZone: 'Pacific/Tahiti' })), 'Pacific/Tahiti');