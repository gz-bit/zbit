import { GoData, GoTariff } from '@zbit/octopus/shared'
import { getDay, lastDay, currDay, currMonth, currYear } from './'

export const getMonth = async (year: string, month: string, goTariff: GoTariff): Promise<GoData> => {
  let kwhLow = 0
  let kwhHigh = 0
  let days = 0

  // In October 2022 start with 21
  const start = year === '2022' && month === '10' ? 21 : 1
  // In current month/year stop yesterday
  const stop = Number(year) === currYear() && Number(month) === currMonth() ? currDay() -1 : lastDay(year, month)

  for (let i = start; i <= stop; i++) {
    const dayString = i < 10 ? '0' + i.toString() : i.toString()
    const day: GoData = await getDay(year, month, dayString, goTariff)
    kwhLow += day.kwhLow
    kwhHigh += day.kwhHigh
    days += day.days

  }
  kwhLow =  Math.round(kwhLow * 1000) / 1000
  kwhHigh = Math.round(kwhHigh * 1000) / 1000
  const kwhTotal = Math.round((kwhLow + kwhHigh) * 1000) / 1000
 
  return {
    error: false,
    message: '',
    date: `${month}/${year}`,
    kwhLow, kwhHigh, kwhTotal, days 
  }
}
