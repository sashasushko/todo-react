// @flow
import type { ItemType } from "./../domain/Item";

function sleep(response: any): Promise<any> {
  let time = Math.floor(Math.random() * (1.5 - 0.5) + 0.5) * 1000;
  return new Promise(resolve => setTimeout(() => resolve(response), time));
}

export interface IItemsApi {
  getItems(): Promise<ItemType[]>,
  addItem(data: $Shape<ItemType>): Promise<number>,
  updateItem(id: number, update: $Shape<ItemType>): Promise<boolean>,
  removeItem(id: number): Promise<boolean>,
  checkAll(checked: boolean): Promise<boolean>,
  removeCompleted(): Promise<boolean>
}

export default class FakeItemsApi implements IItemsApi {
  async getItems(): Promise<ItemType[]> {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    return await sleep(items);
  }

  async addItem(data: $Shape<ItemType>): Promise<number> {
    const items: ItemType[] = JSON.parse(localStorage.getItem("items")) || [];
    const id: number = items.length + 1;
    const item: ItemType = { ...data, id };
    const newItems: ItemType[] = [...items, item];
    localStorage.setItem("items", JSON.stringify(newItems));
    return await sleep(id);
  }

  async updateItem(id: number, update: $Shape<ItemType>): Promise<boolean> {
    const items: ItemType[] = JSON.parse(localStorage.getItem("items")) || [];

    if (items.length === 0) {
      return await sleep(false);
    }

    const newItems: ItemType[] = [
      ...items.slice(0, id),
      { ...items[id], ...update },
      ...items.slice(id + 1)
    ];

    localStorage.setItem("items", JSON.stringify(newItems));

    return await sleep(true);
  }

  async removeItem(id: number): Promise<boolean> {
    const items: ItemType[] = JSON.parse(localStorage.getItem("items")) || [];

    if (items.length === 0) {
      return await sleep(false);
    }

    const newItems: ItemType[] = [
      ...items.slice(0, id),
      ...items.slice(id + 1)
    ];

    localStorage.setItem("items", JSON.stringify(newItems));

    return await sleep(true);
  }

  async checkAll(checked: boolean): Promise<boolean> {
    const items: ItemType[] = JSON.parse(localStorage.getItem("items")) || [];

    if (items.length === 0) {
      return await sleep(false);
    }

    const newItems = items.map(i => ({
      ...i,
      checked: checked
    }));

    localStorage.setItem("items", JSON.stringify(newItems));

    return await sleep(true);
  }

  async removeCompleted(): Promise<boolean> {
    const items: ItemType[] = JSON.parse(localStorage.getItem("items")) || [];

    if (items.length === 0) {
      return await sleep(false);
    }

    const newItems = items.filter(item => !item.checked);

    localStorage.setItem("items", JSON.stringify(newItems));

    return await sleep(true);
  }
}
