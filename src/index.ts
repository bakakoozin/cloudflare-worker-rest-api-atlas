import * as Realm from 'realm-web';
import * as utils from './utils';
import { derbyNameController } from './ctrl/derbyname.ctrl';

// The Worker's environment bindings. See `wrangler.toml` file.
export interface Bindings {
    // MongoDB Atlas Application ID
    ATLAS_APPID: string;
    ATLAS_TOKEN: string
}

// Define type alias; available via `realm-web`
type Document = globalThis.Realm.Services.MongoDB.Document;

// Declare the interface for a "todos" document
interface Todo extends Document {
    owner_id: string;
    done: boolean;
    name: string;
    number: string;
}

let App: Realm.App;
const ObjectId = Realm.BSON.ObjectID;

// Define the Worker logic
const worker: ExportedHandler<Bindings> = {
    async fetch(req, env) {
        const url = new URL(req.url);
        App = App || new Realm.App(env.ATLAS_APPID);

        const method = req.method;
        const path = url.pathname.replace(/[/]$/, '');
        const todoID = url.searchParams.get('id') || '';
        const router: Record<string, Record<string, (req: Request, env: Bindings, App: Realm.App) => Promise<Response>>> = { "/derbynames": derbyNameController }
        const controller = router?.[path]?.[method]
        return typeof controller === "function" ? await controller(req, env, App) : utils.toError("not found", 404)
        /*return
        if (path !== '/api/todos') {
            return utils.toError(`Unknown '${path}' URL; try '/api/todos' instead.`, 404);
        }

        const token = env.ATLAS_TOKEN;
        console.log(token)
        let client
        try {
            const credentials = Realm.Credentials.apiKey(token);
            // Attempt to authenticate
            const user = await App.logIn(credentials);
            client = user.mongoClient('mongodb-atlas');
        } catch (err) {
            return utils.toError('Error with authentication.', 500);
        }

        // Grab a reference to the "cloudflare.todos" collection
        const collection = client.db('cloudflare').collection<Todo>('todos');

        try {
            if (method === 'GET') {
                if (todoID) {
                    // GET /api/todos?id=XXX
                    return utils.reply(
                        await collection.findOne({
                            _id: new ObjectId(todoID)
                        })
                    );
                }

                // GET /api/todos
                return utils.reply(
                    await collection.find()
                );
            }

            // POST /api/todos
            if (method === 'POST') {
                const { name } = await req.json()
                const { number } = await req.json()
                return utils.reply(
                    await collection.insertOne({
                        owner_id: '',
                        done: false,
                        name: name,
                        number: number,
                    })
                );
            }

            // PATCH /api/todos?id=XXX&done=true
            if (method === 'PATCH') {
                return utils.reply(
                    await collection.updateOne({
                        _id: new ObjectId(todoID)
                    }, {
                        $set: {
                            done: url.searchParams.get('done') === 'true'
                        }
                    })
                );
            }

            // DELETE /api/todos?id=XXX
            if (method === 'DELETE') {
                return utils.reply(
                    await collection.deleteOne({
                        _id: new ObjectId(todoID)
                    })
                );
            }

            // unknown method
            return utils.toError('Method not allowed.', 405);
        } catch (err) {
            const msg = (err as Error).message || 'Error with query.';
            return utils.toError(msg, 500);
        }*/
    }
}

// Export for discoverability
export default worker;
