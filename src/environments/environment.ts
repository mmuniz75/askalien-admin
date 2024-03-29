// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //SERVER_URL : "http://localhost:8080/admin",
  SERVER_URL : "https://askalien-admin.fly.dev/admin",
  AUTH_URL : " https://iloiojve4d.execute-api.us-east-1.amazonaws.com/v1/api/users"
 
};
