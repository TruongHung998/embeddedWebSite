import moment from 'moment'
import numeral from 'numeral'

export const vnd = (val, format = '0,0', suffix = 'đ') => {
  return numeral(val).format(format) + suffix
}

export const age = birthday => {
  if (!birthday) return null
  if (moment(birthday) > moment()) return null
  const dur = moment.duration(moment().diff(birthday))
  if (dur < moment.duration(1, 'year').valueOf()) {
    const month = dur.get('month')
    const week = dur.get('week')
    const day = dur.get('day')
    return [
      ...(month > 0 ? [month, 'tháng'] : []),
      ...(week > 0 ? [week, 'tuần'] : []),
      ...(day % 7 > 0 ? [day % 7, 'ngày'] : [])
    ].join(' ') + ' tuổi'
  }
  if (dur < moment.duration(6, 'year').valueOf()) {
    const year = dur.get('year')
    const month = dur.get('month')
    return [
      ...(year > 0 ? [year, 'năm'] : []),
      ...(month > 0 ? [month, 'tháng'] : []),
    ].join(' ') + ' tuổi'
  }
  return `${dur.get('year')} tuổi`
}
