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

export type SetMessageType = React.Dispatch<React.SetStateAction<string>>
export type SetCoordsType = React.Dispatch<React.SetStateAction<CoordsType>>
export type setStops = React.Dispatch<React.SetStateAction<ResponseData[]>>
export type setTimeTab = React.Dispatch<React.SetStateAction<SetTimeTables[]>>
//fixa dessa
export interface PropsStop{
  setFavoriteStop: ({})=> void
  sethiddStops:  ({})=> void
  stop: {
      StopLocation: StopLocation
  }
}
export interface StopLocation{
  extId: String
  name: String
  extId: string
}

export interface SetTimeTables{
  stop: string
  Name: string
  time: string
  extId: string
}