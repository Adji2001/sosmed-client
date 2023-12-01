const Posts = [
    {
        id: 1,
        desc: 'This is My First Post and Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, voluptatum laboriosam expedita saepe iure consequatur. Dolorum temporibus voluptas obcaecati tempore!',
        photo: 'posts/kopi.jpeg',
        userId: 1,
        like: 2,
        comment: 4,
        time: 12
    },
    {
        id: 2,
        desc: 'This is My Second Post but i dont care about it',
        userId: 1,
        like: 1,
        time: 5
    },
    {
        id: 3,
        desc: 'Dolorum temporibus voluptas obcaecati tempore!',
        photo: 'posts/coding.jpeg',
        userId: 2,
        like: 5,
        comment: 1,
        time: 0
    },
    {
        id: 4,
        photo: 'posts/luffy.jpeg',
        userId: 3,
        like: 1,
        comment: 1,
        time: 25
    },
]

const Users = [
    {
        id: 1,
        name: 'Adam',
        profilePicture: 'users/user1.jpeg'
    },
    {
        id: 2,
        name: 'John Doe',
        profilePicture: 'users/user2.jpeg'
    },
    {
        id: 3,
        name: 'Luffy',
        profilePicture: 'users/user3.jpeg'
    }
]

export { Posts, Users }
