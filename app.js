import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyBR9wc81pZ7-Sa_fVcRQKE-VCMbAh4Z3Wo",
  authDomain: "smitb10-8d5cb.firebaseapp.com",
  projectId: "smitb10-8d5cb",
  storageBucket: "smitb10-8d5cb.appspot.com",
  messagingSenderId: "282733667161",
  appId: "1:282733667161:web:6646aeef6f51da1be7e248",
  measurementId: "G-T4HJE3VGH3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)




const  addTodo = async() => {
 try{
   var todo =  document.getElementById("todo")
   var list = document.getElementById("list")
   var li = document.createElement("li")
   var text = document.createTextNode(todo.value)
   const docRef = await addDoc(collection(db, "todos"), {
    Task : todo.value ,
    // country: "Japan"
  });

  console.log("Document written with ID: ", docRef.id);
}catch(err){
    console.log(err)
}
   li.appendChild(text)
   var delButton = document.createElement("button")
   delButton.setAttribute("onclick" , "delTodo()")
   var delText = document.createTextNode("Delete")
   delButton.appendChild(delText)
   var editButton = document.createElement("button")
   editButton.setAttribute("onclick" , "editTodo()")
   var editText = document.createTextNode("Edit")
   editButton.appendChild(editText)
   li.appendChild(delButton)
   li.appendChild(editButton)
   list.appendChild(li)
//    list.after(li)
   todo.value = "" 

}


function delTodo(){
    event.target.parentNode.remove()
}

function editTodo(){
    var editValue = prompt('Enter Edit value')
    event.target.parentNode.firstChild.nodeValue = editValue
}

function deleteTodo(){
    list.innerHTML =  ''
}
// ===== window ===== (to ignore onclick events in all functions)
window.addTodo = addTodo
window.editTodo = editTodo
window.delTodo = delTodo
window.deleteTodo = deleteTodo