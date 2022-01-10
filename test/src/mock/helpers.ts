/// ***************************  Mock Helpers  *************************** ///

/**
 * Takes a mock object and exposes the jest function in `mock` property
 * @example
 * const myClient = exposeMocks({
 *   getTags: jest.fn(() => true)
 * })
 *
 * // Use mock type to change response
 * myClient.mocks.getTags.mockReturnValue(false);
 *
 * // Directly call function
 * myClient.getTags();
 */
export function exposeMocks<T>(
  obj: T
): T & { mocks: Record<keyof T, jest.Mock> }
export function exposeMocks(obj: any): any {
  const keys = Object.keys(obj)

  obj.mocks = {}
  Object.defineProperties(
    obj.mocks,
    Object.fromEntries(
      keys.map((k) => [
        k,
        { get: () => obj[k], enumerable: true, configurable: true },
      ])
    )
  )

  return obj
}
