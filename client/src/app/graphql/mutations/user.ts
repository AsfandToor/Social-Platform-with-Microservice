import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        _id
        name
        username
        email
        token
    }
}`