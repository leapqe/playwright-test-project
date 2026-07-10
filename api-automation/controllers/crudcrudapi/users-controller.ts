import { type APIRequestContext, type APIResponse } from '@playwright/test';


export type User = {
  firstName: string;
  lastName: string;
  isDeleted: boolean;
};

export class UsersController {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.CRUD_CRUD_URL || (() => {
        throw new Error('API_BASE_URL NOT FOUND');
      })();
  }

  async postCreateUser(data: User): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/users`, {data});
  }

  

}
