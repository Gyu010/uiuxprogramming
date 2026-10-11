
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
