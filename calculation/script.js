function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
class Question extends SettingBase{
	constructor(){
		super();
		this.types=["+","-","x"];
		this.type=0;
		this.max=10;
		this.limit=true;
		this.qcount=50;
		this.a=0;
		this.b=0;

		this.tType;
		this.right=0;
		this.nowQuestion=1;
		this.started=false;
	}
	setSetting(type,max,limit,qcount){
		if(this.started){
			this.stop();
		}
		this.type=parseInt(type);
		this.max=parseInt(max);
		this.limit=(limit==="limit");
		this.qcount=parseInt(qcount);
		this.right=0;
	}
	make(){
		if(this.limit){
			if(this.nowQuestion>this.qcount){
				this.stop();
				return "끝";
			}
		}
		this.nowQuestion++;
		this.a=rand(1,this.max)
		this.b=rand(1,this.max)

		let simbol;
		if(this.type==3){
			this.tType=rand(0,2);
			simbol=this.types[this.tType];
		}
		else{
			this.tType=this.type;
			simbol=this.types[this.tType];
		}

		return this.a+" "+simbol+" "+this.b;
	}
	show(question){
		document.getElementById("question_board").innerHTML=question;
	}
	compare(){
		let result=parseInt(document.getElementById("answer_input").value)
		let correct=false;
		switch(this.tType){
			case 0:
				if((this.a+this.b)===result){
					correct=true;
					this.right++;
				}
				break;
			case 1:
				if((this.a-this.b)===result){
					correct=true;
					this.right++;
				}
				break;
			case 2:
				if((this.a*this.b)===result){
					correct=true;
					this.right++;
				}
				break;
		}
		if(correct){
			this.onCorrect();
		}
		else{
			this.onIncorrect();
		}
		document.getElementById("answer_input").value="";
		this.show(this.make())
	}
	getSetting(){
		let types=["덧셈","뺄셈","곱셈","혼합"]
		let result="문제 유형: "+types[this.type]+"<br>";
		result+="숫자 범위: 1 ~ "+this.max+"<br>";
		result+="문제 개수: "+(this.limit?this.qcount+" 개":"무한")+"<br>";
		
		return result;
	}
	start(){
		this.started=true;
		this.tType=0;
		this.right=0;
		this.nowQuestion=1;

		super.init();
		let time=3;
		this.showCount(time)
		let hInterval=setInterval(()=>{
			time--;
			if(time<1){
				clearInterval(hInterval)
				super.start();
				this.show(this.make())
				return;
			}
			this.showCount(time);
		},1000)
	}
	stop(){
		super.stop();
		this.started=false;
		// document.getElementById("question_board").classList.add("hidden");
		// document.getElementById("score_board_parent").classList.remove("hidden");

		this.showStat();
	}
	confirm(){
		super.confirm();
		// document.getElementById("score_board_parent").classList.add("hidden");
		// document.getElementById("contents_board_parent").classList.remove("hidden");

		printContents(this.getSetting());
	}
	showStat(){
		super.end("맞힌 문제: "+this.right+" / "+(this.nowQuestion-1))
		// document.getElementById("score_board").innerHTML="맞힌 문제: "+this.right+" / "+(this.nowQuestion-1);
	}
}
function getFormData(){
	let formData=new FormData(document.getElementById("setting_data"));
	console.log(formData.get("type"));
	console.log(formData.get("number"));
	console.log(formData.get("mode"));
	console.log(formData.get("qcount"));

	question.setSetting(formData.get("type"),formData.get("number"),formData.get("mode"),formData.get("qcount"));
	//printContents(question.getSetting())
	question.start();
}
function printContents(str){
	document.getElementById("contents_board").innerHTML=str
}
let question=new Question();