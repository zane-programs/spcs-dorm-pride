(window => {
  const socket = io();
  socket.on('color', data => document.body.style.backgroundColor = `rgb(${data.r}, ${data.g}, ${data.b})`);
})(window);
