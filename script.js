// pobierz blok glowny i blok wyników
const blokGlowny = document.querySelector("#blok-glowny");
const blokWynik = document.querySelector("#blok-wynik");

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
            let sekundy = iloscMinut * 60;
            setInterval(() => {
                document.querySelector("#czasomierz").innerHTML = `Pozostały czas: ${Math.floor(sekundy / 60)}:${sekundy % 60 < 10 ? "0" + sekundy % 60 : sekundy % 60}`;
                sekundy--;
            }, 1000);
        }
//zatrzymanie czasomierza
        function stopCzasomierz(mojCzasomierz){
            clearInterval(mojCzasomierz)
            let sekundy = mojCzasomierz.sekundy;
            document.querySelector("#czasomierz").innerHTML = `Pozostały czas: ${Math.floor(sekundy / 60)}:${sekundy % 60 < 10 ? "0" + sekundy % 60 : sekundy % 60}`;
        }
//utworzenie instancji klasy gracz
        function utworzGraczy(){
            // const nazwaGracza1 = document.querySelector("#nazwa-gracza-1").value;
            // const nazwaGracza2 = document.querySelector("#nazwa-gracza-2").value;
            gracz1 = new gracz("nazwaGracza1",0,"X",1);
            gracz2 = new gracz("nazwaGracza2",0,"O",2);
        }
//rozpoczenie czasomierza i ustawienie parametrow gry
        function startujGre() {
            const iloscMinut = document.querySelector("#wybor-czasu").value;
            
            parametryGry = new parametryGry(1,false,false);
            czasomierz(iloscMinut);
        }
//reset czasomierza i reset parametrow gry
        function koniecGry(){
            stopCzasomierz(czasomierz);
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
        function sprawdzanieKombinacji(tablica){
                let kombinacje = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [1, 4, 7],
                    [3, 6, 9],
                    [1, 5, 9],
                    [3, 5, 7]
                ]
                   kombinacje.forEach((kombinacja) => {
                        if(kombinacja.every(element => tablica.includes(element))){
                            console.log(`Gracz ${parametryGry.aktualnyGracz} wygrał!`);
                        };
                   })
            return false;
        }
//funkcja nie ma zastosowania 
        function sprawdzenieSeriiZnakow(tablicakrzyzykow, tablicakolek){
            
            
        }
//funkcja sprawdzająca wygraną gracza i aktualizująca wynik(nie dziala)
        function sprawdzenieWygranej(){
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
            if(tablicakrzyzykow.length >= 3){
                if(sprawdzanieKombinacji(tablicakrzyzykow) === true){
                     gracz1.wynik++
                    console.log(`Wynik gracza 1: ${gracz1.wynik}, Wynik gracza 2: ${gracz2.wynik}`);
                }
            }
            if(tablicakolek.length >= 3){
                if(sprawdzanieKombinacji(tablicakolek) === true){
                        gracz2.wynik++
                        console.log(`Wynik gracza 1: ${gracz1.wynik}, Wynik gracza 2: ${gracz2.wynik}`);
                }
            }

           
        }
//funkcja postawienia figury na planszy(wyswietla odpowiedni obrazek w kratce,dodaje odpowiedni znak do klasy danej kratki i zmienia aktualnego gracza)
        function postawFigure(kratka){
           const kratki = document.querySelectorAll(".kratki"); 
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