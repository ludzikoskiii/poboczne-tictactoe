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
        
        function startujGre() {
            const iloscMinut = document.querySelector("#wybor-czasu").value;
            gracz1 = new gracz("Gracz 1",0,"X",1);
            gracz2 = new gracz("Gracz 2",0,"O",2);
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
                for (let i = 0; i < tablica.length; i++) {
                        for (let j = 1; j < tablica.length; j++) {
                            if(tablica[j] - 1 == tablica[i] && tablica[j] + 1 == tablica[i] + 2){
                                return("sukces: " + tablica);
                            }
                        }
                    }
        }
        
        function sprawdzenieSeriiZnakow(tablicakrzyzykow, tablicakolek){
        if(tablicakrzyzykow.length >= 3){
                 console.log(sprawdzanieKombinacji(tablicakrzyzykow));
                 console.log("Mamy potencjalna kombinacje krzyzykow " + tablicakrzyzykow);
        }
         if(tablicakolek.length >= 3){
            console.log(sprawdzanieKombinacji(tablicakolek));
                  console.log("Mamy potencjalna kombinacje kol " + tablicakolek)
         }
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
            sprawdzenieSeriiZnakow(tablicakrzyzykow, tablicakolek);
        }
        
        function postawFigure(kratka){
           const kratki = document.querySelectorAll(".kratki"); 
           let figura = sprawdzenieAktualnejFigury();

           if(kratka.innerHTML !== ""){
                return;
            }

            kratka.classList.add(figura);
            kratka.innerHTML = `<img src="img/${figura}.png" alt="${figura === "krzyzyk" ? "Krzyżyk" : "Kółko"}" draggable="false">`;
            
            sprawdzenieWygranej();
            zmianaGracza();
        }
        