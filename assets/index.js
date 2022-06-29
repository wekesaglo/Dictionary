const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  volume = wrapper.querySelector(".word i"),
  clearIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

const dataProcessing= (result, word)=>{
  if (result.title) {
    infoText.innerHTML= `The word: $(word) cannot be found here!`;
  } else{
    wrapper.classList.add("active");

    let definitions=result[0].meanings[0].definitions[0];
    phonetics=`Pronounced as: ${result[0].phonetics[0].text}`;
  

    document.querySelector(".word p").innerText=result[0].word;
    document.querySelector(".word span").innerText=phonetics;
    document.querySelector(".meaning span").innerText=definitions.definition;
    document.querySelector(".example span").innerText=definitions.example ?? `No example here.`;
    document.querySelector(".synonym span").innerText=definitions.synonym ?? `No synonym here.`;
  }
}
 
const queryAPI = word => {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML=`<span>Looking for the meaning of: ${word}</span>)`;
  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(res => dataProcessing(res.data, word))
  .catch(err=>console.log(err) );
}
 
searchInput.addEventListener("keyup",(e)=>{
  if(e.key=== "Enter" && e.target.value){
    queryAPI(e.target.value)
  }
})

clearIcon.addEventListener("click", ()=>{
  searchInput.value="";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.style.color="#9A9A9A";
  infoText.innerHTML=`Type any existing word and press wnter to get meaning, example, synonyms, etc. `;
})






