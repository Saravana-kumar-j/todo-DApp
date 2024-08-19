import { useEffect, useState } from "react";
import { ethers, Log } from "ethers";
import styles from '../styles/Home.module.css';
import * as Constants from '../Utils/config';
// import { headers } from "next/headers";

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const connectToMetamask = async () => {
      try {
        if (typeof window !== "undefined") {
          console.log("Window is defined");

          if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // console.log(provider);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected address:", address);
            const contractInstance = new ethers.Contract(Constants.contractADDRESS, Constants.contractAbi, signer);
            var tasks = await contractInstance.getAllTasks();
            setTasks(tasks);
            console.log(tasks);
            
          } else {
            console.log("MetaMask is not detected");
          }
        } else {
          console.log("Window is not defined");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    connectToMetamask();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/addTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task})
      });
  
      const resp = await response.json();
  
      if (!response.ok) {
        console.log(resp); // Handle error response
        return;
      }
  
      const status = resp.message;
      console.log(status); // Handle success response
  
    } catch (error) {
      console.error('Error occurred:', error); // Handle network or other errors
    }
  };
  


  const handlechange = async (event) => {
    setTask(event.target.value);
  }

  const changeTaskStatus = async (taskId) => {
    const response = await fetch ('/api/changeStatus', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(taskId)
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    }

    const resp = await response.json();
    const status = resp.message;
    console.log(status);
    
  }


  return (
    <div>
      <div className={styles.container}>Welcome to DApp To-Do List</div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="task" placeholder="Add a Task" onChange={handlechange} value={task}/>
          <input type="submit" value="Add Task"/>
        </form>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Description</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{task.desc}</td>
                <td>{task.status === 0 ? 'Pending' : 'Finished'}</td>
                <td >
                {task.status === 0 ? <button className={styles.button} onClick={() => changeTaskStatus(index)}>Click me</button> : null}
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;
