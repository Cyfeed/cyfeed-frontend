export interface IReaction {
  id: string;
  imageURL: string;
  name: string;
  reacted: boolean;
}

export type TGetReactionsResponse = IReaction[];
