import type { ObjectId } from "mongodb"
import type { Bindings } from ".."
import * as utils from "../utils"
import * as Realm from 'realm-web';
import { DB_NAME    } from "../utils";

const DERBYNAMES="todos"
export type Derbyname = {_id:ObjectId, name:string, numRoster:string}

export const derbyNameController = {

    async GET(req:Request,env:Bindings,App:Realm.App) {
        // ====================================
        //PAGINATION...
        // ====================================
        const client = await utils.getClient(env,App)
        if (!client)
            return utils.toError("problème connexion MdB", 500)
        const collection = client.db(DB_NAME).collection(DERBYNAMES)
        const derbyNames = await collection.find({})
        return utils.toJSON(derbyNames.map(d=>({
            name: d.name,
            numRoster:d.numRoster
        })))     

    },
    async POST(req:Request,env:Bindings,App:Realm.App) {
        const body = await req.json() as Derbyname
        // ====================================
        //todo controller les données
        // ====================================
        const client = await utils.getClient(env,App)
        if (!client)
            return utils.toError("problème connexion MdB", 500)
        const collection = client.db(DB_NAME).collection<Derbyname>(DERBYNAMES)
       const newName = await collection.insertOne(body)
        return utils.toJSON({ newName }) }
}

