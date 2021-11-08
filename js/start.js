//alert('테스트!');
const main = document.getElementById('main');
const qna = document.getElementById('qna');
const result = document.getElementById('result'); //결과 페이지
const resultName = document.querySelector('.resultname');
const endPoint = qnaList.length; //질문의 개수 12
const select = []; // 빈 배열 만들기

function calResult(){
  var pointArray = [ //쥐,소,호랑이,토끼,용,뱀,말,양,원숭이,닭,개,돼지
    { name: 'mouse', value: 0, key: 0 },
    { name: 'cow', value: 0, key: 1 },
    { name: 'tiger', value: 0, key: 2 },
    { name: 'rabbit', value: 0, key: 3 },
    { name: 'dragon', value: 0, key: 4 },
    { name: 'snake', value: 0, key: 5 },
    { name: 'horse', value: 0, key: 6 },
    { name: 'sheep', value: 0, key: 7 },
    { name: 'monkey', value: 0, key: 8 },
    { name: 'chick', value: 0, key: 9 },
    { name: 'dog', value: 0, key: 10 },
    { name: 'pig', value: 0, key: 11 },
  ];
  // 문제의 갯수만큼 반복을 한다.
  for(let i = 0; i < endPoint; i++){
    let target = qnaList[i].a[select[i]]; //타겟은 선택한 답변의 객체이다.(answer: , type: )
    //console.log(target.type);
    for(let j = 0; j < target.type.length; j++){
      //답변의 여러개의 타입중 하나씩 반복
      //console.log(target.type[j]);
      for(let k = 0; k < pointArray.length; k++){
        if(pointArray[k].name === target.type[j]){
          pointArray[k].value++; //더하기 1
          break;                 //12개의 동물중 하나가 맞으면 반복끝
        }
      }
    }
  }
  //배열 pointArray를 sort메소드 사용해서 순서대로 sorting한다.
  let resultArray = pointArray.sort((a, b) => a.value - b.value );
  console.log(pointArray);
  return resultArray[11].key; //맨 밑에 있는 객체가 가장 큰 값
}

function setResult(){
  let key = calResult(); //12개의 동물중 순서대로의 인덱스 번호
  // 결과 타입의 동물이름
  resultName.textContent = infoList[key].name;
  // 결과 타입의 이미지
  var resultImg = document.createElement('img'); //img 태그 생성
  resultImg.src = 'img/image-' + key + '.png'; //이미지 주소 입력
  resultImg.classList.add('img-fluid');        //클래스 추가 (가로 100%)

  const imgDiv = document.getElementById('resultImg'); //이미지가 들어갈 부모태그
  imgDiv.appendChild(resultImg); //결과이미지를 부모태그에 달기
  //결과 타입의 설명
  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.textContent = infoList[key].desc;
}

//메인을 안보이게 하고 qna를 보이게
function begin(){
  // 애니메이션 사리지는 효과 1초
  main.style.animation = "fadeOut 1s";
  setTimeout(function(){
    qna.style.animation = "fadeIn 1s";   
  },450)
  // 0.9초 뒤에 화면에 안보이도록
  setTimeout(function(){
    main.style.display = "none";
    qna.style.display = "block";
  },900);
}
// 결과 페이지를 보이게한다
function goResult() {
  qna.style.animation = "fadeOut 1s";
  setTimeout(function(){
    result.style.animation = "fadeIn 1s";   
  },450)

  setTimeout(function(){
    qna.style.display = "none";
    result.style.display = "block";
  },900);
  // 결과 타입을 화면에 출력(이름, 설명, 이미지 등)
  setResult();
}

function goNext(qIdx){
  if(qIdx == endPoint){
    // 결과 페이지로 가고 아래 코드들은 실행안되도록 리턴
    goResult();
    return;
  }
  var q = document.querySelector('.qBox');
  q.textContent = qnaList[qIdx].q; //질문 입력
  // addAnswer(qnaList[index].a[0].answer);
  // addAnswer(qnaList[index].a[1].answer);
  // addAnswer(qnaList[index].a[2].answer);
  // 답변의 갯수만큼 반복 a는 배열
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  // 상태바 길이 조절
  let status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}
function addAnswer(answerText, qIdx, i) {
  // 답변을 버튼 태그로 만든다.
  var a = document.querySelector('.answerBox');
  var button = document.createElement('button'); //버튼 태그를 만든다.
  a.appendChild(button);
  button.textContent = answerText;
  button.className = "answerList my-3 py-3 mx-auto"; //클래스를 한꺼번에 입력
  button.classList.add('fadeIn'); //새로 만든 버튼에 나타나는 효과
  // 답변 버튼에 이벤트 리스너 달기 (이벤트 객체)
  button.addEventListener('click',function(e){
    select.push(i); //빈배열 select에 선택한답변의 0,1,2 번호를 넣는다.
    //console.log(e.target);
    //e.target.style.display = 'none';
    // 클릭한 태그의 부모태그에서 모든 하위태그들을 선택하여 전부 제거
    sleep(500); //버튼을 누르면 삭제하기전에 0.5초 대기
    e.target.parentNode.querySelectorAll('*').forEach(n=>n.remove());
    goNext(++qIdx)
  });
}

function sleep(ms){
  const wakeUpTime = Date.now() + ms;
  while(Date.now() < wakeUpTime){}
}

// 질문 및 답변의 번호
let qIdx = 0;
goNext(qIdx);