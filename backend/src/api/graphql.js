const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "The user's information",
    fields: () => ({
        username: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        points: {type: GraphQLNonNull(GraphQLInt)}
    })
});

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "The book's information",
    fields: () => ({
        ISBN: {type: GraphQLNonNull(GraphQLString)},
    })
});

const RootQuery = new GraphQLObjectType({
    name: "query",
    description: "Root Query",
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: "Get a List of all user in the system",
            resolve: () => data.data
        },
        userByEmail: {
            type: UserType,
            description: "Get a single user in the system by their email",
            args: {
                email: {type: GraphQLString}
            },
            resolve: (parents, args) => data.data.find(person => person.name === args.name)
        },
        userByUsername: {
            type: UserType,
            description: "Get a single user in the system by their username",
            args: {
                username: {type: GraphQLString}
            },
            resolve: (parents, args) => data.data.find(person => person.name === args.name)
        },
        books: {
            type: new GraphQLList(BookType),
            description: "Get a List of all user in the system",
            resolve: () => data.data
        },
        bookByISBN: {
            type: BookType,
            description: "Get a single book in the system by their ISBN",
            args: {
                ISBN: {type: GraphQLString}
            },
            resolve: (parents, args) => data.data.find(person => person.name === args.name)
        },
        bookbyOwner: {
            type: UserType,
            description: "Get a single book in the system by their owner's username",
            args: {
                username: {type: GraphQLString}
            },
            resolve: (parents, args) => data.data.find(person => person.name === args.name)
        },
    })
});

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addUser: {
            type: UserType,
            description: "Add a new user to the system",
            args: {
                username: {type: GraphQLNonNull(GraphQLString)},
                password: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                points: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parents, args) => {
                let newBook = {
                    "name": args.name,
                    "photo": args.photo,
                    "scores": args.scores
                };
                data.data.push(newBook);
                return newBook;
            }
        },
        addBookOwned: {
            type: UserType,
            description: "Add a new book owned by a certain user to the system",
            args: {
                username: {type: GraphQLNonNull(GraphQLString)},
                bookISBN: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve: (parents, args) => {
                let newBook = {
                    "name": args.name,
                    "photo": args.photo,
                    "scores": args.scores
                };
                data.data.push(newBook);
                return newBook;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutationType
});