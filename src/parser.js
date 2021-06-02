//by Stackoverflow's community (minified)
function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}

export const parseSize = (raw) => {
        return formatBytes(raw)
    }

export const parseDate = (raw) => {
    let date = new Date(raw)
    let dateString = (date.getHours() < 10 ? '0' : '') + date.getHours() + ":" +
        (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + " " +
        date.getDate() + "." + 
        (date.getMonth() + 1) + "." +
        date.getFullYear()
    return dateString
}
const a = null
export default a
