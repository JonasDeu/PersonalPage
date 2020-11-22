const url = "http://jonasdeuchler.me/display";

function displayMsg() {
  fetch(url, {
    method : "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
        msg : document.getElementById('displayMsgInput').value,
    })
  });

  document.getElementById('displayMsgInput').value = '';

}
