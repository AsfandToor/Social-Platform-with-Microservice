import { MutationHookOptions, useMutation, MutationTuple } from "@apollo/client";
import apolloClient from "../graphql/client";

export const useCustomMutation = (mutation: any, options?: MutationHookOptions): MutationTuple<any, any> => {
    const result = useMutation(mutation, {
        client: apolloClient,
        ...options
    })

    return result
}