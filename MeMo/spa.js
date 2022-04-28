var AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
var MessagesA;
window.onhashchange=RefreshFunc;
var MainHash={};
function UpdateContent(URL) {
    MainHash=URL;
    var Content="";
    switch ( MainHash.pagename ) { 
        case 'Main':
            Content+="<h6>Главная страница</h6>";
            
            break;
        case 'Rules':
            Content+="<h6>Правила</h6>";
            Content+="<p>MemoryGame – игра для тренировки памяти и развития ассоциативного мышления. Подходит как для детей дошкольного так и для детей послевузовского возраста.</p><p>При использовании специальных тем может быть повышена внимательность, быстрота запоминания. При использовании нескольких уровней сложности возможно увеличение запоминаемого объема и развития памяти в различных направлениях.</p><p>Возможность сохранения результатов позволяет анализировать стабильность запоминания. Проводить по результатам дополнительные мероприятия.</p><p>И в конце концов, игра позволяет просто весело провести время<img id='smile' src='smile_smoll.png' alt='альтернативный текст'></p>";
            break;
        case 'Start':
            Content+="<h6>Начало игры</h6>";
            Content+="<p><strong>выбери уровень сложности</strong><br><a href='game.html?diff=1'>Поле 4х2</a> Уровень 1 - тестовый.<br><a href='game.html?diff=2'>Поле 6х4</a> Уровень 2.<br></p>";
            break;
        case 'Score':
            ShowRecords();
            break;
        case 'About':
            Content+="<h6>О проекте</h6>";
            Content+="<p>Выпускной проект: 'Memory game'.<br>Автор: Людмила Дучинская.<br>Преподаватель: Алексей Локтев.<br>Дата: 16.05.15.</p>";
            break;
    }
    document.getElementById('wrapper').innerHTML=Content;
}
function RefreshFunc() {
    var URLHash=window.location.hash; //#main
    var URLname=URLHash.substr(1); //main
    if ( URLname!="" ){
        var N=URLname.split("_")
        var URL={ pagename: N[0] };
        UpdateContent(URL);
    }
    else{
        UpdateContent( { pagename:'Main' } );
    }
}
function MainPage() {
    location.hash='Main';
    RefreshFunc();
}
function RulesPage() {
    location.hash='Rules';
    RefreshFunc();
}
function StartPage() {
    location.hash='Start';
    RefreshFunc();
}
function ScorePage() {
    location.hash='Score';
    RefreshFunc();
}
function AboutPage() {
    location.hash='About';
    RefreshFunc();
}
RefreshFunc();