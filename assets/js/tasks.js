// Global variables that will be used throughout the script.
let success_message=document.getElementById('success-message');
// add task form variables
let name = document.getElementById("name");
let description = document.getElementById("description");
// End of add task form variables

// update task form variables

let updatename = document.getElementById("updatename");
let updatedescription = document.getElementById("updatedescription");
// End of update task form variables

const email_user = localStorage.getItem("user_email");

// array of objects (tasks to store all of the tasks)
var tasks = [];
// the current index of the task
let indexx;

// If the user isn't logged in to the site, he will be taken to the login page to log in first.
if (localStorage.getItem("user_email") == null) {
  window.location.assign("login.html");
} else {
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    display();
  }

  // This function displays the form, whether it is to add a new task or modify a task.
  function showForm(form) {
    document.getElementById(form).style.display = "block";
  }

  // This function closes the form, whether it is to add a new task or modify a task.
  function hideForm(form) {
    document.getElementById(form).style.display = "none";
  }

  // This function is used to add new tasks.
  function addTask() {
    // The first thing is to define the object that will hold information about the task, such as name and description.
    let task = {
      taskname: name.value,
      taskdescription: description.value,
      useremail: email_user,
      completed: false
    };
    //The second thing is to store the object inside the array so that it can be stored , and update the localstorage with the latest tasks then display all the tasks and hide the form
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    hideForm('AddTaskForm');
    success_message.style.display='flex';
    document.getElementById('message-paragraph').innerHTML='Task is added successfully';
    Reset(name,description);
    display();
  }

    // This function is used to display all tasks.
  function display() {
    var box = ``;
    // Show all tasks to the user only and not to all users
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].useremail == email_user) {
        var id = i;
        if(tasks[i].completed === true){var taskClass='task-completed'; var update='update_disabled'}else{var taskClass=""; var update=""}

        box += `
    <div class='box ${taskClass}'  id="box${id}">
      <div id="box-content1">
          <input type="checkbox" style="width: 100%" onclick="transform(${id})" class="${update}"/>
        </div>
        <div>
           <h3 for="">${tasks[id].taskname}</h3>
          <p >
          ${tasks[id].taskdescription}
          </p>

        </div>
    </div>
              <div style="display:flex;margin:2%">
          <button id="update" onclick="update(${id})" class="${update}">Update</button>
          <button id="delete" onclick="deletee(${id})" class="b" style="text-decoration:none">Delete</button>
          </div>
    <hr>
      `;
      }
    }

    // display in html document
    document.getElementById("boxs").innerHTML = box;
  }

  function transform(id) {
    tasks[id].completed= true;
    localStorage.setItem('tasks',JSON.stringify(tasks))
    display()
  }
  
  // This function is used to delete a specific task 
  function deletee(index) {
    // use splice to delete specific task by using its index then update the localstorage with the latest tasks then display all the tasks 
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
        success_message.style.display='flex';
    document.getElementById('message-paragraph').innerHTML='Task is deleted successfully'
     display();
  }
  
  let search = document.getElementById("searchinput");
  
  // This function is used to search among tasks
  function searchh() {
    var found=false;

    console.log(search.value)
    var box = ``;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].useremail == email_user) {
        //This checks for the presence of characters in the input field in the HTML document and characters in the task names.then displays the result
        if (tasks[i].taskname.includes(search.value)) {
          var found=true;
          document.getElementById('p').style.display='none'

          var id = i;
          box += `
      <div class='box' id="box${id}">
        <div id="box-content1">
            <input type="checkbox" style="width: 100%" onclick="transform()" id="${tasks[id].taskname}" name="${tasks[id].taskname}"/>
          </div>
          <div>
             <h3 for="">${tasks[id].taskname}</h3>
            <p >
            ${tasks[id].taskdescription}
            </p>
            <div style="display:flex">
            <button style="background-color:#2e8ac7;padding:15% 20%; margin:15% 5%" onclick="update(${id})">Update</button>
            <button style="background-color:#EF6F70;padding:15% 20%; margin:15% 0%" onclick="deletee(${id})">Delete</button>
            </div>        </div>
      </div>
      <hr>
        `;

        }else if(found !== true){
          // Error message , it will be shown if there are no tasks with the same name in input field
          document.getElementById('p').style.display='block'
        }
      }
    }

    document.getElementById("boxs").innerHTML = box;
  }
  
  console.log(localStorage.getItem("users"));
  
  // This function is used to show the Update form and Set values ​​for the task to be modified in the form in the HTML document.
  function update(index) {
    showForm("updateTaskForm");
    indexx = index;
    console.log(tasks[index]);
    document.getElementById("updatename").value = tasks[index].taskname;
    document.getElementById("updatedescription").value =
      tasks[index].taskdescription;
  }
  
  // This function is used to modify the task in the array and update the localstorage with the latest tasks
  function edit() {
    let task = {
      taskname: updatename.value,
      taskdescription: updatedescription.value,
      useremail: email_user,
    };
  
    tasks[indexx] = task;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    hideForm('updateTaskForm')
    success_message.style.display='flex';
    document.getElementById('message-paragraph').innerHTML='Task is updated successfully';
    display();
  }
}

// clear
function Reset(Name,desc){
  Name.value='';
  desc.value='';

}


