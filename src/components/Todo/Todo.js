// @flow

import React from "react";
import { Route } from "react-router-dom";

import styles from "./Todo.less";

import Loader from "retail-ui/components/Loader";
import Gapped from "retail-ui/components/Gapped";
import Checkbox from "retail-ui/components/Checkbox";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";

import EditingModal from "./../EditingModal/EditingModal";
import ItemsList from "./../ItemsList/ItemsList";
import Filter from "./../Filter/Filter";
import type { ItemType } from "./../../domain/Item";
import type { IItemsApi } from "./../../api/api";

type Props = {|
  api: IItemsApi
|};

type FilterType = "all" | "active" | "completed";

type State = {
  items: ItemType[],
  filter: FilterType,
  newItemValue: string,
  loading: boolean
};

export default class Todo extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      items: [],
      filter: "all",
      newItemValue: "",
      loading: true
    };
  }

  async getData(): Promise<void> {
    const { getItems } = this.props.api;
    const items = await getItems();

    this.setState({ items, loading: false });
  }

  componentDidMount() {
    this.getData();
  }

  async handleAddItem(): Promise<void> {
    this.setState({ loading: true }); // ??? смешивание

    const { newItemValue, items } = this.state;
    const { addItem } = this.props.api;
    const newItemId: number = await addItem({
      checked: false,
      value: newItemValue
    });
    const item: ItemType = {
      id: newItemId,
      checked: false,
      value: newItemValue
    };

    this.setState({
      items: [...items, item],
      newItemValue: "",
      loading: false
    });
  }

  async handleUpdateItem(id: number, update: Object) {
    const { updateItem } = this.props.api;
    const { items } = this.state;
    const index = items.findIndex(item => item.id == id);

    if (index === -1) {
      return;
    }

    this.setState({ loading: true }); // ??? смешивание

    await updateItem(index, update);

    this.setState({
      items: [
        ...items.slice(0, index),
        { ...items[index], ...update },
        ...items.slice(index + 1)
      ],
      loading: false
    });
  }

  async handleRemoveItem(id: number) {
    const { removeItem } = this.props.api;
    const { items } = this.state;
    const index = items.findIndex(i => i.id === id);

    if (index === -1) {
      return;
    }

    this.setState({ loading: true }); // ??? смешивание

    await removeItem(index);

    this.setState({
      items: [...items.slice(0, index), ...items.slice(index + 1)],
      loading: false
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

  async handleCheckAll(checked: boolean) {
    const { checkAll } = this.props.api;

    this.setState({ loading: true }); // ??? смешивание

    await checkAll(checked);

    const items = this.state.items.map(i => ({
      ...i,
      checked: checked
    }));

    this.setState({
      items,
      loading: false
    });
  }

  async handleRemoveCompleted() {
    const { removeCompleted } = this.props.api;
    const { items } = this.state;

    this.setState({ loading: true }); // ??? смешивание

    await removeCompleted();

    this.setState({
      items: items.filter(item => !item.checked),
      loading: false
    });
  }

  renderHeader() {
    const { newItemValue, items } = this.state;

    return (
      <div className={styles.header}>
        <div className={styles.addingInput}>
          <Input
            width="100%"
            value={newItemValue}
            placeholder="Например: Сходить, куда глаза глядят"
            onChange={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                this.setState({ newItemValue: event.target.value });
              }
            }}
            onKeyDown={(event: Event) => {
              if (event.target instanceof HTMLInputElement) {
                event.key === "Enter" ? this.handleAddItem() : false;
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
                  this.handleCheckAll(event.target.checked);
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
    const { loading } = this.state;

    return (
      <div className={styles.container}>
        <Loader active={loading} container="Пожалуйста, подождите...">
          <div className={styles.wrap}>
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
        </Loader>
      </div>
    );
  }
}
