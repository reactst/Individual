/* INDIVIDUAL — katalog vozila. Izvor: objave na facebook.com/INDIVIDUALautomobili */
window.CONTACT = { phone: "091 153 33 33", tel: "+385911533333", wa: "385911533333", city: "Split", fb: "https://www.facebook.com/INDIVIDUALautomobili/" };

window.VEHICLES = [
  {
    id: "bmw-2-active-tourer", n: 5, make: "BMW", model: "2 Active Tourer", type: "osobni", fuel: "Diesel",
    year: "06/2023", km: "41.xxx", power: "110 kW / 150 KS", gearbox: "Automatik (dvostruka spojka)", status: "stock", price: null,
    vat: true, tagline: "Automobil koji postavlja standarde u pouzdanosti, ekonomičnosti i prostranosti.",
    equip: ["Full LED", "Ambijentalna rasvjeta", "Kožna sport sjedala", "Crni svod stropa", "Električna peta vrata", "Digitalni display", "Parkirna kamera", "Line assist", "Front assist"],
    notes: ["Euro 6 agregat, 110 kW / 150 KS", "S obzirom na NNV od 46.xxx € sada je iznimno pametna kupnja", "Nove gume, akumulator, ulje i filteri već izmijenjeni", "Vozilo u sustavu PDV-a"]
  },
  {
    id: "vw-tiguan", n: 5, make: "Volkswagen", model: "Tiguan 2.0 TDI R-Line", type: "osobni", fuel: "Diesel",
    year: "—", km: "50.xxx", power: "110 kW / 150 KS", gearbox: "DSG, 7 stupnjeva", status: "stock", price: null,
    vat: true, tagline: "Kada kupac zna što želi. Narudžba, a ne potraga — po principu „ključ u ruke“.",
    equip: ["R-Line paket", "Panoramski krov", "Full LED", "Ambijentalna rasvjeta", "Sport sjedala", "Crni svod stropa", "Električna peta vrata", "Digitalni display", "Parkirna kamera", "Line assist", "Front assist", "Električno podesiva sjedala"],
    notes: ["Euro 6 agregat s automatikom s dvostrukom spojkom (7 st.)", "Moguća ciljana narudžba po vašim željama", "Vozilo u sustavu PDV-a"]
  },
  {
    id: "volvo-xc40", n: 5, make: "Volvo", model: "XC40 T2", type: "osobni", fuel: "Benzin",
    year: "2022", km: "87.xxx", power: "129 KS", gearbox: "Automatik, 8 stupnjeva", status: "soon", statusNote: "U dolasku s juga Francuske", price: 20000,
    vat: true, tagline: "Skandinavski kompakt SUV iz Francuske — spreman za novog vlasnika.",
    equip: [], notes: ["Uvoz s juga Francuske", "Vozilo u sustavu PDV-a"]
  },
  {
    id: "vw-t-roc", n: 5, make: "Volkswagen", model: "T-Roc 1.5 TSI", type: "osobni", fuel: "Benzin",
    year: "10/2021", km: "114.xxx", power: "150 KS", gearbox: "DSG, 7 stupnjeva", status: "stock", price: 20000,
    vat: true, tagline: "Jedan od najboljih 4-cilindričnih turbo benzinaca današnjice.",
    equip: ["Full LED", "Mrtvi kut", "Grijana sjedala", "Parkirna kamera"],
    notes: ["Uvoz iz Njemačke", "Uredno servisiran u ovlaštenoj mreži", "Gotovo nove gume i novi servis", "Mogućnost odbitka PDV-a za tvrtke"]
  },
  {
    id: "mercedes-b200d", n: 5, make: "Mercedes-Benz", model: "B 200 d Sport", type: "osobni", fuel: "Diesel",
    year: "2022", km: "94.xxx", power: "110 kW / 150 KS", gearbox: "Automatik, 8 stupnjeva", status: "stock", price: null,
    vat: false, tagline: "Novo na lageru. Sport paket, nove ljetne gume, svježi servis.",
    equip: ["Sport paket (alu 18″)", "Crni svod stropa", "Sport sjedala", "Servo otvaranje petih vrata", "Navigacijski sustav s glasovnim upravljanjem", "Ambijentalno osvjetljenje", "Parkirna kamera", "Grijana sjedala", "Izmjena stupnjeva na upravljaču", "Električno sklapanje zrcala", "DAB radio", "2× USB-C", "Line assist", "Front assist"],
    notes: ["Nove ljetne gume", "Novo ulje te svi filteri"]
  },
  {
    id: "bmw-318d", n: 5, make: "BMW", model: "318d (G20) Automatik", type: "osobni", fuel: "Diesel",
    year: "2022", km: "132.xxx", power: "110 kW / 150 KS", gearbox: "Steptronic, 8 stupnjeva", status: "soon", statusNote: "Uskoro na lageru", price: null,
    vat: true, tagline: "Limuzina G20 s bogatom opremom i BMW Live Cockpitom.",
    equip: ["Full LED", "BMW Live Cockpit", "DAB radio", "Hi-Fi", "Chrom paket", "Alu 17″", "Parkirni senzori", "Sport upravljač", "Tempomat"],
    notes: ["Vozilo u sustavu PDV-a"]
  },
  {
    id: "skoda-octavia-combi", n: 5, make: "Škoda", model: "Octavia Combi 2.0 TDI", type: "osobni", fuel: "Diesel",
    year: "07/2023", km: "149.xxx", power: "85 kW / 116 KS", gearbox: "Automatik, 7 stupnjeva", status: "soon", statusNote: "Uskoro na lageru", price: null,
    vat: true, tagline: "Prostrani karavan, model 2024. Idealan za obitelj i poslovne vožnje.",
    equip: ["Full LED", "Aktivni zaslon", "DAB radio", "Pokretanje bez ključa", "Alu 16″", "Parkirni senzori", "Tempomat", "Line assist", "Parkirna kamera"],
    notes: ["Vozilo u sustavu PDV-a"]
  },
  {
    id: "skoda-karoq", n: 5, make: "Škoda", model: "Karoq 2.0 TDI DSG7 Ambition", type: "osobni", fuel: "Diesel",
    year: "03/2023", km: "158.xxx", power: "2.0 TDI", gearbox: "DSG, 7 stupnjeva", status: "soon", statusNote: "U dolasku", price: 18600,
    vat: false, tagline: "Cijena s PDV-om, PPMV-om i homologacijom — bez troška prijenosa vlasništva.",
    equip: ["Pokretanje bez ključa", "Full LED svjetla", "Parkirna kamera", "Navigacijski uređaj", "Adaptivni tempomat", "Line assist", "Front assist"],
    notes: ["Jamstvo do 200.000 km ili 24 mjeseca", "Cijena uključuje PDV, PPMV i homologaciju", "Bez troška na prijenos vlasništva"]
  },
  {
    id: "opel-grandland", n: 5, make: "Opel", model: "Grandland (redizajn)", type: "osobni", fuel: "Diesel",
    year: "05/2022", km: "100.800", power: "130 KS", gearbox: "Automatik, 8 stupnjeva", status: "soon", statusNote: "U dolasku koncem mjeseca", price: 16600,
    vat: true, tagline: "Novi model, vrhunski opremljen — s mogućnošću leasinga do 84 mjeseca.",
    equip: ["Full LED svjetla", "Virtualna instrument ploča", "Sport sjedala", "Alu 18″", "Parkirna kamera", "Sustavi aktivne asistencije"],
    notes: ["Odbitak PDV-a za pravne osobe", "Mogućnost leasinga do 84 mjeseca", "Mogućnost jamstva 24 mjeseca"]
  },
  {
    id: "peugeot-208-sport", n: 5, make: "Peugeot", model: "208 Sport 1.2 Turbo", type: "osobni", fuel: "Benzin",
    year: "2023", km: "103.xxx", power: "100 KS", gearbox: "Ručni, 6 stupnjeva", status: "stock", price: 10000,
    vat: false, tagline: "Upravo stiglo na lager. Svježa distribucija i novi servis.",
    equip: ["Full LED + light assist", "Alu naplatci 16″", "Klima", "Navigacija", "Parkirni senzori straga", "Bluetooth", "Električno sklapanje retrovizora", "Tempomat", "ESP", "ISOFIX", "Line assist"],
    notes: ["Upravo izvršena izmjena zupčastog remena (Continental set)", "Novi redovni servis ulja i filtera"]
  },
  {
    id: "peugeot-208-allure", n: 5, make: "Peugeot", model: "208 Allure 1.2 T", type: "osobni", fuel: "Benzin",
    year: "2018", km: "111.xxx", power: "110 KS", gearbox: "Ručni", status: "stock", price: 6600,
    vat: false, tagline: "Allure oprema, nove gume i izmijenjena distribucija.",
    equip: ["Chrom paket", "Alu naplatci", "Automatska klima", "Navigacija", "Parkirni senzori straga", "Bluetooth", "Električno sklapanje retrovizora", "Središnji naslon za ruku", "Tempomat", "ESP", "ISOFIX"],
    notes: ["Nove gume", "Novi redovni servis", "Distribucija izmijenjena na 84.xxx km"]
  },
  {
    id: "peugeot-208-turbo", n: 5, make: "Peugeot", model: "208 1.2 Turbo", type: "osobni", fuel: "Benzin",
    year: "04/2023", km: "103.xxx", power: "110 KS", gearbox: "Ručni, 6 stupnjeva", status: "stock", price: null,
    vat: false, tagline: "Bogato opremljeno vozilo, u prometu od travnja 2023.",
    equip: [], notes: ["Ostale informacije na telefonski poziv"]
  },
  {
    id: "peugeot-208-2020", n: 5, make: "Peugeot", model: "208 1.2 PureTech", type: "osobni", fuel: "Benzin",
    year: "2020", km: "48.xxx", power: "75 KS", gearbox: "Ručni", status: "soon", statusNote: "U dolasku s juga Francuske", price: null,
    vat: false, tagline: "Niska kilometraža, atmosferski benzinac, Euro 6.",
    equip: [], notes: ["Atmosferski motor", "Euro 6"]
  },
  {
    id: "peugeot-208-puretech", n: 5, make: "Peugeot", model: "208 1.2 i", type: "osobni", fuel: "Benzin",
    year: "12/2021", km: "98.xxx", power: "75 KS", gearbox: "Ručni", status: "soon", statusNote: "U dolasku iz Francuske · 3 komada", price: null,
    vat: false, tagline: "Dostupna u tri komada. U prometu od 21.12.2021.",
    equip: [], notes: ["Dostupna 3 komada"]
  },
  {
    id: "renault-clio", n: 4, make: "Renault", model: "Clio SCe", type: "osobni", fuel: "Benzin",
    year: "07/2021", km: "89.xxx", power: "65 KS", gearbox: "Ručni", status: "stock", price: null,
    vat: false, tagline: "Atmosferski benzinac. Pouzdan gradski kompakt.",
    equip: [], notes: ["U prometu od 22.07.2021."]
  },
  {
    id: "toyota-corolla-verso", n: 5, make: "Toyota", model: "Corolla Verso 1.6 D", type: "osobni", fuel: "Diesel",
    year: "2015", km: "160.xxx", power: "82 kW / 112 KS", gearbox: "Ručni", status: "soon", statusNote: "Dostupna za cca tjedan dana", price: null,
    vat: false, tagline: "Prostrani obiteljski monovolumen, Euro 5.",
    equip: ["Panoramski krov", "Tempomat", "Parkirni senzori", "Alu naplatci", "ESP"], notes: ["Euro 5"]
  },
  {
    id: "renault-zoe", n: 5, make: "Renault", model: "Zoe R50", type: "elektricni", fuel: "Električni",
    year: "2020", km: "59.xxx", power: "Baterija 50 kWh", gearbox: "Automatik", status: "soon", statusNote: "Stiže nam", price: null,
    vat: false, tagline: "Jedno od najboljih električnih vozila u klasi. Preko 350 km dometa.",
    equip: [], notes: ["Stvarna kombinirana potrošnja 13–14 kWh na 100 km", "Domet preko 350 km", "Mogućnost brzog punjenja", "Vrhunski opremljen za kategoriju"]
  },
  {
    id: "renault-master-l3h2", n: 5, make: "Renault", model: "Master 2.3 dCi L3H2", type: "gospodarsko", fuel: "Diesel",
    year: "11/2018", km: "265.xxx", power: "130 KS", gearbox: "Ručni", status: "stock", price: null,
    vat: true, tagline: "Duljina vozila preko 6 metara. Kupljen i servisiran u Hrvatskoj.",
    equip: ["Klima", "Sjedala", "Tempomat", "ESP", "Bluetooth"],
    notes: ["Euro 6, prvi vlasnik", "Korišten za prijevoz uredskog materijala", "Bez korozije, mehanički vrhunsko stanje", "Zamijenjen set kvačila, ulje i svi filteri", "Letva volana 1/1, motor suh, ništa ne kapa", "Vozilo u sustavu PDV-a"]
  },
  {
    id: "renault-master-l1h2", n: 5, make: "Renault", model: "Master Furgon L1H2 3.5t", type: "gospodarsko", fuel: "Diesel",
    year: "—", km: "158.xxx", power: "96 kW / 130 KS", gearbox: "Ručni, 6 stupnjeva", status: "soon", statusNote: "U dolasku kroz 15 radnih dana", price: null,
    vat: true, tagline: "Pouzdano gospodarsko vozilo — kompaktne dimenzije, visoka nosivost.",
    equip: ["3 sjedala", "ESP + ABS", "Klima"],
    notes: ["2.3 dCi, Euro 6 s AdBlue tehnologijom", "Okretni moment 330 Nm", "Ukupna masa 3,5 t — vozi se s B kategorijom", "Teretni prostor oko 8 m³, unutarnja visina oko 1,90 m", "Potrošnja u kombiniranoj vožnji 7,5–8,5 l / 100 km"]
  },
  {
    id: "citroen-jumper", n: 5, make: "Citroën", model: "Jumper Kiper 35 L2 BlueHDi", type: "gospodarsko", fuel: "Diesel",
    year: "31.12.2025.", km: "12", power: "140 KS", gearbox: "Ručni, 6 stupnjeva", status: "stock", price: null,
    vat: true, tagline: "Novo vozilo, 12 km. Registrirano i odjavljeno. 100% PDV odbitak.",
    equip: ["3 sjedala", "Klima", "ESP", "Kiper"],
    notes: ["Tvorničko jamstvo", "100 % PDV odbitak", "Moguća dostava u cijelu EU"]
  },
  {
    id: "indian-scout", n: 5, make: "Indian", model: "Scout 1133", type: "motocikl", fuel: "Benzin",
    year: "2023", km: "10.xxx", power: "100 KS", gearbox: "Ručni", status: "soon", statusNote: "U dolasku iz Francuske", price: null,
    vat: false, tagline: "Američki V-Twin, duša cruisera.",
    equip: [], notes: ["V-Twin motor, 100 KS"]
  },
  {
    id: "suzuki-burgman", n: 5, make: "Suzuki", model: "Burgman 650 Executive", type: "motocikl", fuel: "Benzin",
    year: "2017", km: "37.xxx", power: "56 KS", gearbox: "Automatik (CVT)", status: "stock", price: 6900,
    vat: false, tagline: "Maxi skuter s grijanjem i električnim vizirom. Novi servis mjenjača.",
    equip: ["ABS", "Električno podesiv vizir", "Grijana sjedala", "Grijani upravljač", "Električno sklapanje retrovizora"],
    notes: ["Registriran do 3/2027", "2 cilindra, 56 KS", "Novi veliki servis mjenjača, nove pločice, sva ulja i gume", "Car Vertical 1/1", "Kupac oslobođen troška prijenosa vlasništva (R-1)", "Moguća zamjena uz doplatu za BMW GS ili XR"]
  }
];

window.TYPES = { osobni: "Osobni", gospodarsko: "Gospodarski", elektricni: "Električni", motocikl: "Motocikli" };
