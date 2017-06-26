// @flow
import type { ItemType } from "./../domain/Item";

function sleep<T>(response: T): Promise<T> {
  let time = Math.floor(Math.random() * (2.5 - 0.5) + 0.5) * 1000;
  return new Promise(resolve => setTimeout(() => resolve(response), time));
}

export interface IItemsApi {
  getItems(): Promise<ItemType[]>,
  addItem(data: $Shape<ItemType>): Promise<number>,
  updateItem(index: number, update: $Shape<ItemType>): Promise<boolean>,
  removeItem(id: number): Promise<boolean>,
  checkAll(checked: boolean): Promise<boolean>,
  removeCompleted(): Promise<boolean>
}

export default class FakeItemsApi implements IItemsApi {
  loadData(): ItemType[] {
    const dataString: ?string = localStorage.getItem("items");
    return typeof dataString === "string" ? JSON.parse(dataString) : [];
  }

  writeData(data: ItemType[]): void {
    localStorage.setItem("items", JSON.stringify(data));
  }

  async getItems(): Promise<ItemType[]> {
    const items = this.loadData();
    return await sleep(items);
  }

  async addItem(data: $Shape<ItemType>): Promise<number> {
    // Временная ошибка
    if (data.value.toLowerCase().indexOf("error") !== -1) {
      throw new Error("Error!");
    }

    const items = this.loadData();
    const id = (Math.max(...items.map(x => x.id)) || 0) + 1;
    const updatedItems = [...items, { ...data, id }];
    this.writeData(updatedItems);
    return await sleep(id);
  }

  async updateItem(index: number, update: $Shape<ItemType>): Promise<boolean> {
    const items = this.loadData();
    const updatedItems: ItemType[] = [
      ...items.slice(0, index),
      { ...items[index], ...update },
      ...items.slice(index + 1)
    ];
    this.writeData(updatedItems);
    return await sleep(true);
  }

  async removeItem(id: number): Promise<boolean> {
    const items = this.loadData();
    const updatedItems: ItemType[] = [
      ...items.slice(0, id),
      ...items.slice(id + 1)
    ];
    this.writeData(updatedItems);
    return await sleep(true);
  }

  async checkAll(checked: boolean): Promise<boolean> {
    const items = this.loadData();
    const updatedItems = items.map(i => ({
      ...i,
      checked: checked
    }));
    this.writeData(updatedItems);
    return await sleep(true);
  }

  async removeCompleted(): Promise<boolean> {
    const items = this.loadData();
    const updatedItems = items.filter(item => !item.checked);
    this.writeData(updatedItems);
    return await sleep(true);
  }
}
