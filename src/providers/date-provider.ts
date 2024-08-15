/* eslint-disable no-use-before-define */
import dayjs from 'dayjs'

export class DateProvider {
  private static instance: DateProvider

  private constructor() {}

  public static getInstance(): DateProvider {
    if (!DateProvider.instance) {
      DateProvider.instance = new DateProvider()
    }
    return DateProvider.instance
  }

  isAfter(date: string | Date, newDate: string | Date): boolean {
    return dayjs(date).isAfter(dayjs(newDate))
  }

  startOf(date: string | Date, unit: dayjs.OpUnitType): dayjs.Dayjs {
    return dayjs(date).startOf(unit)
  }

  endOf(date: string | Date, unit: dayjs.OpUnitType): dayjs.Dayjs {
    return dayjs(date).endOf(unit)
  }

  diff(
    date: string | Date,
    newDate: string | Date,
    unit?: dayjs.QUnitType | dayjs.OpUnitType,
  ) {
    return dayjs(date).diff(newDate, unit)
  }
}
