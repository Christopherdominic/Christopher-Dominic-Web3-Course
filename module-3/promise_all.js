function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]); // nothing to wait for
      return;
    }

    let results = [];
    let completed = 0;

    promises.forEach((p, index) => {
      // Make sure we handle non-promises too (values)
      Promise.resolve(p).then(
        value => {
          results[index] = value; // store in correct order
          completed++;
          if (completed === promises.length) {
            resolve(results); // all done
          }
        },
        error => {
          reject(error); // fail fast
        }
      );
    });
  });
}
