<template>
    <div class="container">
        <h1>Notes</h1>
        <div class="add-task-form">
            <form @submit.prevent="addTask" class="form-container">
                <input type="text" id="title" v-model="newTask.title" required>
                <button @click="addTask" class="add-button">Add</button>
            </form>
        </div>
        <div class="task-list">
            <div class="task-card" v-for="task in tasks" :key="task.id">
                <div v-if="!task.isEditing" class="task-info">
                    <div class="task-content">
                        <div class="left">
                            <div class="task-details">
                                <h3 :class="{ 'task-title': true, 'full-title': task.showFullTitle }"
                                    @click="toggleTitle(task)" v-html="formatTitle(task)">
                                </h3>
                            </div>
                            <div class="right">
                                <button @click="toggleEdit(task)" class="edit-button">Edit</button>
                                <button @click="deleteTask(task.id)" class="delete-button">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="edit-row">
                        <input type="text" v-model="task.updatedTitle">
                        <div class="edit-buttons">
                            <button @click="saveEdit(task)" class="add-button">Save</button>
                            <button @click="cancelEdit(task)" class="delete-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const tasks = ref([]);
        const newTask = ref({ title: '' });

        const addTask = () => {
            if (newTask.value.title) {
                const newId = tasks.value.length + 1;
                tasks.value.push({
                    id: newId,
                    title: newTask.value.title,
                    isEditing: false,
                    updatedTitle: '',
                });
                newTask.value.title = '';
                saveTasks();
            }
        };

        const toggleEdit = (task) => {
            task.isEditing = true;
            task.updatedTitle = task.title;
        };

        const saveEdit = (task) => {
            if (task.updatedTitle.trim() !== '') {
                task.title = task.updatedTitle;
                task.isEditing = false;
                saveTasks();
            }
        };

        const cancelEdit = (task) => {
            task.isEditing = false;
        };

        const deleteTask = (taskId) => {
            const confirmed = confirm('Are you sure you want to delete this task?');
            if (confirmed) {
                tasks.value = tasks.value.filter((task) => task.id !== taskId);
                saveTasks();
            }
        };

        const toggleTitle = (task) => {
            task.showFullTitle = !task.showFullTitle;
        };

        const formatTitle = (task) => {
            if (task.showFullTitle) {
                return task.title;
            } else {
                const chunkSize = 65;
                const chunks = [];
                for (let i = 0; i < task.title.length; i += chunkSize) {
                    chunks.push(task.title.substring(i, i + chunkSize));
                }
                return chunks.join('<br>');
            }
        };

        const loadTasks = () => {
            const savedTasks = localStorage.getItem("tasks");
            if (savedTasks) {
                tasks.value = JSON.parse(savedTasks);
            }
        };

        const saveTasks = () => {
            localStorage.setItem("tasks", JSON.stringify(tasks.value));
        };

        onMounted(() => {
            loadTasks();
        });

        return {
            tasks,
            newTask,
            addTask,
            toggleEdit,
            saveEdit,
            cancelEdit,
            deleteTask,
            toggleTitle,
            formatTitle,
        };
    },
};
</script>
  
<style scoped>
/* Add your CSS styles here */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.form-container {
    display: flex;
    align-items: baseline;
    gap: 10px;
    /* Add spacing between input and button */
}

h1 {
    font-size: 38px;
    color:white;
}

.add-task-form {
    margin-top: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    height: 25px;
    padding: 20px;
    /* margin-bottom: 10px; */
    border-radius: 10px;
    border: none;
    font-size: 18px;
}

/* Add button styles for Add button */
button.add-button {
    background-color: rgb(50, 200, 50);
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
}

button.add-button:hover {
    background-color: darkgreen;
}

/* Add button styles for Edit button */
button.edit-button {
    background-color: rgb(72, 72, 246);
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
}

button.edit-button:hover {
    background-color: darkblue;
}

/* Add button styles for Delete button */
button.delete-button {
    background-color: rgb(240, 46, 46);
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 10px;
}

button.delete-button:hover {
    background-color: darkred;
}

.task-list {
    margin-top: 20px;
}

.task-card {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    display: block;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    /* flex-wrap: wrap; */
}

.task-card h3 {
    margin: 0;
}

.task-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* Ensure the content fills the entire card */
}

.left {
    flex-grow: 1;
    display: contents;
}

.right {
    display: flex;
    gap: 10px;
    /* Add some spacing between buttons */
}

.task-details {
    flex-grow: 1;
    /* Allow the title to expand and fill available space */
}

.task-title {
    max-width: 100%;
    /* Allow the title to take up the full width */
    cursor: pointer;
    /* Add a pointer cursor to indicate it's clickable */
}

.task-title.full-title {
    white-space: normal;
    /* Allow text to wrap normally */
}

.task-actions {
    display: flex;
    gap: 10px;
    /* Add some spacing between buttons */
}

.task-info h3 {
    flex-grow: 1;
    /* Allow the title to expand and fill available space */
}

input[type="text"] {
    width: 100%;
    padding: 5px;
}

.edit-row {
    display: flex;
    align-items: center;
}

.edit-row input[type="text"] {
    flex-grow: 1;
    margin-right: 10px;
    /* Add some spacing between input and buttons */
}

.edit-buttons {
    display: flex;
    gap: 10px;
    /* Add some spacing between buttons */
}
</style>