export function formatDate(date: Date | string): string {
    date = new Date(date)
    const day: string = date.getDate() + ''
    const month: string = date.getMonth() + 1 + ''
    return `${date.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}