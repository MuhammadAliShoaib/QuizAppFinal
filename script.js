// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBsqOpDkXFG6JctrJ0AjU04i24mW_9dwSo",
  authDomain: "quizapp-98689.firebaseapp.com",
  databaseURL: "https://quizapp-98689-default-rtdb.firebaseio.com",
  projectId: "quizapp-98689",
  storageBucket: "quizapp-98689.appspot.com",
  messagingSenderId: "417604771136",
  appId: "1:417604771136:web:8ae5fbafd8da7b47b02ea5",
  measurementId: "G-MNQTKLSLBE"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();


var questionNum = document.getElementById("questionNum");
var question = document.getElementById("question");
var buttons = document.getElementById("buttons");
var box = document.getElementById("box");
var percentage = document.getElementById("percentage");
var marks = document.getElementById("marks");
var index = 0;
var score = 0;
var result = 0;
let arr = [];

function getData() {
  let reference = ref(database, "question/")

  onChildAdded(reference, function (data) {
    arr.push(data.val());
    renderQuestion();
  })
}
getData();

function renderQuestion() {
  questionNum.innerHTML = `Question : ${index + 1}/${arr.length} `;
  question.innerHTML = arr[index].Question;
  buttons.innerHTML = "";
  for (var i = 0; i < arr[index].Options.length; i++) {
    buttons.innerHTML += `<div class="col-md-6 my-2">
        <button type="button" onclick="nextQuestion('${arr[index].Options[i]}','${arr[index].CorrectAns}')"  class="btn btn-primary btn-lg w-100 ">${arr[index].Options[i]}</button>
        </div>`;
  }
}

window.nextQuestion = function(a, b) {
  if (a == b) {
    score++;
    result = (score / arr.length) * 100;
    percentage.innerHTML = result
    marks.innerHTML = score;
  }
  if (index+1< arr.length) {
    index++;
    renderQuestion();
  } else {
    box.style.display = "none";
  }
}
