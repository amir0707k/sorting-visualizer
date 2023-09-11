const numOfBars = document.getElementById("bars-slider");
const speed = document.getElementById("speed-slider");
const barsContainer = document.getElementById("bars");
const newArrayButton = document.getElementById("new-array");
const bubbleSortButton = document.getElementById("bubble-sort");
const selectionSortButton = document.getElementById("selection-sort");
const insertionSortButton = document.getElementById("insertion-sort");
let isSorted = false;
let array = [];
let timer = 400;
let audioContext = null;
initializeArray(10);

newArrayButton.addEventListener("click", () => {
  array = [];
  barsContainer.innerHTML = "";
  initializeArray(numOfBars.value);
  isSorted = false;
});

numOfBars.addEventListener("change", () => {
  array = [];
  barsContainer.innerHTML = "";
  initializeArray(numOfBars.value);
  isSorted = false;
});

bubbleSortButton.addEventListener("click", () => {
  if (!isSorted) {
    disableAllInputs();
    const moves = bubbleSort();
    animate(moves);
    isSorted = true;
  } else {
    alreadySorted();
  }
});

selectionSortButton.addEventListener("click", () => {
  if (!isSorted) {
    const moves = selectionSort();
    isSorted = true;
  } else {
    alreadySorted();
  }
});

insertionSortButton.addEventListener("click", () => {
  if (!isSorted) {
    const moves = insertionSort();
    animate(moves);
    isSorted = true;
  } else {
    alreadySorted();
  }
});

function disableAllInputs() {
  numOfBars.disabled = true;
}
function enableAllInputs() {
  numOfBars.disabled = false;
}

speed.addEventListener("change", () => {
  console.log(speed.value);
  if (speed.value == 5) {
    timer = 40;
  } else if (speed.value == 4) {
    timer = 200;
  } else if (speed.value == 3) {
    timer = 400;
  } else if (speed.value == 2) {
    timer = 600;
  } else if (speed.value == 1) {
    timer = 800;
  }
  console.log(timer);
});

function animate(moves) {
  if (moves.length === 0) {
    enableAllInputs();
    animateBars();
    return;
  }
  let move = moves.shift();
  let [i,j] = move.indices;
  if(move.type == "swap"){
    [array[j], array[i]] = [array[i], array[j]];
  }
  
  playSound(200 + array[i] * 500)
  playSound(200 + array[j] * 500);
  animateBars(move);

  setTimeout(() => {
    animate(moves);
  }, timer);
  console.log(timer);
}

function playSound(frequency){
  if(audioContext == null){
    audioContext = new (
      AudioContext || webkitAudioContext || window.webkitAudioContext
    )();
  }

  const duration = 0.1;
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  const volume = audioContext.createGain();
  volume.gain.value = 0.05;
  oscillator.connect(volume);
  volume.connect(audioContext.destination)
  oscillator.start();
  oscillator.stop(audioContext.currentTime+duration)

}

function animateBars(move) {
  barsContainer.innerHTML = "";
  const n = array.length;

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    const barsWidth = 100 / n + "%";
    bar.style.width = barsWidth;

    bar.style.backgroundColor = "black";
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "yellow";
    }
    barsContainer.appendChild(bar);
  }
}
function alreadySorted() {
  alert("Already Sorted!!! Please generate a new Array");
}

function initializeArray(value) {
  const n = value;
  array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  generateBars();
}

function generateBars() {
  barsContainer.innerHTML = "";
  const n = array.length;

  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    const barsWidth = 100 / n + "%";
    bar.style.width = barsWidth;
    bar.setAttribute("id", i);
    console.log(bar);
    bar.style.backgroundColor = "black";
    barsContainer.appendChild(bar);
  }
}

function bubbleSort() {
  const duplicate = [...array];
  const moves = [];
  for (let i = 0; i < duplicate.length; i++) {
    for (let j = 0; j < duplicate.length - i - 1; j++) {
      moves.push({ indices: [j, j + 1] , type:"comparison"});
      if (duplicate[j] > duplicate[j + 1]) {
        moves.push({ indices: [j, j + 1], type:"swap" });
        let temp = duplicate[j];
        duplicate[j] = duplicate[j + 1];
        duplicate[j + 1] = temp;
      }
    }
  }
  return moves;
}

function selectionSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
}

function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let curr = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > curr) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = curr;
  }
}
