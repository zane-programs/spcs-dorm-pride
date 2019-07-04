(window => {
  const socket = io('/admin');
  const picker = document.getElementById("colorPicker");
  const updateColor = picker => {
    socket.emit("color", {
      r: picker.rgb[0],
      g: picker.rgb[1],
      b: picker.rgb[2]
    });
  };

  socket.on('color', data => {
    document.getElementById("colorPicker").jscolor.fromRGB(data.r,data.g,data.b);
  })

  window.updateColor = updateColor;
})(window);
