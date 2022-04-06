import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { TodoService } from '../../services/todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync } from '@angular/core/testing';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create todos component', () => {
    expect(component).toBeTruthy();
  });

  it('name should be empty string', () => {
    expect(component.name).toBe('');
  });

  it('should be empty array', () => {
    expect(component.todos.length).toEqual(0);
    expect(component.todos.length).toHaveSize(0);
    expect(component.editMode.length).toEqual(0);
    expect(component.editMode.length).toHaveSize(0);
  });

  it('should return data from service function getTodos', waitForAsync(() => {
    const result = [] as  any;
    let mockTodoService: jasmine.SpyObj<TodoService>;
    mockTodoService = jasmine.createSpyObj('TodoService', ['getTodos']);
    mockTodoService.getTodos.and.returnValue(result);
    fixture.detectChanges();
    expect(component.todos).toEqual(result);
  }))
});
