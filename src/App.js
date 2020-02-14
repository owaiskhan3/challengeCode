import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AddTodo from "./components/AddTodo";
import RenderTodo from "./components/RenderTodo";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      update: false
    };

    this.addTodo = this.addTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.todos === nextState.todos) {
      return false;
    } else {
      return true;
    }
  }

  async getTodos() {
    let res = await fetch("https://todo-backend-rails.herokuapp.com/");
    let todos = await res.json();
    console.log(todos, "todos");
    this.setState({ todos, nextID: todos.length });
  }

  async addTodo(todo) {
    console.log(todo);
    await fetch("https://todo-backend-rails.herokuapp.com/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }).then(async () => await this.getTodos());
  }

  async deleteTodo(id) {
    await fetch(`https://todo-backend-rails.herokuapp.com/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(id)
    });
  }

  async updateTodo(id) {
    // console.log(id);
    this.setState({ id });

    await fetch(`https://todo-backend-rails.herokuapp.com/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: true })
    }).then(async () => await this.getTodos());
  }

  render() {
    const { todos, update, id } = this.state;
    return (
      <div className="App">
        <h1>Todo app</h1>

        <div>
          <AddTodo addTodo={this.addTodo} nextID={this.state.nextID} />

          <RenderTodo
            todos={todos}
            addTodo={this.addTodo}
            deleteTodo={this.deleteTodo}
            updateTodo={this.updateTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
