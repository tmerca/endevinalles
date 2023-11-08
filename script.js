// Array de objetos llamado questions
const questions = [
    {
        questio: "Quin país té més població?",
        respostaCorrecta: "La Xina",
        respostaIncorrecta: "L'India",
    },
    {
        questio: "El primer astronàuta a trepitjar la Lluna va ser?",
        respostaCorrecta: "Neil Amstrong",
        respostaIncorrecta: "Louis Amstrong",
    }
];

let indexQuestioActual = 0;
let respostesCorrectes = 0;
let respostesIncorrectes = 0;

const questioProposada = document.getElementById("questioProposada");
const btnEsquerre = document.getElementById("btnEsquerre");
const btnDret = document.getElementById("btnDret");
const missatge = document.getElementById("missatge");
const btnReiniciar = document.getElementById("btnReiniciar");

function barrejaRespostes(correcta, incorrecta){
    //Array con correcta e incorrecta
    const respostes = [correcta, incorrecta];
    //Funcion flecha para ordenar al azar
    respostes.sort(() => Math.random() - 0.5);
    return respostes;
}

// Funcion para mostrar las preguntas y las respuestas (montar el juego)

function mostraQuestio(){
    if(indexQuestioActual < questions.length){

        const questioActual = questions[indexQuestioActual];
        //Llenamos el div de la pregunta con una de las preguntas de questions
        questioProposada.textContent = questioActual.questio;

        const [barrejatCorrecte, barrejatIncorrecte] = barrejaRespostes(
            questioActual.respostaCorrecta,
            questioActual.respostaIncorrecta
        );

        btnEsquerre.textContent = barrejatCorrecte;
        btnDret.textContent = barrejatIncorrecte;
    } else {
        // El juego ha terminado
        if(respostesCorrectes === questions.length){
            missatge.textContent = "Has guanyat, has respost totes les questions correctament"
        } else {
            missatge.textContent = `El joc ha acabat. Respostes correctes: ${respostesCorrectes} \n
            Respostes incorrectes: ${respostesIncorrectes}`
        }

        btnEsquerre.style.display = "none";
        btnDret.style.display = "none";
        btnReiniciar.style.display = "block";
    }
}

// Funcion que verifique las respuestas

function comprovaResposta(respostaSeleccionada) {

    // Nos lleva al array y coge el index de la pregunta que toca
    const questioActual = questions[indexQuestioActual];

    if(respostaSeleccionada == questioActual.respostaCorrecta) {
        respostesCorrectes++;
    } else {
        respostesIncorrectes++;
    }

    indexQuestioActual++;

    mostraQuestio();
}

// Añadimos evento al boton izquierdo cuando hace click
btnEsquerre.addEventListener("click", () => comprovaResposta(btnEsquerre.textContent));
btnDret.addEventListener("click", () => comprovaResposta(btnDret.textContent));
btnReiniciar.addEventListener("click", () => {
    indexQuestioActual = 0;
    respostesCorrectes = 0;
    respostesIncorrectes = 0;
    missatge.textContent = "";
    btnEsquerre.style.display = "inline-block";
    btnDret.style.display = "inline-block";
    btnReiniciar.style.display = "none";

    mostraQuestio();
});

// Empezar el juego

mostraQuestio();