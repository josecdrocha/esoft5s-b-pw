const taskKey = '@tasks';
const modal = document.querySelector('main dialog');
let currentTaskId = null;

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');
  li.id = taskId;
  li.innerHTML = `
      <div>
        <h2>${taskTitle}</h2>
        <button title="Editar tarefa" class="open-modal">✏️</button>
      </div>
      <p>${taskDescription}</p>
  `;

  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
  attachEventListeners();
}

// Carregar tarefas do localStorage ao recarregar a página
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map(
      task => `
        <li id="${task.id}">
          <div>
            <h2>${task.title}</h2>
            <button title="Editar tarefa" class="open-modal">✏️</button>
          </div>
          <p>${task.description}</p>
        </li>`
    )
    .join('');
  attachEventListeners();
}

// Função para anexar ouvintes de eventos aos botões de edição
function attachEventListeners() {
  document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', event => {
      currentTaskId = event.target.closest('li').id;
      openEditModal(currentTaskId);
    });
  });
}

// Função para abrir o modal de edição
function openEditModal(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey));
  const task = tasks.find(task => task.id === parseInt(taskId));
  if (task) {
    document.querySelector('#update-title').value = task.title;
    document.querySelector('#update-description').value = task.description;
    modal.showModal();
  }
}

// Função para atualizar a tarefa
function updateTask(event) {
  event.preventDefault();

  const updatedTitle = document.querySelector('#update-title').value;
  const updatedDescription = document.querySelector('#update-description').value;

  const tasks = JSON.parse(localStorage.getItem(taskKey));
  const taskIndex = tasks.findIndex(task => task.id === parseInt(currentTaskId));
  if (taskIndex > -1) {
    tasks[taskIndex].title = updatedTitle;
    tasks[taskIndex].description = updatedDescription;
    localStorage.setItem(taskKey, JSON.stringify(tasks));
    loadTasks();
    modal.close();
  }
}

// Ouvintes de eventos para carregamento e inicialização
window.addEventListener('DOMContentLoaded', loadTasks);

const cancelButton = document.querySelector('#cancel-update');
cancelButton.addEventListener('click', e => {
  e.preventDefault();
  modal.close();
});

const updateButton = document.querySelector('#update-task');
updateButton.addEventListener('click', updateTask);

document.querySelector('#taskForm').addEventListener('submit', addTask);
