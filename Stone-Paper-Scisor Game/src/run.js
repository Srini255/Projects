let scores=JSON.parse(localStorage.getItem('scores'))||{
  win:0,
  lose:0, 
  draw:0
};
let result;
function fun(b)
{
  const randomNumber=Math.random();
  let a;
  if(randomNumber>=0 && randomNumber<1/3)
    a='rock';
  else if(randomNumber>=1/3 && randomNumber<2/3)
    a='paper';
  else
    a='scissor';
  if(b=='rock')
  {
    if(a==b)
      result='draw';
    else if(a=='scissor')
      result='win'; 
    else
      result='lose';
  }
  else if(b=='paper')
  {
    if(a==b)
      result='draw';
    else if(a=='rock')
      result='win';
    else
      result='lose';
  }
  else
  {
    if(a==b)
      result='draw'
    else if(a=='paper')
      result='win';
    else
      result='lose';
  }
  document.getElementById("pa").innerHTML ='You '+result;
  document.getElementById("move").innerHTML 
  =`You <img class="move-img" src="img/${b}-emoji.png"><img class="move-img" src="img/${a}-emoji.png"> Computer`;
  if(result==='win')
    scores.win++;
  else if(result=='lose')
    scores.lose++;
  else
    scores.draw++;
  localStorage.setItem('scores',JSON.stringify(scores));
  document.getElementById("score").innerHTML='Wins: '+scores.win+', Lose: '+scores.lose+', draws: '+scores.draw+'.';
}
function reset()
{
  localStorage.removeItem('scores');
  scores.win=0;
  scores.lose=0;
  scores.draw=0;
  document.getElementById("score").innerHTML='Wins: '+scores.win+', Lose: '+scores.lose+', draws: '+scores.draw+'.';
}