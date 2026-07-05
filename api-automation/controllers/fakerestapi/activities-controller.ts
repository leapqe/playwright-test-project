import { type APIRequestContext, type APIResponse } from '@playwright/test';

/**
 * Controller for the FakeRESTApi /api/v1/Activities resource.
 * https://fakerestapi.azurewebsites.net/index.html
 *
 * Activity schema:
 *   { id: number; title: string | null; dueDate: string (ISO date-time); completed: boolean }
 */
export type Activity = {
  id: number;
  title: string | null;
  dueDate: string;
  completed: boolean;
};

export class ActivitiesController {
  readonly request: APIRequestContext;
  readonly baseUrl: string;
  private readonly resource = '/api/v1/Activities';

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl =
      process.env.API_BASE_URL ||
      (() => {
        throw new Error('API_BASE_URL NOT FOUND');
      })();
  }

  async getAllActivities(): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${this.resource}`);
  }

  async getActivityById(id: number): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/api/v1/Activity/${id}`);
  }

  async createActivity(data: Activity): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${this.resource}`, { data });
  }

  async updateActivity(id: number, data: Activity): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}${this.resource}/${id}`, { data });
  }

  async deleteActivity(id: number): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}${this.resource}/${id}`);
  }
}
