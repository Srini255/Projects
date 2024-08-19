let a=["img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img1.png","img2.png","img3.png","img4.png","img5.png","img6.png"]
let matches=[];
let check=[];
let moves=0;
let wrong=0;
let right=0;
// document.addEventListener('DOMContentLoaded',()=>
// {
//     startGame();
// });

document.getElementById('start').addEventListener('click',()=>{
    document.querySelector('.elements').classList.add("elements1");
    document.querySelector('.time').classList.add("times");
    document.querySelector('.starting').style.display="none";
    startGame();
    startTimer();
    document.querySelector('header').style.display="none";
});
function startGame(){
    shuffle();
    const cards=document.querySelectorAll('#img');
    const elements=document.querySelector('.elements')
    for(let i=0;i<a.length;i++){
        const code=`
        <div class="flip-card">
                <div class="flipcard-inner">
                    <div class="flipcard-front"> 
                        <span class="c-logo"></span>
                    </div>
                    <div class="flipcard-back">
                        <img src="img/card/${a[i]}" id="${a[i]}" alt="avatar" width="100px" height="100px" cass="a-img">
                    </div>
                </div>
        </div>`;
        elements.innerHTML+=code;
    }
    document.querySelectorAll('.flip-card').forEach(card=>{
        card.addEventListener('click',()=>{
            const flip=card.querySelector('.flipcard-inner');   
            if(flip.classList.contains("inner")){
                return;
            }
            if(check.length===2){
                compare();
            }
            flip.classList.add("inner");
            check.push(flip);
            if(matches.length==10&&check.length===2){
                compare();}
        })    
    })
    // cards.forEach(card=>{
    //     card.id=`${a[i]}`;
    //     card.className='a-img';
    //     card.src=`img/${a[i]}`;
    //     // card.style.width="200px";
    //     // card.style.height="200px";
    //     i++;
    // });
}

function shuffle(){
    for(let i=a.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
    }
}

document.querySelectorAll('.back').forEach(image=>{
    image.addEventListener('click',()=>{
        const img=image.firstChild;
        img.className="flipped";
        img.style.display="block";
    })
})



function startTimer(){
    const Count=document.getElementById('time');
    const Cdiv=document.querySelector('.time');
    Count.value=45;
    Count.textContent=Count.value;
    CountDown=setInterval(()=>{
        if(Count.value<=15)
        {
            Cdiv.classList.add("time-low");
        }
        if(Count.value===1)
        {
            clearInterval(CountDown);
            showPopup("Sorry! You Lose The Game Time ends.");
        }
        Count.value=Count.value-1;
        Count.textContent=Count.value;
    },"1000")
}

function compare(){
    const first=check[0].children[1].children[0].id;
    const second=check[1].children[1].children[0].id;
    if(first===second){
        right+=1;
        check.forEach(ele=>{
            matches.push(ele)});
        check=[];
        if(matches.length===a.length)
        {
            var count=2;
            counting=setInterval(()=>{
                count=count-1;
                if(count==0){
                    clearInterval(CountDown);
                    showPopup("Congratulations!You Won The game");
                }
            },200);
            
        }
    }else{ 
        wrong+=1;
        check.forEach(ele=>{
            ele.classList.remove("inner");
        })
        check=[];
    }
    moves+=1;
}

function reset(){
    matches=[];
    document.querySelectorAll('.inner').forEach(ele=>{
        ele.classList.remove("inner");
    });
    const cards=document.querySelectorAll('.a-img');
    let i=0;
    cards.forEach(card=>{
    card.id="img";
    card.classList.remove('a-img');
    card.removeAttribute('src');
    });
    startGame();
}

document.getElementById('close').addEventListener('click',()=>{
    document.getElementById('manualPopup').style.display="none";
})



function showPopup(msg)
{
    const popup=document.getElementById('manualPopup');
    popup.style.display="block";
    const result=document.getElementById('result');
    result.textContent=msg;
    const time=document.getElementById('time').value;
    document.getElementById('t-moves').textContent=`Your Total Moves ${moves} and finishes ${time}s before`;
}

// let moves=0;
// let wrong=0;
// let right=0;

// c-moves"></p>
//               <p id="w-moves"></p>
//               <p id="t-moves"