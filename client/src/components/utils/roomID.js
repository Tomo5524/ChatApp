function RoomID(e) {
  // we need room id to get all messages in the room
  const selectedIndex = e.target.options.selectedIndex;
  // console.log(
  //   e.target.options[selectedIndex].getAttribute("id"),
  //   'e.target.options[selectedIndex].getAttribute("id")'
  // );
  return e.target.options[selectedIndex].getAttribute("id");
}

export default RoomID;
