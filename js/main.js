const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyYSRnpJGip0JmTZaROOIqcsPPNKPjq51r1PYTySeo1gU7JnRDHAXqSxO5G_3BT9s2d/exec";

async function submitEmail() {
    const input = document.getElementById("email");
    const btn = document.getElementById("btn");
    const status = document.getElementById("status");
    const email = (input.value || "").trim();

    status.textContent = "";
    status.className = "status";

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
            body: JSON.stringify({ email })
        });

        status.textContent = "구독이 완료되었습니다.";
        status.classList.add("ok");
        input.value = "";
    } catch (e) {
        status.textContent = "요청에 실패했습니다. 네트워크 상태를 확인하세요.";
        status.classList.add("err");
    } finally {
        btn.disabled = false;
    }
}
