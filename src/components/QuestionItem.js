import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    onDelete(id);
  }

  function handleChange(event){
    const newCorrectIndex = parseInt(event.target.value);

    onUpdate({...question, correctIndex: newCorrectIndex});
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion)=>onUpdate(updatedQuestion))
      };
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        value={correctIndex} 
        onChange={handleChange} 
        aria-label="Correct Answer">
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
