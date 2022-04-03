import configYaml from "config-yaml";
const config = configYaml(`${__dirname}/../../config/config.yml`);

console.log("process.env.NODE_ENV >> ", process.env.NODE_ENV);

export default config[process.env.NODE_ENV];
