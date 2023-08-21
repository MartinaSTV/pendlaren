
export interface CoordsType{
    latitude: number,
    longitude: number
  }
  export interface ResponseData{
    StopLocation: ResponseDataLocation
  }
export interface ResponseDataLocation{name: string, extId: string, dist: string}

export type SetMessageType = React.Dispatch<React.SetStateAction<string>>

export type SetCoordsType = React.Dispatch<React.SetStateAction<CoordsType>>

export type SetStops = React.Dispatch<React.SetStateAction<ResponseData[]>>

export type SetTimeTab = React.Dispatch<React.SetStateAction<SetTimeTables[]>>

export type SetBoolean =  React.Dispatch<React.SetStateAction<boolean>>

export type SetFav =  React.Dispatch<React.SetStateAction<FavoriteStopType| null>>

export type SetCordName = React.Dispatch<React.SetStateAction<NamesLocation[]>>

//varför fungerar inte dessa?
export interface PropsStop{
  setFavoriteStop: SetFav
  sethiddStops: SetBoolean
  stop: {
      StopLocation: ResponseDataLocation
  }
}
export interface FavoriteStopType{
  extId:string;
  name: string
  dist: string
}
export interface StopLocation{
  extId: string
  name: string
  dist: string
}

export interface SetTimeTables{
  stop: string
  name: string
  time: string
  stopExtId: string
}
export interface PropstimeInfo{
  timeInfo: SetTimeTables
}

export interface TravalInfo{
  departure: string
  arrival: string
}
export interface NamesLocation{
  name:string
}
