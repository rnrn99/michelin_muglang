import { mongodb } from "../db/index.mjs";

async function runTransaction(txnFunc) {
  let session = await mongodb.startSession();
  try {
    session.startTransaction();
    const result = await txnFunc(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    error.statusCode = 500;
    error.message = "Caught exception during transaction, aborting.";
    throw error;
  } finally {
    await session.endSession();
  }
}

export { runTransaction };
