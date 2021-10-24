const footer = document.querySelector("footer");
const html = document.documentElement;

const debounce = (fn) => {
  let frame;
  return (...params) => {
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      fn(...params);
    });
  }
};
  
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

document.addEventListener('scroll', debounce(storeScroll), { passive: true });

storeScroll();

const storeFooterVisible = () => {
  const footerRect = footer.getBoundingClientRect();
  const visible = ( !!footerRect
    && footerRect.bottom > 0
    && footerRect.right > 0
    && footerRect.top < html.clientHeight
    && footerRect.left < html.clientWidth
  );
  document.documentElement.dataset.footer = visible;
}

document.addEventListener('scroll', debounce(storeFooterVisible), { passive: true });

function makeTimer() {
	var endTime = new Date("24 October 2021 10:00:00 GMT+01:00");
	endTime = (Date.parse(endTime) / 1000);

	var now = new Date();
	now = (Date.parse(now) / 1000);

	var timeLeft = endTime - now;

	var days = Math.floor(timeLeft / 86400);
	var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
	var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
	var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

	if (hours < "10") { hours = "0" + hours; }
	if (minutes < "10") { minutes = "0" + minutes; }
	if (seconds < "10") { seconds = "0" + seconds; }

	$("#days").html(days + "<span>Days</span>");
	$("#hours").html(hours + "<span>Hours</span>");
	$("#minutes").html(minutes + "<span>Minutes</span>");
	$("#seconds").html(seconds + "<span>Seconds</span>");

	if (days < 0) {
		$("#timer").hide(0);
		$('#vote-message').html("<strong>It's time to make your voice heard.</strong><br/>Voting takes just five minutes and your vote can make such a difference. Use your voice to vote Viljo #1 for LGBT+ Officer and #WorkingForYoUWE for NUS!");
		$(".vote-button").show();
    }

}

setInterval(function () { makeTimer(); }, 1000);