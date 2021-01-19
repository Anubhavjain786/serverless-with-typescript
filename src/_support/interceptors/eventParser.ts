export const eventBodyParser = (event) => {
  return {
    inputs: {
      ...(JSON.parse(event.body) || {}),
      ...(event.queryStringParameters || {}),
      ...(event.pathParameters || {}),
    },
    user: event.requestContext?.authorizer?.principalId || {},
    headers: event.headers,
  };
};
