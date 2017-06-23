import React from "react";
import PropTypes from "prop-types";

import styles from "./Todo.less";

import Gapped from "retail-ui/components/Gapped";
import Checkbox from "retail-ui/components/Checkbox";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import List from "../List";
import Filter from "../Filter";

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      value: props.value,
      filter: props.filter,
      idCounter: props.items.length
    };
  }

  componentDidMount() {
    const { todoValue, todoFilter, todoItems } = localStorage;
    const items = todoItems ? JSON.parse(todoItems) : todoItems;

    if (todoFilter) this.setState({ filter: todoFilter });
    if (todoValue) this.setState({ value: todoValue });
    if (items && items.length > 0 && this.props.items.length === 0) {
      const idCounter = items[items.length - 1]["id"];
      this.setState({ items, idCounter });
    }
  }

  componentDidUpdate() {
    const { value, filter, items } = this.state;

    localStorage.setItem("todoValue", value);
    localStorage.setItem("todoItems", JSON.stringify(items));
    localStorage.setItem("todoFilter", filter);
  }

  handleAllDoneChange(event) {
    const items = this.state.items.map(item => {
      item.checked = event.target.checked;
      return item;
    });

    this.setState({
      items,
      allItemsChecked: event.target.checked
    });
  }

  handleItemAdd(value) {
    const { idCounter, items } = this.state;
    const newId = idCounter + 1;
    const newItem = {
      id: newId,
      value: value.trim(),
      checked: false
    };

    this.setState({
      idCounter: newId,
      items: [...items, newItem],
      value: ""
    });
  }

  handleItemChange(id, update) {
    const { items } = this.state;
    const index = items.findIndex(item => item.id == id);

    if (index === -1) {
      return;
    }

    this.setState({
      items: [
        ...items.slice(0, index),
        Object.assign(items[index], update),
        ...items.slice(index + 1)
      ]
    });
  }

  handleItemRemove(id) {
    const { items } = this.state;
    const index = items.findIndex(item => item.id == id);

    if (index === -1) {
      return;
    }

    this.setState({
      items: [...items.slice(0, index), ...items.slice(index + 1)]
    });
  }

  handleCompletedClear() {
    const { items } = this.state;

    this.setState({
      items: items.filter(item => !item.checked)
    });
  }

  handleInputKeyDown(key) {
    const { value } = this.state;

    if (key === "Enter" && value.trim()) {
      this.handleItemAdd(value.trim());
    }
  }

  handleFilterItems() {
    const { filter, items } = this.state;
    const filters = {
      all: i => true,
      active: i => !i.checked,
      completed: i => i.checked
    };

    return items.filter(filters[filter]);
  }

  renderHeader() {
    const { items, value } = this.state;
    const { placeholder } = this.props;

    return (
      <div className={styles.header}>
        <div className={styles.input}>
          <Input
            width="100%"
            value={value}
            placeholder={placeholder}
            onChange={event => this.setState({ value: event.target.value })}
            onKeyDown={event => this.handleInputKeyDown(event.key)}
          />
        </div>
        <div className={styles.checkAll}>
          {items.length != 0 &&
            <Checkbox
              checked={items.every(x => x.checked)}
              onChange={checked => this.handleAllDoneChange(checked)}
            >
              Всё сделано
            </Checkbox>}
        </div>
      </div>
    );
  }

  renderFooter() {
    const { items, filter } = this.state;

    return (
      <Gapped gap={30}>
        {items.length != 0 &&
          <div>Осталось: {items.filter(item => !item.checked).length}</div>}
        {items.length != 0 &&
          <Filter
            filter={filter}
            onChange={filter => this.setState({ filter })}
          />}
        {items.filter(item => item.checked).length != 0 &&
          <Button use="danger" onClick={() => this.handleCompletedClear()}>
            Удалить сделанные
          </Button>}
      </Gapped>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Список дел</h1>
        <Gapped gap={30} vertical={true}>
          <Gapped gap={20} vertical={true}>
            {this.renderHeader()}
            <List
              items={this.handleFilterItems()}
              onChange={(index, update) => this.handleItemChange(index, update)}
              onRemove={index => this.handleItemRemove(index)}
            />
          </Gapped>
          {this.renderFooter()}
        </Gapped>
      </div>
    );
  }
}

Todo.propTypes = {
  items: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  filter: PropTypes.string
};

Todo.defaultProps = {
  items: [],
  value: "",
  placeholder: "Нужно сделать...",
  filter: "all"
};