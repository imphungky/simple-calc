import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {styled} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import './Grades.css';

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 8,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    margin: 8,
    fontFamily: 'Raleway',
    color: 'white',
    height: 38,
    padding: '0 30px',
  });

  const MyTextField = styled(TextField)({
      color: 'white',
      margin: 8
  })


function Grades() {
    const [num_grades, set_amount] = useState(() => [['','']]);
    const [showfinal, set_display] = useState(() => false);
    const [finalgrade, set_finalgrade] = useState(() => 0);
    function addgrade() {
        set_amount(prev_grades => {return [...prev_grades, ['','']]});
    }

    function inputHandle(e) {
        set_amount(prev_grades => {
            const lst = [...num_grades];
            lst[e.target.id][e.target.name] = e.target.value;
            return lst;
        })
    }

    function handledata() {
        let display = [];
        for(var i=0; i < num_grades.length; i++) {
            display.push(<div><MyTextField required label={"Grade" + (i+1)} value={num_grades[i][0]} id={i} name={0} onChange={(e) => inputHandle(e)}></MyTextField>
                       <MyTextField required label={"Weight" + (i+1)} value={num_grades[i][1]} id={i} name={1} onChange={(e) => inputHandle(e)}></MyTextField></div>)
        }
        return display;
    }

    function renderinputbox(data) {
        return <input type="text" value={data}></input>;
    }

    function calculateResults() {
        console.log(num_grades);
        let grade = 0;
        let weight = 0;
        let final = 0;
        for(var i=0; i < num_grades.length; i++) {
            grade += num_grades[i][0] * (num_grades[i][1]) / 100;
            weight += num_grades[i][1] / 100;
        }
        final = grade/weight;
        final = final.toFixed(2);
        set_display(true);
        set_finalgrade(final);
    }

    function restart() {
        set_display(false);
    }



    return (<React.Fragment>
            <div><h1>Simple-Calc</h1></div>
            <div>{!showfinal && handledata()}</div>
            <div>{showfinal && <h2>{finalgrade + ' %'}</h2>}</div>
           {!showfinal && <MyButton onClick={addgrade}>add grade</MyButton>}
            {!showfinal && <MyButton onClick={calculateResults}>calculate</MyButton>}
            {showfinal && <MyButton onClick={restart}>Calculate again</MyButton>}
        </React.Fragment>)
    
}
export default Grades