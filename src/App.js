import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { NumericFormat } from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);
  const [display, setDisplay] = useState("");
  const [showkey,setShowKey]= useState("");
  const inputRef = useRef(null);
  const inputNum = (number) => {
  if (total) {
    setPreState("");
  }

  // Calculate the new state by multiplying the current state by 10 and adding the new number
  const newState = Number(curState) * 10 + Number(number);

  // Set the new state
  setCurState(String(newState));

  setTotal(false);
};

  useEffect(() => {
    localStorage.setItem("curstate", JSON.stringify(curState));
    setInput(curState);
    
  }, [curState]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("total"));
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    //  to put button hide above
    setOperator(e.target.innerText);
    // if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {

      case "/":
        cal = String(preState / curState);
        break;

      // case "+":
      //   cal = (  preState + curState);
      //   break;
      case "+":
  cal = Number(preState) + Number(curState);
  break;
      case "X":
        cal = String(preState * curState);
        break;
      case "-":
        cal = String(preState - curState);
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };


  const toggledResult = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("");
  };

  useEffect(() => {
 

    function handleKeyDown(event) {
      const { key } = event;
      if (/\d/.test(key)) {
        // inputNum(parseInt(key, 10));
        inputNum(parseInt(key, 10));
      } else if (key === "+") {
        operatorType({target: {innerText: "+"}});
      } else if (key === "-") {
        toggledResult();
      } else if (key === "*") {
        operatorType({target: {innerText: "X"}});
      } else if (key === "/") {
        operatorType({target: {innerText: "/"}});
      } else if (key === "=" || key === "Enter") {
        equals({target: {innerText: "="}});
      } else if (key === "Delete") {
        reset();
      } else if (key === "Escape") {
        reset();
      }
    }
    
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputNum, operatorType, equals, reset]);
  

  
  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          <div className="display"></div>
        

          
        
        
      
          {input  !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            ref={inputRef}

              

              
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>

        <div className="btn light-gray" onClick={reset}>
          C
        </div>

        <div className="btn light-gray" onClick={toggledResult}>
          +/-
        </div>
        <div className="btn light-gray" onClick={percent}>
          %
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>

        <div
          className="btn"
          onClick={() => inputNum(7)}
        
        >
          7
        </div>

        <div className="btn"  onClick={() => inputNum(8)} >
          8
        </div>
        <div className="btn"  onClick={() => inputNum(9)}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn"  onClick={() => inputNum(4)}>
          4
        </div>
        <div className="btn"  onClick={() => inputNum(5)}>
          5
        </div>
        <div className="btn"  onClick={() => inputNum(6)}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn"  onClick={() => inputNum(1)}>
          1
        </div>
        <div className="btn"  onClick={() => inputNum(2)}>
          2
        </div>
        <div className="btn"  onClick={() => inputNum(3)}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero"  onClick={() => inputNum(1)}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;









// console.log(total, "tot");
// console.log(input, "input");
// my values that is clicked is stored in iput
// console.log(setTotal, "settot");
//  function useKey(key, cb){
//   const callbackRef = useRef(cb);

//   useEffect(()=>{
//     callbackRef.current =cb;
//   });

//   useEffect(()=>{
//     function handle(event){
//           if(event.code === key){

//          setInput(input ,"1" )


      
    
    

//         callbackRef.current(event);


      

//       }
//     }
//     document.addEventListener("keypress",handle);
//     return () => document.removeEventListener("keypress",handle)
//   },[key]);
// }
