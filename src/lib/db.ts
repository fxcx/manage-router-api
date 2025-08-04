
type User = {
    id: number;
    name: string;
};

let users: User[] = [
    { id: 1, name: "Fiona" },
    { id: 2, name: "John" },
    { id: 3, name: "Alice" },
    { id: 4, name: "Bob" },
];

export function getUsers(): User[] {
    return users;
}

export function addUser(name: string): User {
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    return newUser;
}
