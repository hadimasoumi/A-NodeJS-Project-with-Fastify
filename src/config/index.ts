import configYaml from "config-yaml";

const config = configYaml(`${__dirname}/../../config/config.yml`);

let NODE_ENV: string;
switch (parseInt(process.env.NODE_ENV as string)) {
  case 1:
    NODE_ENV = "development";
    break;
  case 2:
    NODE_ENV = "production";
    break;
  case 3:
    NODE_ENV = "staging";
    break;
  default:
    NODE_ENV = "development";
}

console.log("NODE_ENV :>> ", NODE_ENV);
export default config[NODE_ENV];
