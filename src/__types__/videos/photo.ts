export interface PhotoDTO {
    id: number;
    user: {
        name: string;
        url: string;
    },
    url: string;
    desc: string;
    favorited: boolean
}
