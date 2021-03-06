export interface Launch {
  data_utc: string,
  failures: Array<any>,
  id: string,
  launchpad: {
    name: string,
    id: string
  },
  name: string,
  payloads: {
    orbit: string,
    id: string
  }[],
  rocket: {
    name: string,
    id: string
  }
  success: boolean,
  upcoming: boolean
}
