/*   Config   */
const config = {
  advanced: false,
  showAdvancedMessage: "Show Settings",
  hideAdvancedMessage: "Hide Settings",
  disableVoteSubmission: false,
  
  showAdvancedMessage: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><rect fill="none" height="24" width="24"/><path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z"/></svg>',
  hideAdvancedMessage: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#f44"><rect fill="none" height="24" width="24"/><path d="M3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5z M16.3,16.29L16.3,16.29 c-0.39,0.39-1.02,0.39-1.41,0L12,13.41l-2.89,2.89c-0.39,0.39-1.02,0.39-1.41,0l0,0c-0.39-0.39-0.39-1.02,0-1.41L10.59,12L7.7,9.11 c-0.39-0.39-0.39-1.02,0-1.41l0,0c0.39-0.39,1.02-0.39,1.41,0L12,10.59l2.89-2.88c0.39-0.39,1.02-0.39,1.41,0l0,0 c0.39,0.39,0.39,1.02,0,1.41L13.41,12l2.89,2.88C16.68,15.27,16.68,15.91,16.3,16.29z"/></svg>',

  links: {
    website: "https://returnyoutubedislike.com",
    github: "https://github.com/Anarios/return-youtube-dislike",
    discord: "https://discord.gg/mYnESY4Md5",
    donate: "https://returnyoutubedislike.com/donate",
    faq: "https://returnyoutubedislike.com/faq",
  },
};

/*   Links   */
document.getElementById("link_website").addEventListener("click", () => {
  chrome.tabs.create({ url: config.links.website });
});

document.getElementById("link_github").addEventListener("click", () => {
  chrome.tabs.create({ url: config.links.github });
});

document.getElementById("link_discord").addEventListener("click", () => {
  chrome.tabs.create({ url: config.links.discord });
});

document.getElementById("link_faq").addEventListener("click", () => {
  chrome.tabs.create({ url: config.links.faq });
});

document.getElementById("link_donate").addEventListener("click", () => {
  chrome.tabs.create({ url: config.links.donate });
});

document
  .getElementById("disable_vote_submission")
  .addEventListener("click", (ev) => {
    chrome.storage.sync.set({ disableVoteSubmission: ev.target.checked });
  });

/*   Advanced Toggle   */
const advancedToggle = document.getElementById("advancedToggle");
advancedToggle.addEventListener("click", () => {
  const adv = document.getElementById("advancedSettings");
  if (config.advanced) {
    adv.style.transform = "scale(1.1)";
    adv.style.pointerEvents = "none";
    adv.style.opacity = "0";
    advancedToggle.innerHTML = config.showAdvancedMessage;
    config.advanced = false;
  } else {
    adv.style.transform = "scale(1)";
    adv.style.pointerEvents = "auto";
    adv.style.opacity = "1";
    advancedToggle.innerHTML = config.hideAdvancedMessage;
    config.advanced = true;
  }
});

initConfig();

function initConfig() {
  initializeDisableVoteSubmission();
  initializeVersionNumber();
}

function initializeVersionNumber() {
  const version = chrome.runtime.getManifest().version;
  document.getElementById('ext-version').innerHTML = 'v' + version;
}

function initializeDisableVoteSubmission() {
  chrome.storage.sync.get(["disableVoteSubmission"], (res) => {
    handleDisableVoteSubmissionChangeEvent(res.disableVoteSubmission);
  });
}

chrome.storage.onChanged.addListener(storageChangeHandler);

function storageChangeHandler(changes, area) {
  if (changes.disableVoteSubmission !== undefined) {
    handleDisableVoteSubmissionChangeEvent(
      changes.disableVoteSubmission.newValue
    );
  }
}

function handleDisableVoteSubmissionChangeEvent(value) {
  config.disableVoteSubmission = value;
  document.getElementById("disable_vote_submission").checked = value;
}

(async function getStatus() {
  let status = document.getElementById("status");
  let serverStatus = document.getElementById("server-status");
  let resp = await fetch(
    "https://returnyoutubedislikeapi.com/votes?videoId=YbJOTdZBX1g"
  );
  let result = await resp.status;
  if (result === 200) {
    status.innerText = "Online";
    status.style.color = "green";
    serverStatus.style.filter =
      "invert(58%) sepia(81%) saturate(2618%) hue-rotate(81deg) brightness(119%) contrast(129%)";
  } else {
    status.innerText = "Offline";
    status.style.color = "red";
    serverStatus.style.filter =
      "invert(11%) sepia(100%) saturate(6449%) hue-rotate(3deg) brightness(116%) contrast(115%)";
  }
})();

/* popup-script.js
document.querySelector('#login')
.addEventListener('click', function () {
  chrome.runtime.sendMessage({ message: 'get_auth_token' });
});


document.querySelector("#log_off").addEventListener("click", function () {
  chrome.runtime.sendMessage({ message: "log_off" });
});
*/
