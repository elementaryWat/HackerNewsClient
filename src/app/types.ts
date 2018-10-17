export type Link = {
    id: string;
    description: string;
    url: string;
    postedBy: User;
    votes: Vote[];
}

export type Vote = {
    id: string;
    link: Link;
    user: User;
}

export type User = {
    id: string;
    name: string;
    email: string;
    votes: Vote[];
    links: Link[];
}

export type Query = {
    feed: Link[];
}