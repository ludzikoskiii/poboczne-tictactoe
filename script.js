const blokGlowny = document.querySelector("#blok-glowny");
const blokWynik = document.querySelector("#blok-wynik");

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

        class parametryGry{
            constructor(aktualnyGracz,wygrana,remis,numerAktualnegoGracza){
                this.aktualnyGracz = aktualnyGracz;
                this.wygrana = wygrana;
                this.remis = remis;
                this.numerAktualnegoGracza = numerAktualnegoGracza;
            }
        }

        class parametryKratek{
            constructor(kratka,figura){
                this.kratka = kratka;
                this.figura = figura;
            }
        }

        class parametryCzasomierza{
            constructor(czasomierz,sekundy){
                this.czasomierz = czasomierz;
                this.sekundy = sekundy;
            }
        }
        
        function czasomierz(iloscMinut){
            let sekundy = iloscMinut * 60;
            setInterval(() => {
                document.querySelector("#czasomierz").innerHTML = `Pozostały czas: ${Math.floor(sekundy / 60)}:${sekundy % 60 < 10 ? "0" + sekundy % 60 : sekundy % 60}`;
                sekundy--;
            }, 1000);
        }

        function stopCzasomierz(mojCzasomierz){
            clearInterval(mojCzasomierz)
            let sekundy = mojCzasomierz.sekundy;
            document.querySelector("#czasomierz").innerHTML = `Pozostały czas: ${Math.floor(sekundy / 60)}:${sekundy % 60 < 10 ? "0" + sekundy % 60 : sekundy % 60}`;
        }
        function utworzGraczy(){
            // const nazwaGracza1 = document.querySelector("#nazwa-gracza-1").value;
            // const nazwaGracza2 = document.querySelector("#nazwa-gracza-2").value;
            gracz1 = new gracz("nazwaGracza1",0,"X",1);
            gracz2 = new gracz("nazwaGracza2",0,"O",2);
        }
        function startujGre() {
            const iloscMinut = document.querySelector("#wybor-czasu").value;
            
            parametryGry = new parametryGry(1,false,false);
            czasomierz(iloscMinut);
        }

        function koniecGry(){
            stopCzasomierz(czasomierz);
        }
        
        function zmianaGracza(){
            if(parametryGry.aktualnyGracz === 1){
                parametryGry.aktualnyGracz = 2;
            }
            else{
                parametryGry.aktualnyGracz = 1;
            }
        }

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
                if(tablica.length >= 3){
                   kombinacje.forEach((kombinacja) => {
                        if(kombinacja.every(element => tablica.includes(element))){
                            return true;
                        };
                   })
        }
        }
        
        function sprawdzenieSeriiZnakow(tablicakrzyzykow, tablicakolek){
            
            
        }

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
            if(sprawdzanieKombinacji(tablicakrzyzykow)){
                gracz1.wynik++
                console.log(`Wynik gracza 1: ${gracz1.wynik}, Wynik gracza 2: ${gracz2.wynik}`);
            }
            if(sprawdzanieKombinacji(tablicakolek)){
                gracz2.wynik++
                console.log(`Wynik gracza 1: ${gracz1.wynik}, Wynik gracza 2: ${gracz2.wynik}`);
            }
           
        }
        
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