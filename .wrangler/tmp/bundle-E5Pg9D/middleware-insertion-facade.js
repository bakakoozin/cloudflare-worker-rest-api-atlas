				import worker, * as OTHER_EXPORTS from "C:\\Projets Dev\\derbynames\\cloudflare-worker-rest-api-atlas\\src\\index.ts";
				import * as __MIDDLEWARE_0__ from "C:\\Projets Dev\\derbynames\\cloudflare-worker-rest-api-atlas\\node_modules\\wrangler\\templates\\middleware\\middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "C:\\Projets Dev\\derbynames\\cloudflare-worker-rest-api-atlas\\node_modules\\wrangler\\templates\\middleware\\middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap,__MIDDLEWARE_1__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "C:\\Projets Dev\\derbynames\\cloudflare-worker-rest-api-atlas\\src\\index.ts";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;