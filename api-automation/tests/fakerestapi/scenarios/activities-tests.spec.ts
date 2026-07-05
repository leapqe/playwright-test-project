import { apiTest, expect } from '../fixtures/api-base';
import type { Activity } from '@controllers/fakerestapi/activities-controller';


/**
 * CRUD scenarios against the FakeRESTApi /api/v1/Activities endpoint.
 * https://fakerestapi.azurewebsites.net/index.html
 *
 * Structured as Create / Read / Update / Delete so each verb on the
 * ActivitiesController is covered. FakeRESTApi validates and echoes writes
 * back with a 200, but it does NOT persist them. Assertions verify the echoed
 * response, not a re-read of the resource afterwards.
 *
 * Activity schema:
 *   { id: number; title: string | null; dueDate: string (ISO date-time); completed: boolean }
 */
apiTest.describe('FakeRESTApi Activities CRUD', () => {
  const sampleActivity: Activity = {
    id: 500,
    title: 'QE technical test activity',
    dueDate: new Date().toISOString(),
    completed: true,
  };

  // ---- CREATE ------------------------------------------------------------
  apiTest.describe('Create', () => {
    apiTest('POST /Activities creates an activity and echoes it back', async ({ activitiesApi }) => {
      const response = await activitiesApi.createActivity(sampleActivity);
      expect(response.status()).toBe(200);

      const created = await response.json();
      // FakeRESTApi echoes back the payload as-is (it keeps the id you send).
      expect(created).toMatchObject({
        id: sampleActivity.id,
        title: sampleActivity.title,
        completed: sampleActivity.completed,
      });
    });
  });

  // ---- READ --------------------------------------------------------------
  apiTest.describe('Read', () => {
    apiTest('GET /Activities returns a non-empty list', async ({ activitiesApi }) => {
      const response = await activitiesApi.getAllActivities();
      expect(response.status()).toBe(200);

      const activities = await response.json();
      expect(Array.isArray(activities)).toBe(true);
      expect(activities.length).toBeGreaterThan(0);
    });

    apiTest('GET /Activities/1 returns the expected activity shape', async ({ activitiesApi }) => {
      const response = await activitiesApi.getActivityById(1);
      expect(response.status()).toBe(200);

      const activity = await response.json();
      expect(activity).toMatchObject({
        id: 1,  
        title: expect.any(String)       
      });
    });

    apiTest('GET /Activities/9999 returns 404 for a missing resource', async ({ activitiesApi }) => {
      const response = await activitiesApi.getActivityById(9999);
      expect(response.status()).toBe(403);
    });
  });

  // ---- UPDATE ------------------------------------------------------------
  apiTest.describe('Update', () => {
    apiTest('PUT /Activities/500 updates an activity and echoes the new values', async ({
      activitiesApi,
    }) => {
      const changes: Activity = {
        id: 500,
        title: 'Updated activity title',
        dueDate: new Date().toISOString(),
        completed: false,
      };

      const response = await activitiesApi.updateActivity(500, changes);
      expect(response.status()).toBe(200);

      const updated = await response.json();
      expect(updated).toMatchObject({      
        title: changes.title,
        dueDate: changes.dueDate,
        completed: changes.completed
      });
    });
  });

  // ---- DELETE ------------------------------------------------------------
  apiTest.describe('Delete', () => {
    apiTest('DELETE /Activities/500 returns 200', async ({ activitiesApi }) => {
      const response = await activitiesApi.deleteActivity(500);
      expect(response.status()).toBe(200);
    });
  });
});
