const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const formatDDMMMHHmm = (time) => {
    const date = new Date(time)
    const days = date.getUTCDate()
    const month = date.getUTCMonth()
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    return `${days < 10 ? `0${days}` : days} ${monthNames[month]} ${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${hours >= 12 ? 'PM' : 'AM'
        }`
}

export const formatDDMMYYYYHHmm = (time) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month
        }/${year}`
}

export const formatNumberToTime = (time) => {
    if (typeof time !== 'number') return null
    const sec_num = parseInt(time, 10)
    let days = Math.floor(sec_num / (24 * 3600))
    let hours = Math.floor((sec_num - days * 24 * 3600) / 3600)
    let minutes = Math.floor((sec_num - days * 24 * 3600 - hours * 3600) / 60)
    let seconds = sec_num - days * 24 * 3600 - hours * 3600 - minutes * 60

    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    return `${days ? `${days}d ` : ''}${Number(days) || Number(hours) ? `${hours}h ` : ''}${Number(days) || Number(hours) || Number(minutes) ? `${minutes}m ` : ''
        }${seconds}s`
}
