import './App.css';
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";
import {ethers} from "ethers"
import {useState, useEffect} from "react";

function App() {

  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [currentBalance, currBalance] = useState(0);

  useEffect(()=>{
    const loadProvider=async()=>{
      let contractAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url="http://localhost:8545";
      const provider=new ethers.providers.JsonRpcProvider(url);
      const contract= new ethers.Contract(
        contractAddress,
        Lock.abi,
          provider
      );
      setContract(contract);
      setProvider(provider);
      // console.log(contract);
    }
    loadProvider();
  }, []);

    const checkBalance=async()=>{
      const currentBalance= await contract.balance();
        currBalance(previousState=>{
          return parseInt(currentBalance._hex,16);
        })
    } 
    
    const sendEther=async()=>{
      const signer=contract.connect(provider.getSigner());
      await signer.sendEther({value: ethers.utils.parseEther("5")});
      // checkBalance();
    }

  const withdraw=async()=>{
         const signer=contract.connect(provider.getSigner());
         await signer.withdraw();
         setTimeout(function () {
          window.location.reload(1);
        }, 500);
        setTimeout();
  }

  return (
    <div className="center">
     <h3>Hey! Initial balance of contract is 0</h3>
     <h3>Current contract balance: {currentBalance}</h3>
     <button className="button" onClick={sendEther}>
        Send 5 ethers
      </button>
     <button className="button" onClick={withdraw}>
        Withdraw
      </button>
      <button className="button" onClick={checkBalance}>
        Check Balance
      </button>
    </div>
    
  );
}

export default App;
