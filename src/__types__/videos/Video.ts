export interface Video {
    id: number;
    user: {
        name: string;
        url: string;
    },
    url: string;
    desc: string;
    favorited: boolean
}
