import { apiTest, expect } from '../fixtures/api-base';
import type { User } from '@controllers/crudcrudapi/users-controller';
import { faker } from '@faker-js/faker/locale/en';

/**
 * CRUD scenarios for the Users resource, backed by crudcrud.com.
 *
 * crudcrud.com is an instant REST API service — it provides a hosted CRUD store
 * with no back-end code. A unique endpoint id (the CRUD_CRUD_URL env var) acts as
 * both the base URL and the only auth token. Appending a resource name auto-creates
 * that collection on first write, and each created record gets an auto-generated `_id`.
 * https://crudcrud.com
 *
 *   Base:        https://crudcrud.com/api/<unique-id>
 *   Collection:  <base>/users            POST (create), GET (list)
 *   Record:      <base>/users/<id>       GET, PUT (update), DELETE
 *
 * NOTE: the endpoint id is temporary and expires periodically. If these tests start
 * failing with connection/404 errors, grab a fresh id from https://crudcrud.com and
 * update CRUD_CRUD_URL in env/.env.test.
 */

apiTest.describe('User API CRUD', () => {

    apiTest('Create a new user and verify response - POST /api/{endpointId}/users', async ({usersApi}) => {
        const newUser: User = {

            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            isDeleted: false
        }
        const response = await usersApi.postCreateUser(newUser)
        expect(response.status()).toBe(201);

        const responseJson = await response.json();
        expect(responseJson).toMatchObject({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isDeleted: newUser.isDeleted,
            _id: expect.any(String)
        });
    });

});