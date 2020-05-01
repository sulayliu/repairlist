function curentTime() { 
  const now = new Date();
  let year = now.getFullYear(); 
  let month = now.getMonth() + 1;     
  let day = now.getDate();
  let hh = now.getHours();
  let mm = now.getMinutes();
  
  if(month < 10) {
    month = "0" + month;
  };
    
  if(day < 10) {
    day = "0" + day;
  };

  if(hh < 10) {
    hh = "0" + hh;
  };

  if(mm < 10) {
    mm = "0" + mm;
  };

  return year + "-" + month + "-" + day + " " + hh + ":" + mm;
} 

class Repair{
  constructor(description) {
    this.description = description + `<br>` + curentTime();
    this.id = idNum++;
    this.completed = false;
  }
};

class RepairList{
  constructor() {
    this.repairs = [];
  }

  addRepair(description) {
    this.repairs.push(new Repair(description));
    this.redraw();
  };

  deleteRepair(id) {
    // const repairIndex = this.repairs.findIndex(item => item.id === id);
    // this.repairs.splice(repairIndex, 1);
    this.repairs = this.repairs.filter(item => item.id !== id);
    this.redraw();
  };

  // Combine the methods of markAsComplete(id) and unmarkAsComplete(id) together.
  toggleCompelete(id) {
    const repairIndex = this.repairs.findIndex(item => item.id === id);
    this.repairs[repairIndex].completed = !this.repairs[repairIndex].completed;
  };

  clearCompleted() {
    this.repairs = this.repairs.filter(repairItem => repairItem.completed === false);
    this.redraw();
  };

  redraw() {
    repairUl.innerHTML = "";
    let items = ``;
    this.repairs.forEach((repairItem) =>{
      let completedClass = repairItem.completed ? `completed` : ``;
      let checkedList = repairItem.completed ? `checked` : ``;

      items = `
      <li data-id="${repairItem.id}" class="${completedClass}">
      <div class="view">
      <input class="toggle" type="checkbox" ${checkedList}>
      <label>${repairItem.description}</label>
      <button class="destroy"></button>
      </div>
      </li>` + items;
    });

    repairUl.insertAdjacentHTML(`afterbegin`, items);
  }
}

const repairUl = document.querySelector(`.repair-list`);
const inputEle = document.querySelector(`input`);
const formEle = document.querySelector(`form`);
const footerEle = document.querySelector(`.footer`);
const repairList = new RepairList();
let idNum = 0;

// Get the input value, add it into the repair list.
// inputEle.addEventListener(`keydown`, function(event){
//   if(event.keyCode === 13) {
//     if (inputEle.value !== ``) {
//       repairList.addRepair(inputEle.value);
//       inputEle.value = ``;
//     };
//     event.preventDefault();
//   }
// });

formEle.addEventListener(`submit`, function(event){
  if(inputEle.value !== ``) {
      repairList.addRepair(inputEle.value);
  };
  inputEle.value = ``;
  event.preventDefault();
});

repairUl.addEventListener(`click`, function(event) {
  const repairLi = event.target.closest('li');
  const id = parseInt(repairLi.dataset.id);

  if(event.target.nodeName === `BUTTON`) {
    repairList.deleteRepair(id);
  } else if(event.target.nodeName === `INPUT`) {
    repairLi.classList.toggle(`completed`);
    repairList.toggleCompelete(id);
  };
});

// Clear the completed lists.
footerEle.addEventListener(`click`, function(event){
  if(event.target.nodeName === `BUTTON`) {
    repairList.clearCompleted();
  };
});