export type Values = string[]
export interface VoteOptions {
  [key: string]: Values
}

export interface Results {
  yes: number
  no: number
  maybe: number
}
