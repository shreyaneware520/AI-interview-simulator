export const introQuestions = [
  { id: 'i1', text: "Tell me a bit about yourself and your background." },
  { id: 'i2', text: "What are you currently working on or studying?" },
  { id: 'i3', text: "Why did you choose to pursue a career in this field?" },
  { id: 'i4', text: "What is a project you are most proud of?" },
  { id: 'i5', text: "How do you handle difficult technical challenges?" }
];

export const topicQuestions = {
  "DSA": [
    { id: 'd1', difficulty: 'Easy', text: "How does a Hash Map work under the hood?", expectedKeywords: ["hash function", "buckets", "collisions", "O(1)"] },
    { id: 'd2', difficulty: 'Easy', text: "Explain the difference between an Array and a Linked List.", expectedKeywords: ["contiguous memory", "pointers", "O(1) access", "O(n) insertion"] },
    { id: 'd3', difficulty: 'Medium', text: "What is a Binary Search Tree and what are its properties?", expectedKeywords: ["left child", "right child", "greater than", "less than", "O(log n)"] },
    { id: 'd4', difficulty: 'Medium', text: "Describe how a breadth-first search (BFS) operates on a graph.", expectedKeywords: ["queue", "visited set", "level by level", "shortest path"] },
    { id: 'd5', difficulty: 'Hard', text: "How does dynamic programming differ from divide and conquer?", expectedKeywords: ["overlapping subproblems", "memoization", "tabulation", "optimal substructure"] },
    { id: 'd6', difficulty: 'Hard', text: "Explain Dijkstra's algorithm for finding the shortest path.", expectedKeywords: ["priority queue", "greedy", "weights", "visited nodes"] },
    { id: 'd7', difficulty: 'Medium', text: "What are the common strategies to handle hash collisions?", expectedKeywords: ["chaining", "linked list", "open addressing", "linear probing"] }
  ],
  "System Design": [
    { id: 's1', difficulty: 'Easy', text: "What is load balancing and why is it important?", expectedKeywords: ["distribute traffic", "single point of failure", "redundancy", "scalability"] },
    { id: 's2', difficulty: 'Medium', text: "Explain the concept of database sharding.", expectedKeywords: ["horizontal partitioning", "split data", "shard key", "performance"] },
    { id: 's3', difficulty: 'Hard', text: "How would you design a URL shortener like bit.ly?", expectedKeywords: ["base62 encoding", "hash collision", "database schema", "caching", "redirects"] }
  ],
  "Frontend": [
    { id: 'f1', difficulty: 'Easy', text: "What is the Virtual DOM in React and how does it work?", expectedKeywords: ["memory representation", "reconciliation", "diffing algorithm", "performance"] },
    { id: 'f2', difficulty: 'Medium', text: "Explain closures in JavaScript.", expectedKeywords: ["lexical scoping", "inner function", "outer variables", "memory leak"] },
    { id: 'f3', difficulty: 'Hard', text: "Describe how you would optimize a slow web application.", expectedKeywords: ["lazy loading", "code splitting", "caching", "minify", "CDN", "lighthouse"] }
  ],
  "Default": [
    { id: 'x1', difficulty: 'Easy', text: "What are the core principles of Object-Oriented Programming?", expectedKeywords: ["encapsulation", "inheritance", "polymorphism", "abstraction"] },
    { id: 'x2', difficulty: 'Medium', text: "How do you resolve merge conflicts in Git?", expectedKeywords: ["git status", "manual edit", "git add", "commit", "HEAD"] },
    { id: 'x3', difficulty: 'Hard', text: "Explain how RESTful APIs differ from GraphQL.", expectedKeywords: ["endpoints", "over-fetching", "single endpoint", "schema", "mutations"] }
  ]
};

export const codingQuestions = [
  {
    id: 'c1',
    difficulty: 'Easy',
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    initialCode: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
    expectedKeywords: ["Map", "hash", "for", "complement"]
  },
  {
    id: 'c2',
    difficulty: 'Medium',
    title: "Valid Parentheses",
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    initialCode: "function isValid(s) {\n  // Write your code here\n  \n}",
    expectedKeywords: ["stack", "push", "pop", "length", "match"]
  }
];

export const getRandomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
