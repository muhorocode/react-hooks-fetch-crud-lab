import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers:["","","",""],
    correctIndex: 0,
  });

  function handleChange(event){
    const{name,value}=event.target
    if(name.startsWith("answer")){
      const index=parseInt(name.replace("answer",""))
      const newAnswers=[...formData.answers]
      newAnswers[index]=value
      setFormData({...formData,answers:newAnswers})
    }else if(name==="correctIndex"){
      setFormData({...formData,correctIndex:parseInt(value)})
    }else{
      setFormData({...formData,[name]:value})
    }
  }

  function handleSubmit(event){
    event.preventDefault()
    fetch("http://localhost:4000/questions", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData),
    })
     .then((res)=>res.json())
      .then((newQuestion)=>{
        if(props.addQuestion){
          props.addQuestion(newQuestion)
        }
      })
      
  }
  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer0"
            value={formData.answers[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer1"
            value={formData.answers[1]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer2"
            value={formData.answers[2]}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer3"
            value={formData.answers[3]}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={2}>3</option>
            <option value={3}>4</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
