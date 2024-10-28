import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';
import { AppRoutes } from './presentation/routes';

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes:AppRoutes.routes,
  });

  server.start();
}
