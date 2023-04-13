import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ISignInToWaitingListRequest } from "./types/signToWaitingList";

export const communicationApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post",
    "cyfeedApi"
  >
) => ({
  signToWaitingList: builder.mutation<void, ISignInToWaitingListRequest>({
    query: (email) => ({
      url: "/communication/email",
      method: "POST",
      body: email,
    }),
  }),
});
