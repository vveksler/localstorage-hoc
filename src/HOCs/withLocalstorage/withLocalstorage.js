import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (key, arr) => WrappedComponent => {
  return class WithLocalstorage extends Component {
    state = {
      data: load(key) || arr
    };

    editTodo = id => {
      const { data } = this.state;
      const updatedData = data.map(todo => {
        return todo.id === id
          ? {
              ...todo,
              isComplete: !todo.isComplete
            }
          : todo;
      });

      this.setState(
        () => ({
          data: updatedData
        }),
        () => {
          this.saveToStorage();
        }
      );
    };

    saveData = todo => {
      this.setState(
        state => ({
          data: [todo, ...state.data]
        }),
        () => {
          this.saveToStorage();
        }
      );
    };

    saveToStorage = () => save(key, this.state.data);

    render() {
      return (
        <WrappedComponent
          {...this.props}
          saveData={this.saveData}
          savedData={this.state.data}
          editData={this.editTodo}
        />
      );
    }
  };
};

export default withLocalstorage;
