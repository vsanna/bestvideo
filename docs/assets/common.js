// NOTE: when the parsers browsers have reach here,
// #cards, #vidcount are already parsed and mounted on document tree.
// so we don't have to use onload event or something like that.
function initPageGeneration(year, streamer, data) {
  document.addEventListener("DOMContentLoaded", (_ev) => {
    generatePage(data);
    showEasterEgg(year, streamer);
  });
}

// codes below are private ones

/*
generatePage requires #cards and #vidcount html elements.
*/
function generatePage(data) {
  // generate and append card elements into #cards
  const cards = document.getElementById("cards");
  data.forEach((record) => {
    let title = record.title
    let imageUrl = record.image
    let videoUrl = record.video

    const card = createCardComponent(title, imageUrl, videoUrl);
    cards.appendChild(card);
  });

  // append blank card as spacer
  if (data.length % 3 === 2) {
    const card = createDummyCardComponent();
    cards.appendChild(card);
  }

  // insert textContent in #vidcount
  const counter = document.getElementById("vidcount");
  counter.textContent = data.length;
}

function showEasterEgg(year, streamer) {
  if (streamer === "pokopea") {
    showEasterEggForPokopea(year);
  }
  if (streamer === "emimiya") {
    showEasterEggForEmimiya(year);
  }
}

function showEasterEggForPokopea(year) {
  // Easter egg
  const peanutsKunColor = "#c39e15";
  const ponpokoSanColor = "#79a755";

  console.log(
    "Hello %cSatonotami%c and %cOtomonuts%c! 😎",
    `color: ${ponpokoSanColor}; font-weight: bold; font-size: 18px`,
    "",
    `color: ${peanutsKunColor}; font-weight: bold; font-size: 18px`,
    ""
  );
  console.log(
    `Please enjoy happy year-end and pokopea best vid award in ${year}!`
  );
  console.log(
    "%cPonpoko channel%c is: \n👉 https://www.youtube.com/channel/UC1EB8moGYdkoZQfWHjh7Ivw/featured",
    `color: ${ponpokoSanColor}; font-weight: bold; font-size: 18px`,
    ""
  );
  console.log(
    "%cPeanuts kun channel%c is: \n👉 https://www.youtube.com/channel/UCmgWMQkenFc72QnYkdxdoKA",
    `color: ${peanutsKunColor}; font-weight: bold; font-size: 18px`,
    ""
  );
  console.log("...");
  console.log(".......");
  console.log("..........");
  console.log(
    "...AND! Now you reached here, it means you must be a good developer!\n" +
      "I always welcome your contributions(any ideas/PRs are welcome!) to https://github.com/vsanna/bestvideo\n" +
      "I promise to make contributors page and list your name in it~ Thanks!"
  );
}

function showEasterEggForEmimiya(year) {
  // Easter egg
  const emimiyaKunColor = "#44a73b";
  const asakuraSanColor = "#b7e2f7";

  console.log(
    "Hello %cYozakurasta%c / %c夜桜スタ%c! 😎",
    `color: ${emimiyaKunColor}; font-weight: bold; font-size: 18px`,
    "",
    `color: ${asakuraSanColor}; font-weight: bold; font-size: 18px`,
    ""
  );
  console.log(
    `Please enjoy happy year-end and pokopea best vid award in ${year}!`
  );
  console.log(
    "%c笑々夜けいちゃんねる%c is: \n👉 https://www.youtube.com/@ookamitokingyo",
    `color: ${emimiyaKunColor}; font-weight: bold; font-size: 18px`,
    ""
  );
  console.log("...");
  console.log(".......");
  console.log("..........");
  console.log(
    "...AND! Now you reached here, it means you must be a good developer!\n" +
      "I always welcome your contributions(any ideas/PRs are welcome!) to https://github.com/vsanna/bestvideo\n" +
      "I promise to make contributors page and list your name in it~ Thanks!"
  );
}

/*
        createCardComponent generate anchor element which is a card containing one video's title/url/thumbnail in it.
        the element looks like below:
            <a class="card" href="https://www.youtube.com/watch?v=JE7NILL0aCk" target="_blank">
                <div class="img" background="https://i.ytimg.com/vi/JE7NILL0aCk/hqdefault.jp"></div>
                <span class="title">【デブ活】500円でより多くのカロリーを摂取しろ！！コスパ飯選手権！</span>
            </a>
        @param {string} title
        @param {string} thumbnailUrl
        @param {string} videoUrl
        @return {HTMLAnchorElement} card
        */
function createCardComponent(title, thumbnailUrl, videoUrl) {
  const card = document.createElement("div");
  card.classList.add("card");

  const aTag = document.createElement("a");
  aTag.href = videoUrl;
  aTag.target = "_blank";

  const img = document.createElement("div");
  img.classList.add("img");
  img.style.background = `url(${thumbnailUrl}) center/cover`;

  const videoLaunchIcon = document.createElement("i");
  videoLaunchIcon.classList.add("material-icons");
  videoLaunchIcon.textContent = "launch";
  img.appendChild(videoLaunchIcon)

  aTag.appendChild(img);

  const vidTitle = document.createElement("span");
  vidTitle.classList.add("title");
  vidTitle.textContent = title;

  const vidTitleClipboardIcon = document.createElement("i");
  vidTitleClipboardIcon.classList.add("material-icons");
  vidTitleClipboardIcon.textContent = "content_copy";

  vidTitle.appendChild(vidTitleClipboardIcon);
  vidTitle.onclick = function(){
    if(navigator.clipboard){
      navigator.clipboard.writeText(title);

      const notice = document.createElement("div");
      notice.classList.add("notice");
      notice.textContent="タイトルをコピーしました！";

      card.appendChild(notice);

      setTimeout(()=>{
        notice.classList.add("fade");
        setTimeout(()=>{
          notice.remove();
        },500);
      },500);
    }
  }

  card.appendChild(aTag);
  card.appendChild(vidTitle);

  return card;
}

function createDummyCardComponent() {
  const card = document.createElement("div");
  card.classList.add("card", "dummy");

  const vidTitle = document.createElement("span");
  vidTitle.classList.add("title");
  card.appendChild(vidTitle);

  return card;
}
