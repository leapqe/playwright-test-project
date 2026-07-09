import { type APIRequestContext, type APIResponse } from '@playwright/test';

/**
 * Controller for the FakeRESTApi /api/v1/Activities resource.
 * https://fakerestapi.azurewebsites.net/index.html
 *
 * Activity schema:
 *   { id: number; title: string | null; dueDate: string (ISO date-time); completed: boolean }
 */
export type User = {
  firstName: string;
  lastName: string;
  isDeleted: boolean;
};

export class UserApiController {
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
