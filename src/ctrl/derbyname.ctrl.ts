import type { ObjectId } from "mongodb"
import type { Bindings } from ".."
import * as utils from "../utils"
import * as Realm from 'realm-web';

const DERBYNAMES="todos"
export type Derbyname = {_id:ObjectId, name:string, numRoster:string}

export const derbyNameController = {
    async GET() { return utils.toJSON({ key: "hello" }) },
    async POST(req:Request,env:Bindings,App:Realm.App) {
        const body = await req.json() as Derbyname
        console.log(body)
        //todo controller les données
        const client = await utils.getClient(env,App)
        if (!client)
            return utils.toError("problème connexion MdB", 500)
        console.log(client)
        const collection = client.db('cloudflare').collection<Derbyname>(DERBYNAMES)
       const newName = await collection.insertOne(body)
        return utils.toJSON({ newName }) }
}

