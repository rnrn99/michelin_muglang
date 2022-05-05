import { mongodb } from "../db/index.mjs";

async function runTransaction(txnFunc) {
  let session = await mongodb.startSession(); // session 시작
  try {
    session.startTransaction();
    const result = await txnFunc(session); // Updates collections in a transactions
    await session.commitTransaction(); // 모두 업데이트 성공시 db에 업데이트
    return result;
  } catch (error) {
    await session.abortTransaction(); // 하나라도 실패시 rollback (db에 업데이트 X)
    error.statusCode = 500;
    error.message = "Caught exception during transaction, aborting.";
    throw error;
  } finally {
    await session.endSession(); // session 종료
  }
}

export { runTransaction };
