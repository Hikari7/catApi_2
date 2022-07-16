let generate_btn = document.querySelector(".generate_btn");
let animal_type = document.querySelector("#animal_type");
let num_facts = document.querySelector("#num_facts");

// Get Data from User
generate_btn.addEventListener("click", function () {
  let animal_value = animal_type.value.toLowerCase(); //animaltypeの入力された文字を取ってくる(ただし小文字限定！大文字にするとURL取れんくなる)
  if (parseInt(num_facts.value) > 500) {
    alert("MAX is 500");
  }

  function fetchFacts() {
    fetch(
      `https://cat-fact.herokuapp.com/facts/random?animal_type=${animal_value}&amount=1` //forループで回すからデフォルトを１にしておく
    )
      .then((response) => response.text())
      .then((data) => {
        let fact = JSON.parse(data).text; //JSON.pareを通さないとtext取れない
        console.log(fact);
        let para = document.createElement("p"); //表示用のpタグを作る
        para.classList.add("list-group-item");
        para.classList.add("text-dark");
        para.classList.add("p-3");
        let node = document.createTextNode(fact); //テキストを作る(pタグの子要素)
        para.appendChild(node);

        let facts = document.querySelector(".facts");
        facts.appendChild(para);
      })
      .catch((err) => console.log(err));
  }

  let btn = document.createElement("button");
  btn.innerHTML = "Clear";
  btn.classList.add("btn");
  btn.classList.add("btn-danger");
  btn.classList.add("clear");
  //↑ここまでで赤いclearボタンが出来上がり
  let head = document.querySelector(".head");
  head.appendChild(btn);

  const clear_btn = document.querySelector(".clear");
  clear_btn.addEventListener("click", function () {
    let facts = document.querySelector(".facts"); //factsが出てくるdivタグ
    facts.innerHTML = "";
    clear_btn.parentNode.removeChild(clear_btn); //clearボタンが消える
  });

  for (let i = 0; i < num_facts.value; i++) {
    fetchFacts();
  }
});
