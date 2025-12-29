const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteDpdRoots() {
  console.log('Starting deletion of DPD Roots from Firestore...');
  
  const batchSize = 400;
  const collectionRef = db.collection('dhatu');
  const query = collectionRef.where('source', '==', 'DPD').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  console.log(`Deleted batch of ${batchSize} documents.`);

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

deleteDpdRoots().then(() => {
    console.log('Deletion Complete.');
    process.exit(0);
}).catch((error) => {
    console.error('Error deleting documents:', error);
    process.exit(1);
});
