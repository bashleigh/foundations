import {
  getMarketplaceGlobalsByKey,
  GLOBAL_KEY,
  LOCALSTORAGE_KEY,
  setMarketplaceGlobalsByKey,
  clearMarkeplaceGlobals,
  restoreGlobalObjectFromLS,
  injectSwitchModeToWindow,
} from '..'
;(global as any).console = { log: jest.fn() }
const oldWindow = (global as any).window

beforeAll(() => {
  ;(global as any).window = undefined
})
afterAll(() => {
  ;(global as any).window = oldWindow
})

describe('getMarketplaceGlobalsByKey', () => {
  it('Should return undefined if window or window[GLOBAL_KEY] undefined', () => {
    ;(global as any).window = undefined as any
    expect(getMarketplaceGlobalsByKey()).toBeUndefined()
    ;(global as any).window[GLOBAL_KEY] = undefined
    expect(getMarketplaceGlobalsByKey()).toBeUndefined()
  })

  it('Should return entire object if key is undefined', () => {
    const globalObject = { key: 'value' }
    ;(global as any).window[GLOBAL_KEY] = globalObject
    expect(getMarketplaceGlobalsByKey()).toEqual(globalObject)
  })
  it('Should return correct key', () => {
    const globalObject = { key1: 'value' }
    ;(global as any).window[GLOBAL_KEY] = globalObject
    expect(getMarketplaceGlobalsByKey('key1')).toEqual('value')
  })
})

describe('setMarketplaceGlobalsByKey', () => {
  it('should return correct object if localStorage available', () => {
    ;(global as any).window.localStorage.getItem = jest.fn(() => JSON.stringify({ key: 'value' }))
    ;(global as any).window.location.reload = jest.fn()
    const result = setMarketplaceGlobalsByKey({ key2: 'value2' })
    expect(result).toEqual({ key: 'value', key2: 'value2' })
  })

  it('should return correct object if localStorage available and pass in undefined', () => {
    ;(global as any).window.localStorage.getItem = jest.fn(() => JSON.stringify({ key: 'value' }))
    ;(global as any).window.location.reload = jest.fn()
    const result = setMarketplaceGlobalsByKey()
    expect(result).toEqual({ key: 'value' })
  })

  it('should return correct object if localStorage available and pass in undefined and getItem return null', () => {
    ;(global as any).window.localStorage.getItem = jest.fn(() => null)
    ;(global as any).window.location.reload = jest.fn()
    const result = setMarketplaceGlobalsByKey()
    expect(result).toEqual({})
  })
})

describe('clearMarkeplaceGlobals', () => {
  it('should clear LocalStorage if it is available', () => {
    ;(global as any).window.localStorage.removeItem = jest.fn()
    ;(global as any).window.location.reload = jest.fn()
    const result = clearMarkeplaceGlobals()
    const spyRemove = jest.spyOn(window.localStorage, 'removeItem')
    const spyReload = jest.spyOn(window.location, 'reload')
    expect(spyRemove).toHaveBeenCalledWith(LOCALSTORAGE_KEY)
    expect(spyReload).toHaveBeenCalled()
    expect(result).toBe(true)
  })
})

describe('restoreGlobalObjectFromLS', () => {
  it('should return correct object if storageAvailable', () => {
    ;(global as any).window.localStorage.getItem = jest.fn(() => JSON.stringify({ key: 'value' }))
    ;(global as any).window.localStorage.setItem = jest.fn()
    const result = restoreGlobalObjectFromLS()
    expect(result).toEqual({ key: 'value' })
  })

  it('should return false if getItem return non-object', () => {
    ;(global as any).window.localStorage.getItem = jest.fn(() => false)
    ;(global as any).window.localStorage.setItem = jest.fn()
    const result = restoreGlobalObjectFromLS()
    expect(result).toEqual(false)
  })
})

describe('injectSwitchModeToWindow', () => {
  beforeAll(() => {
    Object.defineProperty = jest.fn()
  })

  afterEach(() => {
    ;(Object.defineProperty as jest.Mocked<any>).mockClear()
  })

  it('should not call restoreGlobalObjectFromLS if not writable or window[GLOBAL_KEY] is undefined', () => {
    Object.getOwnPropertyDescriptor = jest.fn(() => ({ writable: false }))
    injectSwitchModeToWindow()
    expect(Object.defineProperty).toHaveBeenCalledTimes(2)
  })
})
