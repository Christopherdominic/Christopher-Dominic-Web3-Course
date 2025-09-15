function activityTable(day) {
  return textFile("camera_logs.txt")
    .then(logFileList => {
      // Split list of filenames
      let logFiles = logFileList.trim().split("\n");

      // Create an array of promises, one per log file
      let filePromises = logFiles.map(file =>
        textFile(file).then(content => content.trim().split("\n"))
      );

      // Wait for all log files to be read
      return Promise.all(filePromises);
    })
    .then(allTimestamps => {
      // allTimestamps is an array of arrays (one per file)
      let table = new Array(24).fill(0);

      // Flatten and process all timestamps
      for (let timestamps of allTimestamps) {
        for (let ts of timestamps) {
          let date = new Date(Number(ts));
          if (date.getDay() === day) {
            let hour = date.getHours();
            table[hour]++;
          }
        }
      }

      return table;
    });
}

// Example usage
activityTable(6) // Saturday
  .then(table => console.log(activityGraph(table)))
  .catch(err => console.error("Error:", err));
