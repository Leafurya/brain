class SettingBase{
	constructor(){
	}
	onCorrect(){
		let gameBoard=document.getElementById("game_board");
		gameBoard.classList.add("correct");
		setTimeout(()=>{
			gameBoard.classList.remove("correct");
		},200);
	}
	onIncorrect(){
		let gameBoard=document.getElementById("game_board");
		gameBoard.classList.add("incorrect");
		setTimeout(()=>{
			gameBoard.classList.remove("incorrect");
		},200);
	}
	stop(){
		document.getElementById("question_board").classList.add("hidden");
		document.getElementById("contents_board_parent").classList.add("hidden");
		document.getElementById("score_board_parent").classList.remove("hidden");
	}
	confirm(){
		document.getElementById("score_board_parent").classList.add("hidden");
		document.getElementById("contents_board_parent").classList.remove("hidden");
	}
	end(innerHTML){
		document.getElementById("score_board").innerHTML=innerHTML;
	}
	start(){
		document.getElementById("contents_board_parent").classList.add("hidden");
		document.getElementById("score_board_parent").classList.add("hidden");
		document.getElementById("question_board").classList.remove("hidden");

		document.getElementById("answer_input").focus();
	}
	init(){
		document.getElementById("question_board").classList.add("hidden");
		document.getElementById("score_board_parent").classList.add("hidden");
		document.getElementById("contents_board_parent").classList.remove("hidden");
	}
	showCount(countdown){
		document.getElementById("contents_board").innerHTML=countdown;
	}
}