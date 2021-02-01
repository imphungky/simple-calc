export const tasks = [
  {
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
