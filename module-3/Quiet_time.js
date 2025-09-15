async function activityTable(day) {
  // Step 1: Read the list of log files
  let logFileList = await textFile("camera_logs.txt");
  let logFiles = logFileList.trim().split("\n");

  // Step 2: Initialize a 24-hour table with zeros
  let table = new Array(24).fill(0);

  // Step 3: Loop through each log file
  for (let file of logFiles) {
    let content = await textFile(file);
    let timestamps = content.trim().split("\n");

    for (let ts of timestamps) {
      let date = new Date(Number(ts));
      if (date.getDay() === day) {
        let hour = date.getHours();
        table[hour]++; // count activity
      }
    }
  }

  return table;
}

// Example usage
activityTable(1) // 1 = Monday
  .then(table => console.log(activityGraph(table)));
