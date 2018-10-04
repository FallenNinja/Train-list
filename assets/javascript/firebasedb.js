// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6K7mK25nhokfalfYy8spsD60Nzvompn0",
    authDomain: "train-list-83857.firebaseapp.com",
    databaseURL: "https://train-list-83857.firebaseio.com",
    projectId: "train-list-83857",
    storageBucket: "train-list-83857.appspot.com",
    messagingSenderId: "305987494711"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

 $("#submit").on("click", function(event){
	event.preventDefault();
  getData();
})

// Functions ===================================

function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
      alert("Form must be properly filled out!");
      return false;
  }
}


// This function is called by the submit button being clicked
// This function gathers data and pushes it to firebase
function getData() {
trainName = $("#formTrainName").val().trim();
destination = $("#formDestination").val().trim();
firstTrain = moment($("#formArrival").val().trim(), "LT").format("X");
frequency = $("#formFrequency").val().trim();

// Pushing info to database
database.ref().push({
  trainName : trainName,
  destination : destination,
  firstTrain : firstTrain,
  frequency : frequency,
  });

// Emptying divs after clicking submit
$("#formTrainName").val("");
$("#formDestination").val("");
$("#formArrival").val("");
$("#formFrequency").val("");

};


// This function notices if a child is added to the database
// If a child is added the information is then added to the website
database.ref().on("child_added", function(snapshot){
var train = snapshot.val().trainName;
var dest = snapshot.val().destination;
var fTrain = snapshot.val().firstTrain;
var freq = parseInt(snapshot.val().frequency);
var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), 'minutes'))/freq);
var nextA = moment.unix(fTrain, "X").add(m*freq, "minutes");
var nextAr= moment(nextA).format("LT");
var minAway = moment(nextA).diff(moment(), "minutes")+1;




$("#trainTable").append("<tr><td>" + train +
"</td><td>" + dest +
"</td><td>" + freq +
"</td><td>" + nextAr +
"</td><td>" + minAway +
"</td></tr>");

});