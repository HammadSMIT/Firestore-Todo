import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDspTWO119IWDst4GrXDZDiWKbEL88EHss",
    authDomain: "my-project-e5963.firebaseapp.com",
    projectId: "my-project-e5963",
    storageBucket: "my-project-e5963.appspot.com",
    messagingSenderId: "906727194454",
    appId: "1:906727194454:web:5a43d180f0f647733960f7",
    measurementId: "G-MKFDPZ9V5F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ids = []  

// ======== TODO =========

async function AddTodo() {

    let Getinp = document.querySelector("#GetInp");
    // Getinp.value = '';
    const docRef = await addDoc(collection(db, "todos"), {
        Task: Getinp.value,
        Time: new Date().toLocaleString(),
    });
    Getinp.value = '';


    console.log("Document written with ID: ", docRef.id);


}





function getData() {
    let ul = document.querySelector("#getul");

    
    onSnapshot(collection(db, 'todos'), (data) => {
        data.docChanges().forEach((newData) => {

            ids.push(newData.doc.id)

            if (newData.type == 'removed') {

                let del = document.getElementById(newData.doc.id)
                del.remove()

            }
            else if (newData.type == 'added'){
                ul.innerHTML += `
                <li id=${newData.doc.id}>${newData.doc.data().Task} <br> ${newData.doc.data().Time}  <button onclick="delTodo('${newData.doc.id}')" >Delete</button> <button  onclick="editTodo(this,'${newData.doc.id}')" >Edit</button> <br><br> </li>
                `
                console.log(newData.doc.data())

            }
         

        })
    })

}

getData();

async function delTodo(id) {
    await deleteDoc(doc(db, "todos", id));
}


async function editTodo(e,id) {

    var editVal = prompt("Enter Edit Value");
    e.parentNode.firstChild.nodeValue = editVal;
    // console.log(e); 

    await updateDoc(doc(db, "todos", id), {
        Task: editVal,
        Time: new Date().toLocaleString(),

    });

}


async function DelAll(){
    
    var list = document.getElementById("getul");
    list.innerHTML = "";
    // console.log(ids)
    for(var i = 0 ; i < ids.length ; i++ ){
        await deleteDoc(doc(db, "todos", ids[i]));
    }



}









// ========= WINDOW ===========


window.AddTodo = AddTodo
window.getData = getData
window.delTodo = delTodo
window.editTodo = editTodo
window. DelAll =  DelAll
