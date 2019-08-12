import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
  state = {
    inputValue: ''
  };

  getId() {
    const { savedData } = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);

    return biggest + 1;
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value
    });
  };

  createNewRecordByEnter = event => {
    if (event.key === 'Enter') {
      this.createNewRecord();
    }
  };

  toggleRecordComplete = id => () => {
    const { editData } = this.props;

    editData(id);
  };

  createNewRecord = () => {
    const { inputValue } = this.state;
    const { saveData } = this.props;
    const id = this.getId();

    this.setState(
      () => ({
        inputValue: ''
      }),
      () => {
        saveData({
          id,
          isComplete: false,
          text: inputValue
        });
      }
    );
  };

  render() {
    const { inputValue } = this.state;
    const { savedData } = this.props;

    return (
      <Card title="Список дел">
        <div className="todo t-todo-list">
          <div className="todo-item todo-item-new">
            <input
              value={inputValue}
              placeholder="Введите задачу"
              onChange={this.handleChange}
              onKeyPress={this.createNewRecordByEnter}
              className="todo-input t-input"
            />
            <span onClick={this.createNewRecord} className="plus t-plus">
              +
            </span>
          </div>
          {savedData.length
            ? this.renderRecord(savedData)
            : this.renderEmptyRecord()}
        </div>
      </Card>
    );
  }

  renderEmptyRecord() {
    return (
      <div className="todo-item t-todo">
        <p className="todo-item__text">Empty...</p>
      </div>
    );
  }

  renderRecord = record => {
    return record.map(item => (
      <div key={item.id} className="todo-item t-todo">
        <p className="todo-item__text">{item.text}</p>
        <span
          onClick={this.toggleRecordComplete(item.id)}
          className="todo-item__flag t-todo-complete-flag"
        >
          [{item.isComplete ? 'x' : ' '}]
        </span>
      </div>
    ));
  };
}

export default withLocalstorage('todo-app', [])(Todo);
