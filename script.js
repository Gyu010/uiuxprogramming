
const serviceName = "PC Help Guide"
let isSubcribed = false;
let submitCount = 0;


function makeSubcriibeMessage(problem, subscribed) {
  if(subscribed == true)  {
    return problem + "문제를 확인했습니다.";
  }
  
  return "문제점을 입력한 뒤 확인해주세요.";
}

const subscribeform = document.querySelector("#subscribe-form");
const problemInput = document.querySelector("#problem-text");
const subscribeButton = document.querySelector("#subscribeButton");
const subscribeMessage = document.querySelector("#subscribeMessage");


console.log(subscribeform);                               
console.log(problemInput);                               
console.log(subscribeButton);                               
console.log(subscribeMessage);                               

function handleSubscribe(event) {
  event.preventDefault();

  const problemText = problemInput.value.trim();

  if (problemText === "") {
    subscribeMessage.textContent = 
    "문제점을 입력한 뒤 확인해주세요.";

    problemInput.focus();
    return;
  }

  isSubcribed = true;
  submitCount +=  1;

  subscribeMessage.textContent =
    makeSubcriibeMessage(problemText, isSubcribed);

  subscribeMessage.classList.add("is-success");

  subscribeButton.textContent = "확인완료";
  subscribeButton.disabled = true;

}

subscribeform.addEventListener("submit", handleSubscribe);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick(event) {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark ? "라이트 테마로 바꾸기" : "다크 테마로 바꾸기"
}

themeButton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
  const maxLength = nicknameInput.maxLength
  const currentLenght = nicknameInput.value.length;

  nicknameCount.textContent = currentLenght + " / " + maxLength;
}

nicknameInput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
  const agreed = agreeCheck.checked

  startButton.disabled = !agreed;
  agreeMessage.textContent = agreed 
    ? "문제 해결을 시작할 수 있습니다." 
    : "문제 해결을 시작하려면 확인이 필요합니다."

  if (agreed) {
    agreeMessage.classList.add("is-ready");
  } else {
    agreeMessage.classList.remove("is-ready");
  }
}

agreeCheck.addEventListener("change", handleAgreeChange)

//탭 기능
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach(function(tab) {
  tab.addEventListener("click", function() {

    tabs.forEach(function(item) {
      item.classList.remove("tab-is-active");
      item.setAttribute("aria-selected", "false");
    });

    panels.forEach(function(panel) {
      panel.hidden = true;
    });

    tab.classList.add("tab-is-active");
    tab.setAttribute("aria-selected", "true");

    const targetId = tab.dataset.target;
    document.querySelector("#" + targetId).hidden = false;
  });
});