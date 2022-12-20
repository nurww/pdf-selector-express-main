function statusCheck(token) {
  if (statusMap.token == "inProgress") {
    setTimeout(statusCheck(token), 1000);
  }
  if (statusMap.token == "ready") {
  }
}
