import { OctopusResult } from "./OctopusResult"

export interface OctopusResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: OctopusResult[]
}

