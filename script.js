// pobierz blok glowny i blok wyników
const blokGlowny = document.querySelector("#blok-glowny");
// klasa gracza
        class gracz{
            constructor(nazwa,wynik,figura,numerGracza){
                this.nazwa = nazwa;
                this.wynik = wynik;
                this.figura = figura;
                this.numerGracza = numerGracza;
            }
            ileWygranych(){
                return this.wynik;
            }
        }

//klasa parametry gry
        class parametryGry{
            constructor(aktualnyGracz,wygrana,remis,numerAktualnegoGracza){
                this.aktualnyGracz = aktualnyGracz;
                this.wygrana = wygrana;
                this.remis = remis;
                this.numerAktualnegoGracza = numerAktualnegoGracza;
            }
        }

//klasa parametry kratek
        class parametryKratek{
            constructor(kratka,figura){
                this.kratka = kratka;
                this.figura = figura;
            }
        }

//klasa parametry czasomierza
        class parametryCzasomierza{
            constructor(czasomierz,sekundy){
                this.czasomierz = czasomierz;
                this.sekundy = sekundy;
            }
        }
//rozpoczecie czasomierza       
        function czasomierz(iloscMinut){
            if(iloscMinut == 0){
                return false;
            }else{
                 let sekundy = iloscMinut * 60;
            const mojCzasomierz = new parametryCzasomierza(document.querySelector("#czasomierz"), sekundy);
            mojCzasomierz.intervalId = setInterval(() => {
                document.querySelector("#czasomierz").innerHTML =
                    `Pozostały czas: ${Math.floor(mojCzasomierz.sekundy / 60)}:${mojCzasomierz.sekundy % 60 < 10 ? "0" + mojCzasomierz.sekundy % 60 : mojCzasomierz.sekundy % 60}`;
                mojCzasomierz.sekundy--;
            }, 1000);

        
            }
           return mojCzasomierz;
        }
//zatrzymanie czasomierza
        function stopCzasomierz(mojCzasomierz){
            clearInterval(mojCzasomierz.intervalId);
        }

        function resetGry(){
            stopCzasomierz(mojCzasomierz);

             const iloscMinut = document.querySelector("#wybor-czasu").value;
             mojCzasomierz = czasomierz(iloscMinut);

            parametryGry.aktualnyGracz = 1;
            resetFigurWKratkach();
        }
//utworzenie instancji klasy gracz
        function utworzGraczy(){
            // const nazwaGracza1 = document.querySelector("#nazwa-gracza-1").value;
            // const nazwaGracza2 = document.querySelector("#nazwa-gracza-2").value;
            gracz1 = new gracz("nazwaGracza1",0,"X",1);
            gracz2 = new gracz("nazwaGracza2",0,"O",2);
        }
        let mojCzasomierz;
//rozpoczenie czasomierza i ustawienie parametrow gry
        function startujGre() {
            const iloscMinut = document.querySelector("#wybor-czasu").value;
            
            parametryGry = new parametryGry(1,false,false);
             mojCzasomierz = czasomierz(iloscMinut);
        }
        function resetFigurWKratkach(){
           const kratki = document.querySelectorAll(".kratki"); 
           kratki.forEach(element => {
                element.classList.remove('krzyzyk', 'kolko');
                element.innerHTML = ``;
           }) 
        }
//reset czasomierza i reset parametrow gry
        function koniecGry(mojCzasomierz){
            resetFigurWKratkach()
            stopCzasomierz(mojCzasomierz);
        }
//zmiana aktualnego gracza podczas gry po postawieniu figury       
        function zmianaGracza(){
            if(parametryGry.aktualnyGracz === 1){
                parametryGry.aktualnyGracz = 2;
            }
            else{
                parametryGry.aktualnyGracz = 1;
            }
        }
//sprawdzenie aktualnej figury gracza
        function sprawdzenieAktualnejFigury(){
             let figura = "";
            if(parametryGry.aktualnyGracz === 1){
                figura = "krzyzyk";
            }
            else{
                figura = "kolko";
            }
            return figura;
        }
//sprawdzenie czy gracz wygrał poprzez sprawdzenie kombinacji
        function sprawdzanieKombinacji(tablica, gracz){
                let kombinacje = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [2, 5, 8],
                    [1, 4, 7],
                    [3, 6, 9],
                    [1, 5, 9],
                    [3, 5, 7]
                ]
                 return kombinacje.some(kombinacja =>
                    kombinacja.every(pole => tablica.includes(pole))
                );
        }
//funkcja sprawdzająca wygraną gracza i aktualizująca wynik(nie dziala)
        function sprawdzenieWygranej(){
            const blokWynik = document.querySelector("#blok-wynik");
            let tablicakrzyzykow = [];
            let tablicakolek = [];
            let tablicaIdZnakow = [];
            document.querySelectorAll(".kratki").forEach((kratka) => {
                if(kratka.classList.contains("krzyzyk")){
                    tablicakrzyzykow.push(parseInt(kratka.id));
                } 
                if(kratka.classList.contains("kolko")){
                    tablicakolek.push(parseInt(kratka.id));
                }
            })
                if(sprawdzanieKombinacji(tablicakrzyzykow, gracz1)){
                    gracz1.wynik++;
                }
                if(sprawdzanieKombinacji(tablicakolek, gracz2)){
                    gracz2.wynik++;
                }
            if(gracz1.wynik > 0){
                blokWynik.innerHTML = `${gracz1.wynik} - ${gracz2.wynik}`;
                koniecGry(mojCzasomierz);
                resetGry(mojCzasomierz);
            }
            if(gracz2.wynik > 0){
                blokWynik.innerHTML = `${gracz1.wynik} - ${gracz2.wynik}`;
                koniecGry(mojCzasomierz);
                resetGry(mojCzasomierz);
            }
        }
//funkcja postawienia figury na planszy(wyswietla odpowiedni obrazek w kratce,dodaje odpowiedni znak do klasy danej kratki i zmienia aktualnego gracza)
        function postawFigure(kratka){
           let figura = sprawdzenieAktualnejFigury();

           if(kratka.innerHTML !== ""){
                return;
            }

            kratka.classList.add(figura);
            kratka.innerHTML = `<img src="img/${figura}.png" alt="${figura === "krzyzyk" ? "Krzyżyk" : "Kółko"}" draggable="false">`;
            
            sprawdzenieWygranej()
            zmianaGracza();
    }
        utworzGraczy();