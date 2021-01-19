import {
  UserFollowerHandler,
  Auth,
  UserHandler,
  DbHandler,
} from './src/handlers';
import jwt from 'jsonwebtoken';
import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import Response from './src/_support/https/response';
import { generatePolicy } from './src/utils/genrate-policy';
import { Container } from 'src/db/common';

async function putProfile({ inputs, user }): Promise<APIGatewayProxyResult> {
  const profile = await UserHandler.get({ uuid: user.uuid });
  return Response.success(await UserHandler.update(inputs, profile));
}

async function migrate({ inputs }): Promise<APIGatewayProxyResult> {
  const db = new DbHandler(inputs);
  db.migrate();
  return Response.noContent();
}

async function login({ inputs }): Promise<APIGatewayProxyResult> {
  return Response.success(await Auth.login(inputs));
}

async function signup({ inputs }): Promise<APIGatewayProxyResult> {
  return Response.success(await Auth.signup(inputs));
}

export const auth = async (event, callback): Promise<any> => {
  if (!event.authorizationToken) {
    return callback('Unauthorized');
  }

  const tokenParts = event.authorizationToken.split(' ');
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
    return callback('Unauthorized');
  }

  const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
  return callback(null, generatePolicy(decoded, 'Allow', event.methodArn));
};

const map = {
  ['/auth/signup']: signup,
  ['/auth/login']: login,
  ['/migrate']: migrate,
  ['/profile']: putProfile,
};

export const responder: APIGatewayProxyHandler = async (event) => {
  const callback = map[event.path];
  return Container.apigw({ event, callback });
};

export const getUserResponder: APIGatewayProxyHandler = async (event) => {
  const callback = async ({ inputs }) =>
    Response.success(await UserHandler.get(inputs));

  return Container.apigw({ event, callback });
};

export const toogleFollowingResponder: APIGatewayProxyHandler = async (
  event
) => {
  const callback = async ({ inputs, user }): Promise<APIGatewayProxyResult> =>
    Response.success(await UserFollowerHandler.toggle(inputs, user));

  return Container.apigw({ event, callback });
};
