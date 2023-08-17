export interface FavoriteStopType{
    extId:string;
    name: string
}
export interface CoordsType{
    longitude: number,
    lattitude: number
  }
  export interface ResponseData{
    StopLocation: ResponseDataLocation[]
  }
  export interface ResponseDataLocation{name: String, exId: String }