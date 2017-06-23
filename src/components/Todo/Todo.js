// @flow

import React from "react";
import { Route } from "react-router-dom";

import styles from "./Todo.less";

import Gapped from "retail-ui/components/Gapped";
import Checkbox from "retail-ui/components/Checkbox";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";

import EditingModal from "./../EditingModal/EditingModal";
import ItemsList from "./../ItemsList/ItemsList";
import Filter from "./../Filter/Filter";

type Props = {};

type State = {
  increment: number,
  items: Array<Object>,
  filter: string,
  value: string,
  editingValue: string
};

export default class Todo extends React.Component {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      increment: 0,
      items: [],
      filter: "all",
      value: "",
      editingValue: ""
    };
  }

  handleAddItem() {
    const { value, increment, items } = this.state;
    const item = {
      id: increment,
      checked: false,
      value
    };

    this.setState({
      items: [...items, item],
      increment: increment + 1,
      value: ""
    });
  }

  handleUpdateItem(id: number, update: Object) {
    const { items } = this.state;
    const index = items.findIndex(item => item.id == id);

    if (index === -1) {
      return;
    }

    this.setState({
      items: [
        ...items.slice(0, index),
        { ...items[index], ...update },
        ...items.slice(index + 1)
      ]
    });
  }

  handleRemoveItem(id: number) {
    const { items } = this.state;
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
      return;
    }

    this.setState({
      items: [...items.slice(0, index), ...items.slice(index + 1)]
    });
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

  handleCheckAll(checked: boolean) {
    const items = this.state.items.map(i => ({
      ...i,
      checked: checked
    }));

    this.setState({ items });
  }

  handleRemoveCompleted() {
    const { items } = this.state;

    this.setState({
      items: items.filter(item => !item.checked)
    });
  }

  renderHeader() {
    const { value, items } = this.state;

    return (
      <div className={styles.header}>
        <div className={styles.addingInput}>
          <Input
            width="100%"
            value={value}
            placeholder="Например: Сходить, куда глаза глядят"
            onChange={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                this.setState({ value: event.target.value })
              }
            }}
            onKeyDown={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                event.key === "Enter" ? this.handleAddItem() : false
              }
            }}
          />
        </div>
        <div className={styles.checkAll}>
          {items.length != 0 &&
            <Checkbox
              checked={items.every(i => i.checked)}
              onChange={(event: Event) => {
                if (event.target instanceof HTMLInputElement) {
                  this.handleCheckAll(event.target.checked)
                }
              }}
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
      <div>
        {items.length != 0 &&
          <Gapped gap={30}>
            <div>Осталось: {items.filter(i => !i.checked).length}</div>
            <Filter
              filter={filter}
              onChange={filter => this.setState({ filter })}
            />
            {items.filter(i => i.checked).length != 0 &&
              <Button use="danger" onClick={() => this.handleRemoveCompleted()}>
                Удалить сделанные
              </Button>}
          </Gapped>}
      </div>
    );
  }

  // ----------------------- ???
  renderEditingModal(props: Object) {
    const { items } = this.state;
    const { match, history } = props;
    const id = Number(match.params.id);
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
      return false;
    }

    const value = items[index].value;

    return (
      <EditingModal
        value={value}
        onClose={() => history.push("/")}
        onSubmit={(value: string) => {
          if (value.trim()) {
            this.handleUpdateItem(id, { value: value.trim() });
          } else {
            this.handleRemoveItem(id);
          }
          history.push("/");
        }}
      />
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Список дел</h1>
        {this.renderHeader()}
        <div className={styles.list}>
          <ItemsList
            items={this.handleFilterItems()}
            onChange={(id, update) => this.handleUpdateItem(id, update)}
            onRemove={id => this.handleRemoveItem(id)}
          />
        </div>
        {this.renderFooter()}
        <Route
          path="/edit/:id"
          render={props => this.renderEditingModal(props)}
        />
      </div>
    );
  }
}
