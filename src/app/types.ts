export type Link = {
    id: string;
    description: string;
    url: string;
    postedBy: User;
}

export type User = {
    id: string;
    name: string;
    email: string;
    links: Link[];
}

export type Query = {
    feed: Link[];
}