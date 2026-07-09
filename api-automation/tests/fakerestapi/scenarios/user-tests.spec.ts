import { apiTest, expect } from '../fixtures/api-base';
import type { User } from '@controllers/crudcrud/crudcrud-users-controller';
import { randomInt } from 'crypto';
import { firstNames, lastNames } from 'api-automation/utils/names';


apiTest.describe('User API CRUD', () => {

    apiTest('Create a new user and verify response - POST /api/{endpointId}/users', async ({userApi}) => {
        const newUser: User = {

            firstName: firstNames[randomInt(0,50)],
            lastName:  lastNames[randomInt(0,50)],
            isDeleted: false
        }
        const response = await userApi.postCreateUser(newUser)
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