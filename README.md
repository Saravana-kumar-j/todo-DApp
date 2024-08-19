This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to Run this project

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

Configure [Utils](/Utils/config.js) with your own API_URL, PRIVATE_KEY, contractADDRESS, contractAbi.

I do not have local Bloackchain environment so that I used [Remix IDE](https://remix.ethereum.org/). I created Todo.sol file and written all the functionalities there and used that contract from there.

```sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    enum taskStatus {Pending, Finished}
    address owner;
    struct Task {
        string desc;
        taskStatus status;
    }

    Task[] public tasks;
    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function addTask(string memory _desc) public onlyOwner{
        tasks.push(Task(_desc, taskStatus.Pending));
    }

    function markAsFinished(uint256 id) public onlyOwner {
        require(id < tasks.length, "No Task haas been found");
        tasks[id].status = taskStatus.Finished;
    }

    function getAllTasks() public view returns (Task[] memory){
        return tasks;
    }

    function getTask(uint256 id) public view returns (string memory, taskStatus){
        require(id < tasks.length, "No Task haas been found");
        return(tasks[id].desc, tasks[id].status);
    }
}
```
___________
Give a star if this helps you.

