import { describe, expect, it } from 'vitest'
import { formatDate } from '@/services/formatDate'

describe('Should handle the formatDate service', () => {

  it('should format a date', async () => {

    const testDate1 = new Date(2023, 11, 24, 10, 33, 30, 0)
    const testDate2 = new Date(2023, 1, 1)

    expect(formatDate(testDate1)).toBe('2023-12-24')
    expect(formatDate(testDate2)).toBe('2023-02-01')
  })
})