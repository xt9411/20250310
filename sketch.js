let table;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let radio;
let submitButton;
let nextButton;
let resultP;
let questionP;

function preload() {
  // 確保 questions.csv 檔案存在於此路徑
  table = loadTable('question.csv', 'csv', 'header', onLoad, onError);
}

function onLoad() {
  console.log("Table loaded successfully");
}

function onError(err) {
  console.error("Failed to load table: ", err);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#dad7cd");

  // 顯示題目
  questionP = createP('');
  questionP.position(windowWidth / 2 - 100, windowHeight / 2 - 150);

  // 建立radio物件
  radio = createRadio();
  radio.position(windowWidth / 2 - 50, windowHeight / 2 - 50);

  // 建立送出按鈕
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - submitButton.width / 2, windowHeight / 2 + 50);
  submitButton.mousePressed(submitAnswer);

  // 建立下一題按鈕
  nextButton = createButton('下一題');
  nextButton.position(windowWidth / 2 - nextButton.width / 2, windowHeight / 2 + 100);
  nextButton.mousePressed(nextQuestion);
  nextButton.hide(); // 初始隱藏

  // 顯示結果的段落
  resultP = createP('');
  resultP.position(windowWidth / 2 - 50, windowHeight / 2 + 150);

  loadQuestion();
}

function draw() {
  // 畫圖
  background("#dad7cd"); // 背景顏色
}

function loadQuestion() {
  if (currentQuestionIndex < table.getRowCount()) {
    let row = table.getRow(currentQuestionIndex);
    questionP.html(row.get('question'));
    radio.option('1', row.get('option1'));
    radio.option('2', row.get('option2'));
    radio.option('3', row.get('option3'));
    radio.option('4', row.get('option4'));
    radio.selected(null);
    nextButton.hide(); // 隱藏下一題按鈕
    submitButton.show(); // 顯示送出按鈕
  } else {
    questionP.html('測驗結束');
    radio.hide();
    submitButton.hide();
    nextButton.hide();
    resultP.html(`答對題數: ${correctCount}, 答錯題數: ${incorrectCount}`);
  }
}

function submitAnswer() {
  let row = table.getRow(currentQuestionIndex);
  let answer = radio.value();
  if (answer === row.get('answer')) {
    correctCount++;
    resultP.html("答對了");
  } else {
    incorrectCount++;
    resultP.html("答錯了");
  }
  submitButton.hide(); // 隱藏送出按鈕
  nextButton.show(); // 顯示下一題按鈕
}

function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}
