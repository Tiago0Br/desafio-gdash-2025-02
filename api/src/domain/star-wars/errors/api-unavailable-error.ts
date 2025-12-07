export class ApiUnavailable extends Error {
  constructor() {
    super('The Star Wars API is unavailable.')
  }
}
