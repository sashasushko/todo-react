import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import Gapped from "retail-ui/components/Gapped/Gapped";
import Group from "retail-ui/components/Group/Group";
import Checkbox from "retail-ui/components/Checkbox/Checkbox";
import Input from "retail-ui/components/Input/Input";
import Button from "retail-ui/components/Button/Button";
import List from "./List";
import Filter from "./Filter";

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      value: props.value,
      filter: props.filter,
      idCounter: props.items.length
    };
  }

  handleAllDoneChange(event) {
    const { items } = this.state;
    const newItems = items.map(item => {
      item.checked = event.target.checked;
      return item;
    });

    this.setState({
      items: newItems,
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
      items: items.filter(i => !i.checked)
    });
  }

  handleInputKeyDown(key) {
    const { value, items } = this.state;

    if (key === "Enter" && value.trim()) {
      this.handleItemAdd(value.trim());
    }
  }

  filterItems() {
    const { filter, items } = this.state;
    const filters = {
      all: i => true,
      active: i => !i.checked,
      completed: i => i.checked
    };

    return items.filter(filters[filter]);
  }

  render() {
    const { items, value, filter } = this.state;
    const { placeholder } = this.props;

    return (
      <div
        style={{
          maxWidth: "640px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "30px 40px 40px",
          outline: "1px solid rgba(0,0,0,0.1)"
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "40px" }}>Список дел</h1>
        <Gapped gap={30} vertical={true}>
          <Gapped gap={20} vertical={true}>
            <div
              style={{
                display: "flex",
                maxWidth: "580px",
                width: "100%"
              }}
            >
              <div
                style={{
                  flex: "auto"
                }}
              >
                <Input
                  width="100%"
                  mainInGroup
                  value={value}
                  placeholder={placeholder}
                  onChange={event =>
                    this.setState({ value: event.target.value })}
                  onKeyDown={event => this.handleInputKeyDown(event.key)}
                />
              </div>
              <div
                style={{
                  paddingTop: "5px",
                  paddingLeft: "20px",
                  width: "110px"
                }}
              >
                {items.length != 0 &&
                  <Checkbox
                    checked={items.every(x => x.checked)}
                    onChange={checked => this.handleAllDoneChange(checked)}
                  >
                    Всё сделано
                  </Checkbox>}
              </div>
            </div>
            <List
              items={this.filterItems()}
              onChange={(index, update) => this.handleItemChange(index, update)}
              onRemove={index => this.handleItemRemove(index)}
            />
          </Gapped>
          <Gapped gap={30}>
            {items.length != 0 &&
              <div>Осталось: {items.filter(i => !i.checked).length}</div>}
            {items.length != 0 &&
              <Filter
                filter={filter}
                onChange={filter => this.setState({ filter })}
              />}
            {items.filter(i => i.checked).length != 0 &&
              <Button use="danger" onClick={() => this.handleCompletedClear()}>
                Удалить сделанные
              </Button>}
          </Gapped>
        </Gapped>
      </div>
    );
  }
}

ToDo.propTypes = {
  items: PropTypes.array,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  filter: PropTypes.string
};

ToDo.defaultProps = {
  items: [],
  value: "",
  placeholder: "",
  filter: "all"
};
