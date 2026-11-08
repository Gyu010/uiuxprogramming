
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
  const problemType = document.querySelector("#problem-type");

  const typeError = document.querySelector("#typeError");
  const problemError = document.querySelector("#problemError");

  const missingType = problemType.value === "";
  const missingProblem = problemText === "";

  typeError.hidden = !missingType;
  problemError.hidden = !missingProblem;

  problemType.setAttribute("aria-invalid", String(missingType));
  problemInput.setAttribute("aria-invalid", String(missingProblem));

  if (missingType || missingProblem) {
    subscribeMessage.textContent =
      "필수 항목을 입력하거나 선택해주세요.";

    if (missingType) {
      problemType.focus();
    } else {
      problemInput.focus();
    }

    return;
  }

  isSubcribed = true;
  submitCount += 1;

  document.querySelector("#reviewNickname").textContent =
    nicknameInput.value.trim() || "미입력";

  document.querySelector("#reviewType").textContent =
    problemType.selectedOptions[0].textContent;

  document.querySelector("#reviewProblem").textContent =
    problemText;

  subscribeMessage.textContent = "입력 내용을 확인해주세요.";

  
  const solutionGuide = {
    internet: "와이파이 연결을 확인하고 공유기를 재시작해 보세요.",
    program: "프로그램을 종료한 뒤 다시 실행해 보세요.",
    performance: "사용하지 않는 프로그램을 종료하고 재시작해 보세요.",
    hardware: "케이블 연결과 USB 포트를 확인해 보세요."
  };

  const solutionList = document.querySelector("#solutionList");
  const li = document.createElement("li");

  li.textContent = solutionGuide[problemType.value];
  solutionList.replaceChildren(li);

  showStep("review");
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

const stepNames = ["start", "input", "review", "complete"];

let currentStep = "start";

function showStep(nextStep) {
  currentStep = nextStep;

  stepNames.forEach(function(step, index) {

    const stage = document.querySelector("#flow-" + step);

    stage.hidden = step !== nextStep;

    const progress = document.querySelector(
      '[data-progress-step="' + step + '"]'
    );

    progress.classList.toggle(
      "is-current",
      step === nextStep
    );

    progress.classList.toggle(
      "is-done",
      index < stepNames.indexOf(nextStep)
    );

    if (step === nextStep) {
      progress.setAttribute("aria-current", "step");
    } else {
      progress.removeAttribute("aria-current");
    }
  });

  document.querySelector("#flow-" + nextStep + " h3").focus();
}

startButton.addEventListener("click", function() {

  if (!agreeCheck.checked) {
    agreeMessage.textContent =
      "시작하려면 체크박스를 선택해주세요.";
    return;
  }

  showStep("input");
});


const inputBackButton = document.querySelector("#inputBackButton");
const reviewBackButton = document.querySelector("#reviewBackButton");

inputBackButton.addEventListener("click", function() {
  showStep("start");
});

reviewBackButton.addEventListener("click", function() {
  showStep("input");
});


const completeButton = document.querySelector("#completeButton");

completeButton.addEventListener("click", function() {
  document.querySelector("#completeMessage").textContent =
    "문제 해결 안내 확인을 완료했습니다.";

  showStep("complete");
});

const restartButton = document.querySelector("#restartButton");

restartButton.addEventListener("click", function() {

  subscribeform.reset();

  nicknameInput.value = "";
  handleNicknameInput();

  agreeCheck.checked = false;
  handleAgreeChange();

  document.querySelector("#typeError").hidden = true;
  document.querySelector("#problemError").hidden = true;

  document.querySelector("#problem-type").removeAttribute("aria-invalid");
  problemInput.removeAttribute("aria-invalid");

  subscribeMessage.textContent =
    "문제 유형과 증상을 입력한 뒤 확인해주세요.";

  document.querySelector("#reviewNickname").textContent = "";
  document.querySelector("#reviewType").textContent = "";
  document.querySelector("#reviewProblem").textContent = "";
  document.querySelector("#solutionList").replaceChildren();
  document.querySelector("#completeMessage").textContent = "";

  isSubcribed = false;
  submitCount = 0;

  showStep("start");
});



const resultStatus = document.querySelector("#resultStatus");
const saveResultButton = document.querySelector("#saveResultButton");
const saveResultMessage = document.querySelector("#saveResultMessage");
const viewHistoryButton = document.querySelector("#viewHistoryButton");

const historyList = document.querySelector("#historyList");
const historyEmpty = document.querySelector("#historyEmpty");

const historyKey = "pcHelpGuideHistory";

const resultForm = document.querySelector("#resultForm");
const remainingWrap = document.querySelector("#remainingWrap");
const remainingProblem = document.querySelector("#remainingProblem");
const remainingCount = document.querySelector("#remainingCount");
const remainingProblemError = document.querySelector("#remainingProblemError");

let isSubmitting = false;
let savedHistory = [];

