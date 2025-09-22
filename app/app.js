function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    // console.log("click");

    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let age = $("#age").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let cs = $("#classes").val();

    let newArrClasses = cs.split(",").map((item) => item.trim());

    let studentObj = {
      fName: fn,
      lName: ln,
      age: age,
      phone: phone,
      email: email,
      classes: newArrClasses,
    };

    $("#firstName").val("");
    $("#lastName").val("");
    $("#age").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#classes").val("");
    addStudent(studentObj);
  });

  $("#showLocal").on("click", (e) => {
    getStudents();
  });
}

function addStudent(student) {
  let allStudents = JSON.parse(localStorage.getItem("students"));
  allStudents.push(student);

  localStorage.setItem("students", JSON.stringify(allStudents));
}

function getStudents() {
  $("#allStudentInfo").empty();
  let allStudents = JSON.parse(localStorage.getItem("students"));
  let studentString = "<div>";
  $.each(allStudents, (index, student) => {
    studentString += `<p>First Name: ${student.fName} Last Name: ${student.lName} Age: ${student.age} Phone: ${student.phone} Email: ${student.email}`;

    $.each(student.classes, (i, cls) => {
      studentString += `<span>${cls}</span>,`;
    });
    studentString += "</p>";
  });

  studentString += "</div>";
  $("#allStudentInfo").html(studentString);
}

function connectToStorage() {
  if (localStorage) {
    let students = localStorage.getItem("students");
    if (students) {
      console.log("Students found in storage");
    } else {
      localStorage.setItem("students", JSON.stringify([]));
    }
  } else {
    console.log("Local storage not supported");
  }
}

$(document).ready(function () {
  connectToStorage();
  initListeners();
});
