const students = [];

let count = 1;

const addButton = document.getElementById("addButton");

addButton.addEventListener("click", addStudent);

// ------------------------------------------------------------------------
// ADD FUNCTIONALITY
function addStudent (e) {

    var entry = document.getElementsByClassName("input-data");
    var data = [];

    for (let i=0; i<entry.length; i++){
        if (entry[i].value === ""){
            alert("All Fields Required!");
            return;
        }
        data.push(entry[i].value.trim());
    }

    if (e.target.innerText === "EDIT STUDENT"){
        fillEditedData(data);
        return;
    }

    var studentName = data[0];
    var studentEmail = data[1];
    var studentAge = data[2];
    var studentGpa = data[3];
    var studentGrade = data[4];
    var studentDegree = data[5];

    var table = document.getElementById("table");

    var studentId = count++;
    
    var tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td>${studentId}</td>
    <td class="name">${studentName}</td>
    <td class="email">${studentEmail}</td>
    <td>${studentAge}</td>
    <td>${studentGpa}</td>
    <td>${studentGrade}</td>
    <td id="last-data">${studentDegree}
        <div>
            <img src="./Images/edit-icon.png" alt="edit-icon" id="edit-${studentId}">
            <img src="./Images/delete-icon.png" alt="delete-icon" id="delete-${studentId}">
        </div>
    </td>`;

    table.appendChild(tableRow);

    var student = {
        ID : studentId,
        name : studentName,
        email : studentEmail,
        age : studentAge,
        gpa : studentGpa,
        grade : studentGrade,
        degree : studentDegree
    }

    students.push(student);

    var editElement = document.getElementById(`edit-${studentId}`);

    editElement.addEventListener("click", editStudent);

    var delElement = document.getElementById(`delete-${studentId}`);

    delElement.addEventListener("click", deleteStudent);

}

// -------------------------------------------------------------------------
// EDIT FUNCTIONALITY

let editedEntry = null;

async function editStudent(e) {
    editedEntry = e.target.parentNode.parentNode.parentNode;

    var children = await e.target.parentNode.parentNode.parentNode.children;

    var updateEntry = document.getElementsByClassName("input-data");

    for (let i=0; i<updateEntry.length; i++){
        updateEntry[i].value = children[i+1].innerText;
    }

    addButton.innerText = "edit student";
}

function fillEditedData(data) {

    var children = editedEntry.children;

    var updateEntry = document.getElementsByClassName("input-data");
    
    for (let i=0; i<data.length; i++){
        if (i === data.length-1){
            children[i+1].innerHTML = `${data[i]}<div>
            <img src="./Images/edit-icon.png" alt="edit-icon" id="edit-${editedEntry.firstChild.innerText}">
            <img src="./Images/delete-icon.png" alt="delete-icon" id="delete-${editedEntry.firstChild.innerText}">
        </div>`
        }
        else{
            children[i+1].innerText = data[i];
        }
        updateEntry[i].value = "";
    }

    for (let j=0; j<students.length; j++){
        let student = students[j];

        if (student.ID == editedEntry.firstChild.innerText){
            student.name = data[0];
            student.email = data[1];
            student.age = data[2];
            student.gpa = data[3];
            student.grade = data[4];
            student.degree = data[5];
            break;
        }
    }


    var editElement = document.getElementById(`edit-${editedEntry.firstChild.innerText}`);

    editElement.addEventListener("click", editStudent);

    var delElement = document.getElementById(`delete-${editedEntry.firstChild.innerText}`);

    delElement.addEventListener("click", deleteStudent);

    addButton.innerText = "add";
}

// --------------------------------------------------------------------------
// DELETE FUNCTIONALITY

let delEntry = null;

function deleteStudent(e) {
    
    delEntry = e.target.parentNode.parentNode.parentNode;

    var studentId = delEntry.firstChild.innerText;

    for (let i=0; i<students.length; i++){
        let student = students[i];
        if (student.ID == studentId){
            let indexToRemove = students.indexOf(student);
            students.splice(indexToRemove, 1);
            break;
        }
    }
    delEntry.remove();
}

// -------------------------------------------------------------------------------
// SEARCH FUNCTIONALITY

let searchInput = document.getElementById("searchInput");
let dataTable = document.getElementById("table");
let rows = dataTable.getElementsByTagName("tr");

searchInput.addEventListener("input", filterByNameEmailDegree);

function filterByNameEmailDegree() {
  var searchTerm = searchInput.value.toLowerCase();

  for (var i = 0; i < rows.length; i++) {

    let name = rows[i].getElementsByTagName("td")[1].textContent.toLowerCase();
    let email = rows[i].getElementsByTagName("td")[2].textContent.toLowerCase();
    let degree = rows[i].getElementsByTagName("td")[6].textContent.toLowerCase();
    
    if (name.includes(searchTerm)) {
        rows[i].style.display = '';
    }
    else if (email.includes(searchTerm)) {
        rows[i].style.display = '';
    }
    else if (degree.includes(searchTerm)) {
        rows[i].style.display = '';
    }
    else {
      rows[i].style.display = 'none';
    }
  }
}

