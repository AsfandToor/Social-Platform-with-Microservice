export type Post = {
    _id: String
    caption: String
    author: String
    images: {
        url: String
    }[]
    comments: [{
        author: String
        comment: String
    }]
    createdAt: String
}

export type PagiantedPosts = {
    docs: Post[],
    limit: number,
    page: number,
    totalDocs: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPrevPage: boolean,
}