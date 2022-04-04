import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../todo';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
    todos: Todo[] = [];
    editMode: any[] = [];
    name: any = '';

    constructor(
        private todoService: TodoService) {}

    ngOnInit() {
        this.todoService.getTodos().subscribe(todos => {
            console.log(todos);
            this.todos = todos;

            for (var i = 0; i < todos.length; i++) {
                this.editMode.push(false);
            }
        },
		error => {
			console.log(error);
		});
    }

    postTodos() {
        if (this.name === '') {
            this.showSnackbar();
            return;
        } else {
            const content = {
                'isCompleted': false,
                'text': this.name
            };

            this.todoService.postTodos(content).subscribe(response => {
                console.log('CONTENT', content);
                location.reload();
                console.log(response);
            },
                error => {
                    console.log(error);
            });
        }
	}

    checkTodo(i: any) {
        const id = this.todos[i]._id;

        const content = {
            'isCompleted': !this.todos[i].isCompleted,
            'text': this.todos[i].text
        };

        this.todoService.updateTodo(content, id).subscribe(response => {
            console.log('CONTENT', content);
            location.reload();
            console.log(response);
        },
        error => {
            console.log(error);
        });
    }

    editTodo(i: any) {
        if (this.editMode[i]) {
            const id = this.todos[i]._id;

            const content = {
                'isCompleted': this.todos[i].isCompleted,
                'text': this.todos[i].text
            };
    
            this.todoService.updateTodo(content, id).subscribe(response => {
                console.log('CONTENT', content);
                location.reload();
                console.log(response);
            },
                error => {
                    console.log(error);
            });
        } else {
            this.editMode[i] = true;
        }
    }

    deleteTodo(i: any) {
        const id = this.todos[i]._id;

        this.todoService.deleteTodo(id)
			.subscribe(
				response => {
					console.log(response);
                    location.reload();
				}
			,
                error => {
                    console.log(error);
        });
    }

    showSnackbar() {
        // Get the snackbar DIV
        var x: any = document.getElementById("snackbar");
      
        // Add the "show" class to DIV
        x.className = "show";
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      }
}
