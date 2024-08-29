type results = {
    author: string,
    author_details: {
        name: string,
        username: string,
        avatar_path: string,
        rating: number
    },
    content: string,
    created_at: Date,
    id: number,
    updated_at: Date,
    url: string
}
export type Reviews = {
    id: number,
    page: number,
    results: results[],
    total_pages: number,
    total_results: number
}