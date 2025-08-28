import { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions]=useState([])


useEffect(()=>{
  fetch("http://localhost:4000/questions")
    .then((res)=>res.json())
    .then(setQuestions)
},[])

function addQuestion(newQuestion){
  setQuestions([...questions,newQuestion])
}

function handleDeleteQuestion(id){
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setQuestions(questions.filter((question) => question.id !== id));
    });
}

 function handleUpdateQuestion(updatedQuestion){
  setQuestions(questions.map((question)=>
    question.id === updatedQuestion.id ? updatedQuestion : question
  ))
 }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? ( <QuestionForm addQuestion={addQuestion}/>)
       :(<QuestionList 
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateQuestion={handleUpdateQuestion}
       />)}
    </main>
  );
}

export default App;
