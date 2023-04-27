let taskList;
let saveTask = JSON.parse(localStorage.getItem("tasks"));

if (Array.isArray(saveTask)) {
  taskList = saveTask;
} else {
   taskList = [
    {
      title: "task1",
      dueDate: "2023/10/01",
      id: "01",
    },
    {
      title: "task2",
      dueDate: "2020/10/2",
      id: "02",
    },
  ];
}
renderTask();

// model

function createTsk(taskText, dueDate) {
  let id = new Date().getTime().toString();
  taskList.push({ title: taskText, dueDate: dueDate, id: id });

  saveData();
}

function removeTask(deletedId) {
  taskList = taskList.filter(function (deleteTask) {
    if (deleteTask.id === deletedId) {
      return false;
    } else {
      return true;
    }
  });
  saveData();
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// controller

function addTask() {
  let taskText = document.getElementById("inputTask").value;
  inputTask.value = "";

  let dueDate = document.getElementById("datePicker").value;
  datePicker.value = "";

  createTsk(taskText, dueDate);

  renderTask();
}

function deleteTask(e) {
  let deleteBtn = e.target;
  let deletedId = deleteBtn.id;

  removeTask(deletedId);

  renderTask();
}

function renderTask() {
  document.getElementById("renderBody").innerHTML = " ";

  taskList.forEach(function (myTask) {
    let taskElement = document.createElement("h3");
    taskElement.innerText = myTask.title + " " + myTask.dueDate;
    taskElement.className = "edit-task";

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn-edit";
    deleteBtn.onclick = deleteTask;
    deleteBtn.id = myTask.id;
    taskElement.appendChild(deleteBtn);

    let renderBody = document.getElementById("renderBody");
    renderBody.appendChild(taskElement);
  });
}
removeTask()