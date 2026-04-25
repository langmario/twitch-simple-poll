export type VoteKeys = 'yes' | 'no' | 'maybe'

export type VoteOptions = Record<VoteKeys, string[]>

export type Results = Record<VoteKeys, number>