try {
  const stored = JSON.parse(localStorage.getItem(historyKey) || "[]");

  if (Array.isArray(stored)) {
    savedHistory = stored;
  }
} catch (error) {
  savedHistory = [];
}

function showHistory() {
  historyList.replaceChildren();

  historyEmpty.hidden = savedHistory.length > 0;

  savedHistory.forEach(function(record, index) {
    const li = document.createElement("li");
    const title = document.createElement("strong");
    const detail = document.createElement("p");

    title.textContent = record.type + " - " + record.status;

    detail.textContent =
        "사용자: " + (record.nickname || "미입력") +
        " / 증상: " + record.problem +
        " / 날짜: " + record.date;
    
    if (record.remainingProblem) {
      detail.textContent +=
        " / 남은 증상: " + record.remainingProblem;
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "기록 삭제";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function() {
      const confirmed = confirm("이 기록을 삭제하시겠습니까?");

      if (!confirmed) {
        return;
      }

      const updatedHistory = savedHistory.filter(function(item, i) {
        return i !== index;
      });

      try {
        localStorage.setItem(
          historyKey,
          JSON.stringify(updatedHistory)
        );

        savedHistory = updatedHistory;
        showHistory();
      } catch (error) {
        alert("기록을 삭제하지 못했습니다.");
      }
    });

    li.appendChild(title);
    li.appendChild(detail);
    li.appendChild(deleteButton);

    historyList.appendChild(li);
  });
}

resultStatus.addEventListener("change", function() {

  resultStatus.removeAttribute("aria-invalid");
  saveResultMessage.textContent = "";

  const isUnresolved = resultStatus.value === "미해결";

  remainingWrap.hidden = !isUnresolved;
  remainingProblem.disabled = !isUnresolved;

  if (!isUnresolved) {
    remainingProblem.value = "";
    remainingCount.textContent = "0 / 200자 (최소 5자)";
    remainingProblemError.hidden = true;
    remainingProblem.removeAttribute("aria-invalid");
  }
});

remainingProblem.addEventListener("input", function() {

  const length = remainingProblem.value.trim().length;

  remainingCount.textContent =
    length + " / 200자 (최소 5자)";

  if (length >= 5) {
    remainingProblemError.hidden = true;
    remainingProblem.removeAttribute("aria-invalid");
    saveResultMessage.textContent = "";
  }
});

restartButton.addEventListener("click", function() {

  resultForm.reset();

  resultStatus.disabled = false;
  resultStatus.removeAttribute("aria-invalid");

  remainingWrap.hidden = true;
  remainingProblem.disabled = true;
  remainingProblem.value = "";
  remainingProblem.removeAttribute("aria-invalid");
  remainingProblemError.hidden = true;

  remainingCount.textContent = "0 / 200자 (최소 5자)";

  saveResultMessage.textContent = "";
  saveResultButton.disabled = false;
  saveResultButton.textContent = "해결 결과 저장";

  isSubmitting = false;
});

viewHistoryButton.addEventListener("click", function() {
  document.querySelector("#tab-feedback").click();
  document.querySelector("#features").scrollIntoView({
    behavior: "smooth"
  });
});


resultForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (isSubmitting || saveResultButton.disabled) {
    return;
  }

  const status = resultStatus.value;
  const remainingText = remainingProblem.value.trim();

  if (status === "") {
    saveResultMessage.textContent = "해결 여부를 선택해주세요.";
    resultStatus.setAttribute("aria-invalid", "true");
    resultStatus.focus();
    return;
  }

  if (status === "미해결" && remainingText.length < 5) {
    saveResultMessage.textContent = "남은 증상을 5자 이상 입력해주세요.";
    remainingProblemError.hidden = false;
    remainingProblem.setAttribute("aria-invalid", "true");
    remainingProblem.focus();
    return;
  }

  isSubmitting = true;
  saveResultButton.disabled = true;
  saveResultButton.textContent = "저장 중...";

  const record = {
    nickname: nicknameInput.value.trim() || "미입력",
    type: document.querySelector("#reviewType").textContent,
    problem: document.querySelector("#reviewProblem").textContent,
    status: status,
    remainingProblem: status === "미해결" ? remainingText : "",
    date: new Date().toLocaleString("ko-KR")
  };

  const newHistory = [record, ...savedHistory];

  try {
    localStorage.setItem(historyKey, JSON.stringify(newHistory));

    savedHistory = newHistory;
    showHistory();

    saveResultMessage.textContent =
      status === "해결됨"
        ? "해결 완료 기록을 저장했습니다."
        : "미해결 증상과 결과를 저장했습니다.";

    resultStatus.disabled = true;
    remainingProblem.disabled = true;
    saveResultButton.textContent = "저장 완료";

  } catch (error) {
    saveResultMessage.textContent =
      "저장에 실패했습니다. 다시 시도해주세요.";

    saveResultButton.disabled = false;
    saveResultButton.textContent = "해결 결과 저장";
  } finally {
    isSubmitting = false;
  }
});

showHistory();

