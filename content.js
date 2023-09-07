document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Load tasks from storage when the popup is opened
  chrome.storage.local.get("tasks", (data) => {
    const savedTasks = data.tasks || [];
    for (const task of savedTasks) {
      addTaskToList(task);
    }
  });

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
      addTaskToList(taskText);

      // Save updated tasks to storage
      chrome.storage.local.get("tasks", (data) => {
        const savedTasks = data.tasks || [];
        savedTasks.push(taskText);
        chrome.storage.local.set({ tasks: savedTasks });
      });

      taskInput.value = "";
    }
  });

  // Helper function to add a task to the list
  function addTaskToList(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
  }
const exportTasksButton = document.getElementById("exportTasks");

  exportTasksButton.addEventListener("click", function () {
    // Fetch saved tasks from storage
    chrome.storage.local.get("tasks", (data) => {
      const savedTasks = data.tasks || [];
      
      // Convert tasks to a plain text format
      const textContent = savedTasks.join("\n");
      
      // Create a blob with the text content
      const blob = new Blob([textContent], { type: "text/plain" });
      
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);
      
      // Create a link element for downloading
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = "tasks.txt";
      downloadLink.textContent = "Download Tasks";
      downloadLink.style.display = "none";
      
      // Trigger a click on the link to start the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up the URL and link element
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(downloadLink);
    });
  });
});