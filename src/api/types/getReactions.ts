export interface IReaction {
  id: string;
  imageURL: string;
  name: string;
}

export type TGetReactionsResponse = IReaction[];
