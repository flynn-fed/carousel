class Carousel {
    constructor(parent,imgArr){
        this.parent = parent;
        this.el = document.createElement('ul');
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;
        this.imgArr = [...imgArr];
        this.leftArrow = document.createElement('span');
        this.rightArrow = document.createElement('span');
        this.initCarousel();
        this.index = 0;
    }
    initCarousel(){
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.el.setAttribute('class','imgList');
        this.setStyle(this.leftArrow,'L');
        this.setStyle(this.rightArrow,'R');
        this.parent.appendChild(this.leftArrow);
        this.parent.appendChild(this.rightArrow);
        this.parent.appendChild(this.el);

        let imgArr = this.imgArr;
        let elArr = [];
        for(let i = 0; i < imgArr.length;i++){
            let li = new El(imgArr[i],this.el);
            elArr.push(li);
        }
        //初始化第二个和最后一个元素的位移值；
        elArr[elArr.length-1].moveL();
        elArr[1].moveR();
        //监听按钮的点击事件，在事件发生时可以提前设置好相邻两边的位移
        this.leftArrow.addEventListener('click',()=> {
            elArr[this.index].moveR();
            this.index--;
            if(this.index < 0){
                this.index = elArr.length-1;
            }
            elArr[this.index].move();

            let prev = this.index > 0?this.index - 1:elArr.length-1;
            elArr[prev].moveL();
        });
        this.rightArrow.addEventListener('click',()=> {
            elArr[this.index].moveL();
            this.index++;
            if(this.index > elArr.length-1){
                this.index = 0;
            }
            elArr[this.index].move();
            let next = this.index < elArr.length-1?this.index + 1:0;
            elArr[next].moveR();
        })

    }
    //设置左右按钮的样式
    setStyle(el,dir){
        if(dir == 'L'){
            el.innerText = 'prev';
            el.setAttribute('class','leftArrow arrow');
        }else {
            el.innerText = 'next';
            el.setAttribute('class','rightArrow arrow');
        }
        el.style.top = Math.round(this.parent.clientHeight/3) + 'px';
        el.style.width = Math.round(this.parent.clientWidth/6) + 'px';
        el.style.height = Math.round(this.parent.clientWidth/6) + 'px';
        el.style.lineHeight = Math.round(this.parent.clientWidth/6) + 'px';
    }
}

//创建一个类，并设置好运动函数
class El {
    constructor(picture,parent){
        this.parent = parent;
        this.el = document.createElement('li');
        this.width = this.parent.clientWidth;
        this.height = this.parent.clientHeight;
        this.translateX = 0;
        //当前显示的页数
        this.picture = picture;
        this.creatEl();

    }
    creatEl(){

        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.el.style.backgroundImage = `url(${this.picture})`;
        this.el.style.transform = `translateX(0px)`;
        this.el.setAttribute('class','liImg');
        this.parent.appendChild(this.el);
    }
    moveL(){
        this.el.style.transform = `translateX(${-this.width}px)`;
        this.el.style.zIndex = 2;
    }
    move(){
        this.el.style.transform = `translateX(0px)`;
        this.el.style.zIndex = 9;
    }
    moveR(){
        this.el.style.transform = `translateX(${this.width}px)`;
        this.el.style.zIndex = 2;
    }


}
