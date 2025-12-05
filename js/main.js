const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4Pyli5uQOxlN4eznR0pCfziG_OAH6yIyf0dLTwmSXkhGfYM5mrDYf-AhXLL1lUDGc/exec";

async function submitEmail() {
    const input = document.getElementById("email");
    const btn = document.getElementById("btn");
    const status = document.getElementById("status");
    const email = (input.value || "").trim();

    // 선택된 난이도 가져오기
    const difficultyRadio = document.querySelector('input[name="difficulty"]:checked');
    const difficulty = difficultyRadio ? difficultyRadio.value : null;

    status.textContent = "";
    status.className = "status";

    // 난이도 선택 여부 확인
    if (!difficulty) {
        status.textContent = "난이도를 선택해주세요.";
        status.classList.add("err");
        return;
    }

    if (!email || !email.includes("@")) {
        status.textContent = "유효한 이메일을 입력하세요.";
        status.classList.add("err");
        input.focus();
        return;
    }

    btn.disabled = true;

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, difficulty })
        });

        status.textContent = `구독이 완료되었습니다. (난이도: ${difficulty})`;
        status.classList.add("ok");
        input.value = "";
    } catch (e) {
        status.textContent = "요청에 실패했습니다. 네트워크 상태를 확인하세요.";
        status.classList.add("err");
    } finally {
        btn.disabled = false;
    }
}
