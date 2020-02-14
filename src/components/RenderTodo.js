import React, { Component } from "react";

class RenderTodo extends Component {
  state = {};
  render() {
    return this.props.todos.map((todo, index) => {
      return (
        <div key={index}>
          <span>
            id: {todo.id}, todo: {todo.title}, completed:
            {todo.completed.toString()}
          </span>
          <button
            onClick={() => {
              this.props.deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              this.props.updateTodo(todo.id);
            }}
          >
            Update
          </button>
        </div>
      );
    });
  }
}

export default RenderTodo;
