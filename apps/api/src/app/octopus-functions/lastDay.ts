import { currYear, currMonth, currDay } from './'

export const lastDay = (year: string, month: string): number => { 

  // if current month, last day is yesterday
  if (Number(year) === currYear() && Number(month) === currMonth()) {
    return currDay() - 1
  }

  // leap year
  if (month == '02' && Number(year) % 4 == 0) {
    return 29
  }

  const last = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return last[Number(month)]
}


