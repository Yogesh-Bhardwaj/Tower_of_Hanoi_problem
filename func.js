let operations = [];
let tower = document.getElementById("tower");
let n=5;
let a = "";
let setup =[];
let stop = 0;
let rst = 0;
let V = [];
let rsm = 1;
let waittime;
let running = 0;
function replaceAt(s,index, replacement) {
    if (index >= s.length) {
        return s.valueOf();
    }
    
    return s.substring(0, index) + replacement + s.substring(index + 1);
}
function init()
{
    a = "";
    setup =[]
    stop = 1;
    V = [];
    tower.innerHTML = "";
    let abb ;
    let acb ;
    rsm = 1;
    running =0;
    operations = [];
    if(n<=3)
    {
        document.getElementById("ab").style.fontSize = "smaller";
        document.getElementById("bc").style.fontSize = "smaller";
        document.getElementById("ac").style.fontSize = "smaller";
        abb = (1.3/(n+3) *100) + "%";
        acb = (0.5/(n+3) *100) + "%";
    }
    else
    {
        document.getElementById("ab").style.fontSize = "larger";
        document.getElementById("bc").style.fontSize = "larger";
        document.getElementById("ac").style.fontSize = "larger";
        abb = (1.4/(n+3) *100) + "%";
        acb = (0.6/(n+3) *100) + "%";

    }
    document.getElementById("ab").style.bottom = abb;
    document.getElementById("bc").style.bottom = abb;
    document.getElementById("ac").style.bottom = acb;
    for(let i=1;i<=(6*n+12);i++)
        a+=" ";
    a = replaceAt(a,n+2,'|');
    a = replaceAt(a,3*n+6,'|');
    a = replaceAt(a,5*n+10,'|');

    let A=[n+1],B=[n+1],C=[n+1];
    for(let i=n;i>=1;i--)
        A.push(i);
    V.push(A);
    V.push(B);
    V.push(C);

    for(let i=1;i<n+1;i++)
        setup.push(a);

    a = "";
    for(let i=1;i<=(6*n+12);i++)
        a+="_";
        a = replaceAt(a,n+2,'|');
        a = replaceAt(a,3*n+6,'|');
    a = replaceAt(a,5*n+10,'|');
    a = replaceAt(a,2*n+4,' ');
    a = replaceAt(a,4*n+8,' ');
    setup.push(a);

    a = "";
    for(let i=1;i<=(6*n+12);i++)
            a+=" ";
    a = replaceAt(a,n+2,'A');
    a = replaceAt(a,3*n+6,'B');
    a = replaceAt(a,5*n+10,'C');
    setup.push(a);
    
    a = "";        
    for(let i=1;i<=(6*n+12);i++)
    {
        if(i<=n+2)
        a+=' ';
        else if(i<=5*n+11)
        a+="-";
        else 
        a+=" ";
    }    
    a = replaceAt(a,n+2,'|');
    a = replaceAt(a,3*n+6,'|');
    a = replaceAt(a,5*n+10,'|');
    setup.push(a);

    a = "";
    for(let i=1;i<=(6*n+12);i++)
    {
        if(i<=n+2)
        a+=' ';
        else if(i<=5*n+11)
        a+="-";
        else 
        a+=" ";
    }    
    
    a = replaceAt(a,n+2,'|');
    a = replaceAt(a,5*n+10,'|');
    setup.push(a);


    for(let i=0;i<n;i++)
    {
        let temp = ""+(i+1);
        for(let j=n+1-i-temp.length;j<n+1-i;j++)
        setup[i] = replaceAt(setup[i],j,temp.substring(j-n+i+temp.length-1,j-n-1+i+temp.length+1));
        for(let j=n-i+1;j<=n+i+3;j++)
        {
            if(j == (n+2))
            continue;
            setup[i] = replaceAt(setup[i],j,'_');
        }
    }
    display();
}
function inp(){
    n= parseInt(document.getElementById("nod").value);
    init();
}
function transfer(source,dest)
{
    let src = V[source][V[source].length - 1];
    let dst = V[dest][V[dest].length - 1]

    if(src >= dst)
    {
          if(src == n+1)
          {
              if(dst == n+1)
              alert("No disk is there")
              else
              {transfer(dest,source);return;}
            }
            else
            {
                transfer(dest,source);
                return;
          }
          return;
    }
    operations.push([source,dest]);

    let to_be_transfered=0;
    let temp = n+source*(2*n+4)+1;
    let tem = 2*(temp+1);
    for(let i=0;i<n;i++)
    {
        if(setup[i].substring(temp,temp+1) === '_')
        {
            while(setup[i].substring(temp,temp+1) == "_")
            {
                      setup[i] = replaceAt(setup[i],temp," "); 
                      setup[i] = replaceAt(setup[i],tem-temp," "); 
                      temp=temp-1;
                      to_be_transfered++;
                      if(temp<0)
                      break;
                    }
                    while(!(setup[i].substring(temp,temp+1) == '_'))
                    {
                        setup[i] = replaceAt(setup[i],temp,' ');
                        temp = temp-1;
                        if(temp<0)
                        break;
                    }
                    break;
                }
    }
    V[dest].push(V[source].pop());
    temp = n+dest*(2*n+4)+1;
    let center = temp+1;
    for(let i=n-1;i>=0;i--)
    {
          if(setup[i][temp] === ' ')
          {
                let numm = "" + to_be_transfered;
                let l = numm.length;
                for(let j = center - to_be_transfered - l;j<center-to_be_transfered;j++)
                {
                      setup[i] = replaceAt(setup[i],j,numm[j-(center-to_be_transfered-l)])
                }
                for(let j = center - to_be_transfered;j<=center+to_be_transfered;j++)
                {
                      if(j===center)
                      continue;
                      setup[i] = replaceAt(setup[i],j,'_');
                }
                break;
          }
          setup[i] = replaceAt(setup[i],center,'|');
    }

    for(let i=0;i<n+1;i++)
    {

          setup[i] = replaceAt(setup[i],n+2,'|');
          setup[i] = replaceAt(setup[i],3*n+6,'|');
          setup[i] = replaceAt(setup[i],5*n+10,'|');
    }
    display();

}   
function ac()
{
    transfer(0,2);
}
function ab()
{
    transfer(0,1);

}
function bc()
{
    transfer(1,2);
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function Solution(){
    init();
    await sleep(800);
    Process();
}
async function Process()
{
    running =1;
    waittime = (10/(document.getElementById("spd").value))*100;
    stop = 0;
    rst = 0;
    let nom = (1<<n) - 1;
    await sleep(500);
    if(n%2 == 0)
    {
        for(let i=rsm;i<=nom;i++)
        {
            if(stop || rst)
            {
                running = 0;
                return;
            }
            if(i%3==1)
            ab();
            else if(i%3==2)
            ac();
            else
            bc();
            rsm++;
            await sleep(waittime);
        }
    }
    else
    {   
        for(let i=rsm;i<=nom;i++)
        {
            if(stop || rst)
            {
                running = 0;
                return;
            }
            if(i%3==1)
            ac();
            else if(i%3==2)
            ab();
            else
            bc();
            rsm++;
            await sleep(waittime);
        }
    }
    rsm=1;
}
function display()
{
    tower.innerText=""
    for(let i=0;i<setup.length-1;i++){
          tower.innerText += setup[i];
          tower.innerHTML += "<br>";
    }
    tower.innerText += setup[setup.length -1];

}
function Stop()
{
    stop=1;
    running =0;
}
function Resume()
{
    if(rsm === 1)
    return;
    stop = 0;
    if(running)
    window.alert("Process is already running");
    else
    Process();
} 
async function reset()
{
    rst = 1;
    for(let i=operations.length-1;i>=0;i--)
    {
          transfer(operations[i][0],operations[i][1]);
          await sleep(50);
    }
    operations=[];
    stop = 1;
}
function speed()
{
    waittime = (10/(document.getElementById("spd").value))*100;
}
init()