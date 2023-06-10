import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageManagementService {

  constructor() { }

  async getAllData() {
    const item = localStorage.getItem('data');

    return item ? JSON.parse(item) : [];
  }

  async getDataById(id: string) {
    const item = localStorage.getItem('data');
    if (!item) localStorage.setItem('data', JSON.stringify([]));

    const data = JSON.parse(item!);
    const index = data.findIndex((item: any) => item.id === id);

    return index !== -1 ? data[index] : null;
  }

  async addData(data: any) {
    const item = localStorage.getItem('data') ?? '[]';

    const items = JSON.parse(item!);
    items.push(data);

    localStorage.setItem('data', JSON.stringify(items));
  }

  async updateData(id: string, data: any) {
    const item = localStorage.getItem('data');
    if (!item) localStorage.setItem('data', JSON.stringify([]));

    const items = JSON.parse(item!);
    const index = items.findIndex((item: any) => item.id === id);
    if (!index) return null;

    items[index] = data;

    localStorage.setItem('data', JSON.stringify(items));

    return items[index];
  }

  async deleteData(id: string) {
    const item = localStorage.getItem('data');
    if (!item) localStorage.setItem('data', JSON.stringify([]));

    const items = JSON.parse(item!);
    const index = items.findIndex((item: any) => item.id === id);
    if (!index) return null;

    items.splice(index, 1);

    localStorage.setItem('data', JSON.stringify(items));

    return true;
  }
}
