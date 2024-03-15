export interface FarmInterface {
  farmID?: number
  farmerID: string
  farmReviewsID: string
  farmName: string
  farmLocation: string
  farmImageURL: string
  farmDescription: string
  coordinates?: string | null
}
