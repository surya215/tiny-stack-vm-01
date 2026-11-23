import{mkdirSync,readFileSync,readdirSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T="#4d')-.2ssssssss,,,,,,,(,,,(,,,s,,,sssssssssssssCGGC#sssssssssss(+ssssssssssssss''$'";
for(const d of readdirSync(I).sort()){
 const g=readFileSync(I+'/'+d+'/program.bin'),n=readFileSync(I+'/'+d+'/input.bin'),L=g.length;
 const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),u=new Uint8Array(65536);
 let s=0,k=0,p=0,w=0,y=0,q=0,e=0,a,b,r,t;
 V:for(;;){
  if(w==1e6){e=10;break V}
  if(p<0||p>=L){e=9;break V}
  const o=g[p],z=T.charCodeAt(o)-35,im=z>>4,po=z>>2&3,pu=z&3;
  if(o>83||im>4){e=5;break V}
  if(p+im>=L){e=9;break V}
  w++;p+=1+im;
  if(s<po){e=2;break V}
  if(s-po+pu>256){e=3;break V}
  switch(o){
   case 0:break V;
   case 1:D[s++]=g.readInt8(p-1);break;
   case 2:D[s++]=g.readInt32LE(p-4);break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break;
   case 6:D[s]=D[s-2];s++;break;
   case 7:t=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=t;break;
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:{const f=g.readInt16LE(p-2);if(o==48||(o==49?D[--s]==0:D[--s]!=0))p+=f;break}
   case 51:if(k==64){e=7;break V}C[k++]=p;p=g[p-2]|g[p-1]<<8;break;
   case 52:if(!k){e=8;break V}p=C[--k];break;
   case 64:a=D[s-1];if(a<0||a>255){e=6;break V}D[s-1]=M[a];break;
   case 65:a=D[s-1];if(a<0||a>255){e=6;break V}M[a]=D[s-2];s-=2;break;
   case 80:{const v=''+D[--s];if(y+v.length>65536){e=11;break V}u.set(Buffer.from(v),y);y+=v.length;break}
   case 81:if(y>65535){e=11;break V}u[y++]=D[--s]&255;break;
   case 82:D[s++]=q<n.length?n[q++]:-1;break;
   case 83:e=D[--s]&255;break V;
   default:
    b=D[s-1];a=D[s-2];
    if(o==19){if(!b){e=4;break V}r=a==-2147483648&&b==-1?a:(a/b)|0}
    else if(o==20){if(!b){e=4;break V}r=b==-1?0:a%b|0}
    else if(o==21){if(!b){e=4;break V}r=Math.floor((a>>>0)/(b>>>0))|0}
    else if(o==22){if(!b){e=4;break V}r=(a>>>0)%(b>>>0)|0}
    else if(o==16)r=a+b|0;
    else if(o==17)r=a-b|0;
    else if(o==18)r=Math.imul(a,b);
    else if(o==24)r=a&b;
    else if(o==25)r=a|b;
    else if(o==26)r=a^b;
    else if(o==28)r=a<<b;
    else if(o==29)r=a>>b;
    else if(o==30)r=(a>>>b)|0;
    else if(o==32)r=a==b?1:0;
    else if(o==33)r=a<b?1:0;
    else r=(a>>>0)<(b>>>0)?1:0;
    D[s-2]=r;s--;
  }
 }
 mkdirSync(O+'/'+d,{recursive:true});
 writeFileSync(O+'/'+d+'/stdout.bin',u.slice(0,y));
 writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}
