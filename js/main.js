const milestonesData = JSON.parse(data).data;

//Load course milestones data
function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map((milestone) => {
      return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div onclick="markMilstone(this, ${
                milestone._id
              })" class="checkbox"><input type="checkbox" /></div>
              <div onclick="openMilestone(this, ${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules
                .map((module) => {
                  return `<div class="module border-b">
                <p>${module.name}</p>
                </div>`;
                })
                .join("")}
            </div>
          </div>`;
    })
    .join("")}`;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const parentPanel = milestoneElement.parentNode;
  const shownPanel = document.querySelector(".show");
  const activePanel = document.querySelector(".active");
  //classLists => add,remove,toggle & contains

  //remove previous active class if any other have
  if (!parentPanel.classList.contains("active") && activePanel) {
    activePanel.classList.remove("active");
  }
  //toogle active class
  parentPanel.classList.toggle("active");

  //remove current panel if any other have
  if (!currentPanel.classList.contains("show") && shownPanel) {
    shownPanel.classList.remove("show");
  }
  //toogle current panel
  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const milestoneTitle = document.querySelector(".title");
  const milestoneDescription = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  milestoneTitle.innerText = milestonesData[id].name;
  milestoneDescription.innerText = milestonesData[id].description;
}

//Listen for hero image load
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};

function markMilstone(checkbox, id) {
  const milestoneList = document.querySelector(".milestones");
  const doneList = document.querySelector(".doneList");
  const item = document.getElementById(id);
  const checkboxInput = checkbox.querySelector("input[type='checkbox']");

  if (checkboxInput.checked) {
    //mark as done
    milestoneList.removeChild(item);
    doneList.appendChild(item);
  } else {
    // //back to main list
    doneList.removeChild(item);
    milestoneList.appendChild(item);
  }
}

loadMilestones();
