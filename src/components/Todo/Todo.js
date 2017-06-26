// @flow
import React from "react";
import { Route } from "react-router-dom";
import styles from "./Todo.less";
import Loader from "retail-ui/components/Loader";
import Gapped from "retail-ui/components/Gapped";
import Modal from "retail-ui/components/Modal";
import Checkbox from "retail-ui/components/Checkbox";
import Input from "retail-ui/components/Input";
import Button from "retail-ui/components/Button";
import EditingModal from "./../EditingModal/EditingModal";
import ItemsList from "./../ItemsList/ItemsList";
import Filter from "./../Filter/Filter";
import type { ItemType } from "./../../domain/Item";
import type { FilterType } from "./../../domain/Filter";
import type { IItemsApi } from "./../../api/api";

type Props = {|
  api: IItemsApi
|};

type State = {|
  items: ItemType[],
  filter: FilterType,
  newItemValue: string,
  loading: boolean,
  error: boolean
|};

export default class Todo extends React.Component {
  props: Props;
  state: State = {
    items: [],
    filter: "all",
    newItemValue: "",
    loading: true,
    error: false
  };

  async getData(): Promise<void> {
    const items = await this.props.api.getItems();
    this.setState({ items, loading: false });
  }

  componentDidMount() {
    this.getData();
  }

  async sendItem(data: $Shape<ItemType>): Promise<void> {
    try {
      const { items } = this.state;
      const id = await this.props.api.addItem(data);
      this.setState({
        items: [...items, { ...data, id }],
        loading: false,
        newItemValue: ""
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  handleAddItem() {
    const { newItemValue } = this.state;
    if (newItemValue.trim()) {
      this.setState({ loading: true });
      this.sendItem({ checked: false, value: newItemValue.trim() });
    }
  }

  async updateItem(id: number, update: $Shape<ItemType>): Promise<void> {
    const { items } = this.state;
    await this.props.api.updateItem(id, update);
    this.setState({
      items: [
        ...items.slice(0, id),
        { ...items[id], ...update },
        ...items.slice(id + 1)
      ],
      loading: false
    });
  }

  handleUpdateItem(id: number, update: $Shape<ItemType>) {
    const index = this.state.items.findIndex(item => item.id == id);
    if (index === -1) return;
    this.setState({ loading: true });
    this.updateItem(index, update);
  }

  async removeItem(id: number): Promise<void> {
    const { items } = this.state;
    await this.props.api.removeItem(id);
    this.setState({
      items: [...items.slice(0, id), ...items.slice(id + 1)],
      loading: false
    });
  }

  handleRemoveItem(id: number) {
    const index = this.state.items.findIndex(i => i.id === id);
    if (index === -1) return;
    this.setState({ loading: true });
    this.removeItem(index);
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

  async checkAll(checked: boolean): Promise<void> {
    await this.props.api.checkAll(checked);
    const items = this.state.items.map(i => ({
      ...i,
      checked: checked
    }));
    this.setState({
      items,
      loading: false
    });
  }

  handleCheckAll(checked: boolean) {
    this.setState({ loading: true });
    this.checkAll(checked);
  }

  async removeCompleted(): Promise<void> {
    await this.props.api.removeCompleted();
    const items = this.state.items.filter(item => !item.checked);
    this.setState({
      items,
      loading: false
    });
  }

  handleRemoveCompleted() {
    this.setState({ loading: true });
    this.removeCompleted();
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

  renderEditingModal(props) {
    const { items } = this.state;
    const { match, history } = props;
    const id = Number(match.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return false;
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

  renderError() {
    return (
      <Modal onClose={() => this.setState({ error: false })}>
        <Modal.Body>
          <p>Что-то не вышло. Попробуйте ещё раз</p>
        </Modal.Body>
        <Modal.Footer panel={true}>
          <Button use="primary" onClick={() => this.setState({ error: false })}>
            Ладно
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    const { error, loading } = this.state;

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
            {error && this.renderError()}
          </div>
        </Loader>
      </div>
    );
  }
}
