const app = Vue.createApp({
    data() {
        return {
            tasks: [],
            newTask: {
                title: '',
            },
        }
    },
    methods: {
        addTask() {
            if (this.newTask.title) {
                const newId = this.tasks.length + 1;
                this.tasks.push({
                    id: newId,
                    title: this.newTask.title,
                });
                this.newTask.title = '';
            }
        },
        editTask(task) {
            const updatedTitle = prompt('Edit Task', task.title);
            if (updatedTitle !== null) {
                task.title = updatedTitle;
            }
        },
        deleteTask(taskId) {
            const confirmed = confirm('Are you sure you want to delete this task?');
            if (confirmed) {
                this.tasks = this.tasks.filter(task => task.id !== taskId);
            }
        },
    }
});

app.mount('#app');