import React, { Component } from "react";

class AddTodo extends Component {
  state = {
    value: ""
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  addTodo = todo => {
    if (todo.length > 0) {
      todo = todo[0].toUpperCase() + todo.slice(1);
      let obj = {
        title: todo,
        order: this.props.nextID,
        completed: false
      };
      this.props.addTodo(obj);
      this.setState({ value: "" });
    }
    console.log("value added");
  };

  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Enter todo here..."
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              this.addTodo(this.state.value);
            }}
          >
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
