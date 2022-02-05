import { Config } from "./config.d";
import config from "./supacms.config";
import devConfig from "./supacms.config.dev";

const MODE = import.meta.env.MODE;
let exportConfig: Config;

if (MODE === "development") {
  exportConfig = devConfig;
} else {
  exportConfig = config;
}

export default exportConfig;
