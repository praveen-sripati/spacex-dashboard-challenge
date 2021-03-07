export interface Launch {
  capsules: Array<any>,
  date_utc: string,
  details: string,
  flight_number: number,
  failures: Array<any>,
  id: string,
  launchpad: {
    name: string,
    id: string
  },
  links: {
    article: string,
    flickr: any,
    patch: {
      large: any,
      small: string
    }
    presskit: any,
    reddit: any,
    webcast: string,
    wikipedia: string,
    youtube_id: any
  },
  name: string,
  payloads: {
    orbit: string,
    id: string
  }[],
  rocket: {
    company: string,
    engines: {
      type: string
    }
    name: string,
    id: string
  }
  success: boolean,
  upcoming: boolean
}
