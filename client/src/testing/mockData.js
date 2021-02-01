export const tasks = [
  {
    _id: 1,
    name: "setup repo",
    course: "csc301",
    status: {
      name: "to do",
      color: "red",
    },
    tags: [{ name: "a1", color: "yellow" }],
    description:
      "Create Github repo with starter code + add partner as collaborator",
  },
  {
    _id: 2,
    name: "writeup",
    course: "csc301",
    status: {
      name: "doing",
      color: "yellow",
    },
    tags: [{ name: "a1", color: "yellow" }],
    description: "write report for problem solutions",
  },
  {
    _id: 3,
    name: "study for unit test",
    course: "mat232",
    status: {
      name: "done",
      color: "green",
    },
    tags: [{ name: "study", color: "red" }],
    description: "ch3, ch4, ch5",
  },
  {
    _id: 4,
    name: "hate speech filter",
    course: null,
    status: {
      name: "to do",
      color: "red",
    },
    tags: [{ name: "wv", color: "gray" }],
    description: "implement issue #23",
  },
];
