(function() {
  const socket = new WebSocket('ws://' + location.host);

  socket.onmessage = function(event) {
    if (event.data === 'reload') {
      console.log('Reloading page...');
      location.reload();
    }
  };

  socket.onclose = function() {
    console.log('WebSocket connection closed. Reconnecting...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
})();
