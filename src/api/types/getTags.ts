export interface IGetTagsResponse extends TGetTagsResponse {}
export type TGetTagsResponseTransformed = ITagTransformed[];

export interface ITagTransformed {
  label: ITag["name"];
  value: ITag["id"];
}

export interface ITag {
  id: string;
  name: string;
}

type TGetTagsResponse = ITag[];
