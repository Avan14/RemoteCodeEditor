import mongoose from "mongoose";


//  single connection reusable cached mongoose

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    // eslint-disable-next-line no-var
    var __mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global.__mongooseCache ?? { conn: null, promise: null };

global.__mongooseCache = cache;

export async function connectToDB(): Promise<typeof mongoose> {
    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not set");
        }

        cache.promise = mongoose.connect(uri).then((m) => m);
    }

    cache.conn = await cache.promise;
    return cache.conn;
}
