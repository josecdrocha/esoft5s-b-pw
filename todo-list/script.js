document.addEventListener('DOMContentLoaded', () => {
  
    function createTaskElement(task) {
      const li = document.createElement('li');
      const taskTitle = document.createElement('h3');
      const taskDescriptionPara = document.createElement('p');
      taskTitle.textContent = task.title;
      taskDescriptionPara.textContent = task.description;
      li.appendChild(taskTitle);
      li.appendChild(taskDescriptionPara);
      return li;
    }
  
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskListElement = document.getElementById('task-list');
    storedTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      taskListElement.appendChild(taskElement);
    });
  
    document.getElementById('form').addEventListener('submit', e => {
      e.preventDefault();
  
      const taskInput = document.getElementById('task-title');
      const taskDescription = document.getElementById('task-description');
      const inputValue = taskInput.value.trim();
      const descriptionValue = taskDescription.value.trim();
  
      if (inputValue === '' || descriptionValue === '') {
        alert('Por favor, preencha todos os campos.');
        return;
      }
  
      const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
      taskList.push({ title: inputValue, description: descriptionValue });
      localStorage.setItem('tasks', JSON.stringify(taskList));
  
      const taskElement = createTaskElement({ title: inputValue, description: descriptionValue });
      taskListElement.appendChild(taskElement);
  
      e.target.reset();
    });
  });
  