import { GoTariff, GoData } from '@zbit/octopus/shared'
import { getMonth, currYear, currMonth } from "./"

export const getYear = async (year: string, goTariff: GoTariff): Promise<GoData> => {

  // In 2022 start with October, else with January
  const start = year === '2022' ? 10 : 1

  // In current year end with current month
  const stop = Number(year) === currYear() ? currMonth() : 12

  let kwhLow = 0
  let kwhHigh = 0
  let days = 0
  for (let i = start; i <= stop; i++) {
    const month = i < 10 ? '0' + i.toString() : i.toString()
    const data:GoData = await getMonth(year, month, goTariff)
    kwhLow += data.kwhLow
    kwhHigh += data.kwhHigh
    days += data.days
  }
  kwhLow = Math.round(kwhLow * 1000) / 1000
  kwhHigh = Math.round(kwhHigh * 1000) / 1000
  const kwhTotal = Math.round((kwhLow + kwhHigh) * 1000) / 1000
  return {
    error: false,
    message: '',
    date: `Year ${year}`,
    kwhLow, kwhHigh, kwhTotal, days
  }
}
