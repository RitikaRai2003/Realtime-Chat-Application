let roomUser = null;

const localstoragekey = "chats";

let otherUserImage = `https://cdn-icons-png.flaticon.com/512/6596/6596121.png`;
let currentUserImage = `https://cdn-icons-png.flaticon.com/512/10542/10542459.png`;

const getAllChats = () => {
  const Chat_template = ({ roomId, msg }) => {
    return `
   <div class="${roomId == roomUser ? "current" : "other"}-user">
            <img
              src="${
                roomId == roomUser ? "currentUserImage " : "otherUserImage"
              }"
              alt=""
            />
            <p>${msg}</p>
          </div>`;
  };

  const arr = JSON.parse(localStorage.getItem(localstoragekey)) || [];
  let html = ``;
  arr.forEach((cur) => {
    html += Chat_template({ roomId: cur.user, msg: cur.msg });
  });

  document.getElementById("chats").innerHTML = html;
  scrolltop();
};

document.getElementById("room-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const roomId = data.get("roomid");
  //   console.log("roomId", roomId);

  if (!roomId || isNaN(roomId) || roomId < 1) {
    alert("Enter Valid RoomID");
    return;
  }

  roomUser = Number(roomId);

  e.target.reset();

  document.getElementById("room-form").classList.add("d-none");
  document.getElementById("main").classList.remove("d-none");
  document.getElementById("roomID").innerHTML = roomUser;
  // alert("Valid");
  getAllChats();
});

document.getElementById("logoutUser").addEventListener("click", (e) => {
  document.getElementById("room-form").classList.remove("d-none");
  document.getElementById("main").classList.add("d-none");
  document.getElementById("roomID").innerHTML = 0;
});

document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const message = data.get("message");

  if (!message) {
    return;
  }
  const messageObj = {
    msg: message,
    user: roomUser,
    timeStamp: new Date().getTime(),
  };

  const AllChats = JSON.parse(localStorage.getItem(localstoragekey)) || [];
  localStorage.setItem(
    localstoragekey,
    JSON.stringify([...AllChats, messageObj])
  );

  e.target.reset();
  getAllChats();

  // console.log({ message });
});

function scrolltop() {
  const container = document.getElementsByClassName("chat-screen")[0];

  container.scrollTop = container.scrollHeight;
}
getAllChats();
scrolltop();

window.addEventListener("storage", (e) => {
  if (e.key == localstoragekey || e.newValue == localstoragekey) {
    getAllChats();
    scrolltop();
  }
});

document.getElementById("ResetChats").addEventListener("click", (e) => {
  localStorage.setItem(localstoragekey, JSON.stringify([]));
  getAllChats();
});
