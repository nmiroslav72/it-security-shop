import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";
import { SortSelect } from "@/components/shop/SortSelect";

const PER_PAGE = 16;

const META_DESCRIPTIONS: Record<string, { title: string; description: string }> = {
  "hd-kamere": {
    title: "HD Kamere za video nadzor - Hikvision, Dahua | IT Security Beograd",
    description: "Kupite HD kamere za video nadzor - 2MP, 4MP, 5MP, 8MP, 4K. Hikvision, Dahua, Uniview. Ugradnja u Beogradu. Garancija 3 godine. Pozovite 063224651.",
  },
  "ip-kamere": {
    title: "IP kamere za video nadzor - Smart funkcije | IT Security Beograd",
    description: "IP kamere visoke rezolucije sa AI funkcijama - prepoznavanje lica, vozila, perimetarska zastita. Dahua, Hikvision. Prodaja i montaza Beograd. 063224651.",
  },
  "wifi-kamere-bezicne": {
    title: "WiFi bezicne kamere za video nadzor | IT Security Beograd",
    description: "WiFi kamere za video nadzor bez kablova. Idealne za vikendice, stanove i objekte bez infrastrukture. Dahua, Hikvision. Ugradnja Beograd. 063224651.",
  },
  "dvr-digitalni-snimaci": {
    title: "DVR digitalni snimaci za video nadzor - Dahua, Hikvision | IT Security",
    description: "DVR i XVR digitalni snimaci 4, 8, 16, 32 kanala. Dahua, Hikvision, TVT. Rezolucija do 8MPX. Prodaja i ugradnja u Beogradu. Garancija 2 godine. 063224651.",
  },
  "nvr-mrezni-snimaci": {
    title: "NVR mrezni snimaci za IP kamere - Dahua, Hikvision | IT Security",
    description: "NVR mrezni snimaci za IP video nadzor. 4 do 32 kanala, rezolucija do 12MPX. POE i non-POE modeli. Ugradnja Beograd. Garancija 3 godine. 063224651.",
  },
  "kompleti-video-nadzora": {
    title: "Kompleti video nadzora - kamere i snimac | IT Security Beograd",
    description: "Gotovi kompleti video nadzora sa kamerama i snimacem. HD i IP kompleti za stan, kucu i poslovni prostor. Ugradnja u Beogradu. Pozovite 063224651.",
  },
  "wifi-kamere-bezicne": {
    h1: "WiFi bezicne kamere za video nadzor - Prodaja i ugradnja Beograd",
    sections: [
      {
        h2: "Sta su WiFi kamere za video nadzor?",
        image: "/uploads/wifi-kamera-video-nadzor-princip-rada.gif",
        text: "WiFi kamere za video nadzor su IP kamere koje se u sistem video nadzora povezuju putem WiFi mreze. Da bi video nadzor sa WiFi kamerama funkcionisao dobro neophodno je da kamera prima dobar WiFi signal sa mreze. Upotreba WiFi kamera smanjuje potrosnju kablova i razvlacenje kablova po objektu jer se napajanje moze dovesti sa najblize naponske uticnice.",
        subsections: [
          { h3: "Instalacija na vecim udaljenostima", text: "WiFi kamere se mogu instalirati na vecim udaljenostima primenom usmerenih WiFi antena. Video nadzor moze biti instaliran na mestima gde je tesko razvlaciti kablove, ali je neophodan izvor napajanja za kamere i WiFi antene." },
          { h3: "Smart funkcije WiFi kamera", text: "WiFi kamere imaju sve funkcionalnosti ukljucujuci i smart funkcije kao kod IP kamera: snimanje na pokret, auto fokus, auto zoom, WDR, perimetarska zastita, prepoznavanje ljudi i vozila, brojanje ljudi i prepoznavanje lica." },
          { h3: "Snimanje bez NVR snimaca", text: "WiFi kamere mogu da rade bez NVR mrežnog snimaca. Mogu se prikljuciti na NVR mrežni snimac za snimanje podataka ili da snimaju na SD karticu kapaciteta do 256 GB." },
        ],
      },
      {
        h2: "Kako funkcionise WiFi video nadzor?",
        image: "/uploads/wireless-bezicni-alarm.gif",
        text: "WiFi kamera se povezuje bezicno putem wireless signala na vas ruter. Napajanje se povezuje zicno na kameru. NVR snimac se povezuje zicno na vas ruter i tako su kamera i NVR u istoj lokalnoj LAN mrezi. Ruter je povezan na internet i putem mobilnog telefona mozemo da gledamo kamere sa bilo kog mesta.",
        subsections: [
          { h3: "Kvalitet WiFi signala", text: "Ako na vasem telefonu na mestu instalacije WiFi kamere imate odlican ili dobar signal, tu mozete da postavite kameru. Svi ostali signali nisu dobri i necete moci da povezete kameru na kucni ruter. U tom slucaju instalirati dodatni access point ili mesh ruter." },
          { h3: "Kada koristiti WiFi kamere?", text: "Video nadzor sa WiFi kamerama se obicno upotrebljava na objektima gde je ograniceno razvlacenje kablova - vikendice, iznajmljeni prostori, garaže i dvorista bez infrastrukture za kablove." },
        ],
      },
      { h2: "Ugradnja WiFi kamera u Beogradu", text: "WiFi bezicne kamere imaju razlicite karakteristike i funkcije. Ako niste sigurni koja je WiFi kamera odgovarajuca za vase potrebe, pozovite nas. Kontakt: 063224651 - dostupni smo 7 dana u nedelji." },
    ],
  },
  "bezicni-alarmi": {
    h1: "Bezicni alarmi za stan i kucu bez razvlacenja kablova | IT Security Beograd",
    sections: [
      {
        h2: "Sta su bezicni alarmni sistemi i kako funkcionisu?",
        image: "/uploads/wireless-bezicni-alarm.gif",
        text: "Bezicni alarmni sistemi nam omogucavaju zastitu objekta od provale bez razvlacenja kablova po objektu. Bezicni alarmni sistem ima jednaku detekciju alarma kao i zicani. Bezicni alarmi su posebno pogodni na mestima gde ne zelimo da busimo zidove i razvlacimo kablove.",
        subsections: [
          { h3: "Delovi bezicnog alarmnog sistema", text: "Bezicni alarmi imaju sve delove kao i zicani: alarmna centrala, sifrator, daljinski upravljac, detektor pokreta, sirena, akumulatorska baterija i napojni adapter. Svi elementi se bezicno povezuju na alarmnu centralu putem radio signala." },
          { h3: "Bezicni alarmni hub - centrala koja radi preko interneta", text: "Bezicni alarmni hub je centrala koja radi preko interneta tj. cloud servisa. Na hub se bezicno dodaju: senzor pokreta, magnetni kontakt, sirena, pozarni senzor i senzor za poplavu. Korisnik putem aplikacije pali i gasi alarm i dobija obavestenja." },
          { h3: "Baterije bezicnih senzora - trajnost do 3 godine", text: "Bezicni senzor u sebi ima bateriju koja moze da traje do tri godine. Kada se baterija isprazni korisnik putem aplikacije dobija poruku da je potrebna zamena baterije." },
          { h3: "Bezicni alarm bez sifratora", text: "Bezicni alarm radi i bez sifratora jer alarm mozemo da palimo i gasimo pomocu daljinskog upravljaca ili putem mobilnog telefona. Na ovaj nacin se dobija povoljnija cena sistema.", image: "/uploads/bezicni-alarm-bez-sifratora.gif" },
        ],
      },
      {
        h2: "Vodeci brendovi bezicnih alarma - Ajax, Paradox, Dahua",
        text: "Najpoznatiji bezicni alarmi su: Ajax, Paradox, Jablotron, Risco, Texacom, Teletek i Dahua. Ajax je trenutno najbolji bezicni alarm u Evropi. Paradox ima hibridne centrale koje primaju i zicane i bezicne elemente. U ponudi imamo sve navedene brendove.",
      },
      {
        h2: "Ugradnja bezicnih alarma u Beogradu - bez busenja i kablova",
        text: "IT Security vrsi profesionalnu ugradnju bezicnih alarmnih sistema u Beogradu i okolini. Uz ugradnju dobijate: plan i projekat alarmnog sistema, ugovor o tehnickom odrzavanju i prijavu u MUP-u. Kontakt: 063224651 - dostupni 7 dana u nedelji.",
      },
    ],
  },
  "alarmi": {
    title: "Alarm sistemi - bezicni i zicani alarmi | IT Security Beograd",
    description: "Alarmni sistemi za zastitu doma i poslovnog prostora. Ajax, Dahua, Paradox. Bezicni i zicani alarmi. Montaza u Beogradu. Garancija 3 godine. 063224651.",
  },
  "bezicni-alarmi": {
    title: "Bezicni alarmi za stan i kucu - Ajax, Dahua | IT Security Beograd",
    description: "Bezicni alarmni sistemi za brzu instalaciju bez kablova. Ajax, Dahua, Paradox. Idealni za stanove, vikendice i iznajmljene prostore. Beograd. 063224651.",
  },
  "interfoni": {
    title: "Interfoni i video interfoni - Dahua, Comelit | IT Security Beograd",
    description: "Audio i video interfoni za stanove, kuce i poslovne prostore. Dahua, Comelit, Hikvision. IP video interfoni sa mobilnom aplikacijom. Beograd. 063224651.",
  },
};


const SEO_CONTENT: Record<string, {
  h1: string;
  intro?: string;
  sections: { h2: string; text: string; image?: string; subsections?: { h3: string; text: string; image?: string }[] }[];
}> = {
  "hd-kamere": {
    h1: "HD Kamere za video nadzor - Prodaja i ugradnja Beograd",
    sections: [
      {
        h2: "Rezolucija HD kamera za video nadzor",
        image: "/uploads/4k-vs-5mp-vs-4mp-vs-1080p.jpg",
        text: "Rezolucija kamere za video nadzor je broj piksela tj. tacaka koje formiraju sliku (duzina x visina). Sto je rezolucija HD kamere veca, slika je jasnija i detaljnija. Visoka rezolucija HD kamere omogucava preciznu identifikaciju lica, tablica i detalja cak i pri uvecavanju snimka. U ponudi imamo HD kamere rezolucije od 2MP do 4K - sve po povoljnim cenama sa garancijom.",
        subsections: [
          { h3: "4K HD kamere - 3840x2160 - cena i ugradnja", text: "4K HD kamere za video nadzor pruzaju najvecu dostupnu rezoluciju. Idealne za nadzor velikih prostora, parkinga, magacina i objekata gde je potrebna maksimalna preciznost slike. Cena 4K kamera je dostigla pristupacni nivo - pozovite za aktuelnu cenu i ponudu ugradnje." },
          { h3: "5MP HD kamere - 2560x1920 - najprodavanije", text: "5MP HD kamere za video nadzor su nase najprodavanije - pruzaju odlican balans kvaliteta i cene. Znatno bolju sliku od 1080p uz prihvatljivo opterecenje mreze i diska. Preporucujemo ih za ulaze u objekte, prodavnice, restorane i poslovne prostore u Beogradu." },
          { h3: "4MP HD kamere - 2560x1440", text: "4MP HD kamere su popularan izbor za stambene objekte, kuce i manje poslovne prostore. Odlican odnos cene i kvaliteta slike. Kompatibilne sa vecinom DVR i NVR snimaca na trzistu." },
          { h3: "1080p HD kamere - 1920x1080 - najpovoljnije", text: "Full HD 1080p kamere za video nadzor su najpovoljnija opcija koja je i danas standard za video nadzor. Idealne za unutrasnje prostore, hodnike i stanove. Dostupne u domenskim, bullet i PTZ izvedbama." },
        ],
      },
      { h2: "Kako odabrati pravu HD kameru za video nadzor?", text: "Pri odabiru HD kamere za video nadzor vazno je uzeti u obzir velicinu prostora koji zelite da nadzirete, osvetljenost (dnevna svetlost, vestacko osvetljenje ili nocno snimanje) i nacin montaze (zidna, plafonska, kutna). Takodje je bitna i duzina kabla do DVR snimaca. Nasim strucnjacima mozete se obratiti za besplatne savete - dostupni smo 7 dana u nedelji na broj 063224651." },
      { h2: "Ugradnja HD kamera za video nadzor u Beogradu", text: "IT Security nudi kompletnu uslugu ugradnje i montaze HD kamera za video nadzor u Beogradu i okolini. Nasa ekipa iskusnih tehnicara instalira sisteme video nadzora za stanove, kuce, poslovne prostore, magacine i objekte svih velicina. Uz kupovinu HD kamera kod nas, ugradnja je po povlascenim cenama. Garancija na ugradnju je 1 godina, a na opremu 2 do 3 godine." },
    ],
  },
  "ip-kamere": {
    h1: "IP kamere za video nadzor - Prodaja i montaza Beograd",
    sections: [
      {
        h2: "Sta su IP kamere za video nadzor?",
        image: "/uploads/prednosti_ip_kamere.png",
        text: "IP kamere su digitalne kamere koje generisu sliku u digitalnom formatu i koriste IP protokol za slanje slike na mrezu. Zbog toga imaju kvalitetniju i ostriju sliku od analognih kamera. IP video nadzor je kvalitetniji i nudi mnoge dodatne funkcije koje omogucava IP kamera.",
        subsections: [
          { h3: "Povezivanje IP kamera", text: "IP kamere imaju ugradjen LAN ili WiFi modul za povezivanje na lokalnu ili internet mrezu. IP kamera moze joj se pristupiti direktno preko aplikacije bez dodatnih uredaja kao sto je potreban DVR digitalni snimac za analogne kamere." },
          { h3: "Smart funkcije IP kamera", text: "Brojanje ljudi koji su usli u definisano podrucje, prepoznavanje lica i vozila, perimetarska zastita, two-way komunikacija putem ugradnjenog mikrofona i zvucnika, prepoznavanje tablica i pretraga prema broju tablice." },
          { h3: "PTZ IP kamere", text: "PTZ IP kamere omogucavaju pokretanje kamere u svim pravcima horizontalno i vertikalno i uvecanje slike do 45 puta. Sa jednom PTZ kamerom mogu da se pokriju velike povrsine." },
          { h3: "WiFi IP kamere", text: "WiFi kamere se povezuju na mrezu bezicno ali je za njihovo napajanje neophodno dovesti kabal. Idealne su za prostore gde nije moguce provlacenje mreznih kablova." },
        ],
      },
      {
        h2: "Karakteristike i prednosti IP kamera",
        image: "/uploads/rezolucija-kamera-zastupljnost.gif",
        text: "IP kamere podrzavaju mnoge smart funkcije koje omogucavaju primenu vestacke inteligencije AI na kontrolu prostora. Smart funkcija tripwire omogucava da obelezimo liniju kao parametar - u slucaju da neki objekat prede definisanu liniju aktivirace se alarm. Smart funkcija intrusion omogucava obelezavanje podrucja u vidu bilo kog oblika poligona.",
        subsections: [
          { h3: "NVR mrezni snimac", text: "IP kamere se mogu povezati na NVR mrezni snimac koji ce biti centralni uredaj za snimanje i obradu podataka. NVR moze biti 4, 8, 16 ili 32 kanalni. Takodje IP kamere ne moraju biti limitirane brojem jer mozemo podici serversku aplikaciju za stotine kamera." },
          { h3: "SD kartica i lokalno snimanje", text: "IP kamere mogu imati slot za SD karticu na koju se snimaju podaci. IP kamere imaju podrsku za SD kartice do 256 gigabajta, a novije IP kamere i do 512 gigabajta." },
          { h3: "Dahua TIOC kamere sa LED osvetljenjem", text: "Novija serija Dahua IP kamera ima LED osvetljenje koje omogucava sliku u boji kada je mrak i funkciju aktivnog odvracanja. Dahua TIOC serija ima pored belog i plavo i crveno LED svetlo koje radi kao alarm naizmenicno se paleci i gaseci." },
          { h3: "Vodeci brendovi - Hikvision i Dahua", text: "Hikvision i Dahua imaju u svojim pogonima vise stotina razvojnih inzenjera sto im omogucava najveci broj patenata u IP video nadzoru. Nasa oprema je od ovih brendova i ima najbolji odnos cene i kvaliteta." },
        ],
      },
      {
        h2: "Dodatna oprema za IP video nadzor",
        text: "Opremu cini IP kamera, NVR mrezni snimac i hard disk. Dodatna oprema su kablovi: mrezni (UTP, FTP, SFTP), RJ45 konektori ili moduli, napajanja, switchevi i ruteri. Maksimalna duzina kabla izmedju kamera je 100 metara - ako je vise onda se mora staviti switch koji pojacava signal. Za vece daljine koriste se opticki kablovi.",
      },
      {
        h2: "Instalacija IP kamera u Beogradu - povoljne cene ugradnje",
        text: "IT Security tim instalira IP kamere za stanove, kuce, poslovne prostore i industrijske objekte u Beogradu i okolini. Iskustvo od 2008. godine, garancija 3 godine na ugradeni sistem. Uz kupovinu IP kamera kod nas ugradnja je po povlascenim cenama. Kontakt: 063224651 - dostupni smo 7 dana u nedelji.",
      },
    ],
  },
  "dvr-digitalni-snimaci": {
    h1: "DVR digitalni snimaci za video nadzor - Dahua, Hikvision Beograd",
    sections: [
      {
        h2: "Sta su DVR snimaci?",
        image: "/uploads/hd-kamera-video-nadzor-princip-rada.gif",
        text: "DVR snimaci su osnovni deo opreme za video nadzor. DVR snimac je jako vazan jer od njegove rezolucije snimanja zavisi kvalitet slike u reprodukciji. DVR/XVR je snimac za video nadzor koji sluzi za snimanje podataka sa analognih HD kamera (HDCVI, HDTVI, AHD, CVBS), pregledanje i bekapovanje podataka.",
        subsections: [
          { h3: "Broj kanala DVR snimaca", text: "DVR snimaci mogu biti 4 kanalni, 8 kanalni, 16 kanalni, 32 kanalni... Broj kanala je broj ulaza za kamere koji se nalazi na DVR-u. Kablovi RG59 i UTP mrezni kablovi se koriste za povezivanje HD kamera sa DVR snimacem. Kablovi RG59 mogu imati maksimalnu duzinu do 500 metara a UTP kablovi do 300 metara." },
          { h3: "Rezolucija snimanja", text: "DVR snimaci podrzavaju razlicite rezolucije snimanja od 2 megapiksela do 16 megapiksela. Vazno je da kamere za video nadzor i digitalni DVR snimaci imaju odgovarajucu rezoluciju snimanja. Ako imamo kamere rezolucije 2MPX a DVR snimac koji snima manju rezoluciju, dobijamo losiji snimak od kamere." },
          { h3: "Hard disk i kapacitet snimanja", text: "Snimanje se vrsi na hard disku. Podrzani su kapaciteti diska do 12 terabajta. DVR snimaci mogu imati i vise od jednog diska za redundantnost. Zakon o bezbednosti nalaze da se mora imati dovoljan kapacitet hard diska za skladistenje podataka od mesec dana trajanja." },
          { h3: "Alarmni ulazi i USB", text: "DVR snimaci mogu imati alarmne ulaze na koje se mogu prikljuciti alarmni senzori koji mogu da pokrenu snimanje i slanje poruka. Svaki DVR/XVR ili NVR ima prikljucak za USB koji sluzi za prebacivanje snimka ili povezivanje misa za upravljanje uredjajem." },
        ],
      },
      {
        h2: "Zadnja strana XVR/DVR snimaca",
        image: "/uploads/xvr-dvr-zadnja-strana.gif",
        text: "Na slici je prikazana zadnja strana XVR/DVR snimaca sa svim ulazima za kablove: ulazi za kamere, ulaz za mikrofon, ulaz za zvucnik, ulaz za HDMI kabal, ulaz za VGA kabal za monitor, ulaz za internet kabal, USB ulaz za mis ili memoriju, alarmni ulaz za senzore i napajanje snimaca.",
      },
      {
        h2: "Brendovi DVR snimaca",
        text: "U ponudi imamo DVR snimace i NVR mrezne snimace: Dahua, Hikvision, TVT. Snimaci su mrezni uredjaji i putem aplikacije za mobilni telefon ili laptop mozemo da vrsimo pregled i uzivo gledanje. Dahua, Hikvision i ostali DVR proizvodjaci imaju slicne funkcionalnosti - najveca razlika je u grafickom interfejsu (GUI) putem kojeg korisnik upravlja DVR-om.",
      },
      {
        h2: "Kupovina DVR snimaca",
        text: "Kupovina na sajtu je jednostavna - kada izaberete snimac, kliknite na dugme dodaj u korpu. Robu placate tek kad preuzmete od dostavljaca. Ako tehnicku niste dovoljno informisani ili ne zelite da gubite vreme na istrazivanje, jednostavno nas nazovite. Kontakt: 063224651 - dostupni smo 7 dana u nedelji.",
      },
    ],
  },
  "nvr-mrezni-snimaci": {
    h1: "NVR mrezni snimaci za IP video nadzor - Dahua, Hikvision Beograd",
    sections: [
      {
        h2: "Sta su NVR snimaci?",
        image: "/uploads/ip-kamera-video-nadzor-princip-rada.gif",
        text: "NVR snimaci su uredjaji koji sluze za snimanje video slike sa IP kamera za video nadzor. NVR snimaci su centralno mesto sa kojeg se moze upravljati kamerama, pregledati snimljeni materijal, upravljati pravom pristupa uredajju i vrsiti razna podesavanja kao sto su perimetarska zastita, prepoznavanje ljudi i vozila, prepoznavanje lica.",
        subsections: [
          { h3: "Broj kanala i rezolucija", text: "NVR snimaci podrzavaju rezolucije snimanja do 12MPX po jednom ulaznom prikljucku. NVR moze imati 4, 8, 16 ili 32 kanala za kamere. U svaki NVR snimac se ugraduje hard disk kapaciteta 1-16 terabajta. Pojedini NVR snimaci mogu imati slot za ugradnju dva i vise HDD diskova za redundantnost sistema." },
          { h3: "Snimanje na pokret i FTP server", text: "NVR snimaci imaju mogucnost definisanja snimanja na pokret - podaci se snimaju samo ako se neki objekat pomeri u vidnom polju kamere. Snimanje pocinje 5 sekundi pre pomeranja i zavrsava se 5 sekundi posle. Snimak se moze slati i na udaljeni FTP server, sto znaci da cak i ako dodje do otudenja NVR snimaca, video podaci su sacuvani." },
          { h3: "Hard diskovi za video nadzor", text: "U NVR snimace se ugraduju hard diskovi testirani za video nadzor - testirani na snimanje 24/7 neprekidno. To su diskovi proizvodjaca Seagate serije Greenline i WesternDigital serije Purple. Dajemo garanciju od 2 godine na hard diskove kupljene i ugradene od nas." },
          { h3: "Audio snimanje i ONVIF protokol", text: "Snimanje audio zvuka vrsi se preko audio ulaza na snimacu na koji se povezuju eksterni mikrofon, ili direktno sa kamere ako IP kamera ima ugradjen mikrofon. Danasnje IP kamere rade na ONVIF protokolu sto nam omogucava da se kamere od Hikvision vide na Dahua NVR mreznom snimacu i obrnuto." },
        ],
      },
      {
        h2: "Tipovi NVR snimaca - sa i bez POE ulaza",
        image: "/uploads/nvr-ulaz-sa-kamerama-i-bez.gif",
        text: "Postoje dve vrste NVR snimaca: NVR sa posebnim ulazima za svaku kameru koji ujedno sluzei kao POE switch - svaka kamera dobija napajanje preko mreznog ulaza. I NVR bez ulaza za IP kamere koji ima samo jedan mrezni ulaz za prikljucenje na lokalnu mrezu - sve kamere se dodaju direktno na ruter ili switch u okviru iste LAN mreze.",
      },
      {
        h2: "Brendovi i garancija",
        text: "Najbolji NVR snimaci su od brendova Dahua i Hikvision. Generalne karakteristike NVR snimaca oba brenda su skoro iste - najveca razlika je u korisnickom interfejsu i aplikacijama za mobilne telefone. Sistemi video nadzora koje smo ugradili imaju garanciju 3 godine, a sva oprema za video nadzor ima garanciju 2 godine.",
      },
      {
        h2: "Kontakt i savet za NVR snimac",
        text: "Kao inzenjer informatike sa licencama za planiranje i projektovanje, nadzor nad izvodjenjem, montazu, odrzavanje i obuku korisnika, stojim vam na raspolaganju za sva vasa pitanja u vezi video nadzora. Video nadzor po vasoj meri - pozovite kontakt 063224651 i nacicemo resenje za vase potrebe. Dostupni smo 7 dana u nedelji.",
      },
    ],
  },
  "kompleti-video-nadzora": {
    h1: "Kompleti video nadzora - kamere, snimac i hard disk | Beograd",
    sections: [
      {
        h2: "Zasto kupiti komplet video nadzora?",
        text: "Kompleti video nadzora su idealno resenje za one koji zele da postave video nadzor bez potrebe za izborom svake komponente posebno. U kompletu dobijate kamere, snimac i hard disk koji su medjusobno kompatibilni i testirani da rade zajedno. Na ovaj nacin stedite vreme i novac, a video nadzor je spreman za instalaciju odmah po isporuci.",
        subsections: [
          { h3: "Sta se nalazi u kompletu?", text: "Svaki komplet video nadzora sadrzi: kamere za video nadzor (2, 4 ili 8 kamera), DVR ili NVR snimac odgovarajuceg broja kanala i hard disk za snimanje. Pojedini kompleti sadrze i dodatnu opremu kao sto su kablovi, napajanja i konektori." },
          { h3: "HD analogni kompleti sa DVR snimaceom", text: "HD analogni kompleti sadrze HD kamere (2MPX, 5MPX ili 8MPX) i DVR/XVR snimac. Kamere se povezuju na snimac putem koaksijalnog kabla RG59 ili UTP kabla. Idealni su za objekte gde vec postoji analogna kablovna infrastruktura." },
          { h3: "IP kompleti sa NVR snimaceom", text: "IP kompleti sadrze IP kamere visoke rezolucije (4MPX, 8MPX ili vise) i NVR mrezni snimac. Kamere se povezuju na snimac putem UTP mreznog kabla. IP kompleti pruzaju bolji kvalitet slike i vise smart funkcija od analognih kompleta." },
          { h3: "WiFi kompleti bez kablova", text: "WiFi kompleti su idealni za objekte gde nije moguce razvlacenje kablova. Kamere se povezuju na NVR snimac putem WiFi signala. Jedino sto je potrebno je dovesti napajanje do kamere. Idealni su za vikendice, iznajmljene prostore i dvorista." },
        ],
      },
      {
        h2: "Kako odabrati pravi komplet?",
        text: "Pri odabiru kompleta video nadzora najvaznije je odrediti broj kamera koje su vam potrebne i povrsinu koju zelite da nadzirete. Za stan ili manji poslovni prostor dovoljan je komplet sa 4 kamere. Za vecu kucu ili poslovni objekat preporucujemo komplet sa 8 kamera. Za parkinge i industrijske objekte kompleti sa 16 i vise kamera.",
        subsections: [
          { h3: "Komplet za stan i kucu", text: "Za stambene objekte preporucujemo komplet sa 4 HD kamere rezolucije 2MPX ili 5MPX i DVR snimac sa hard diskom od 1TB. Ovaj kapacitet diska je dovoljan za mesec dana snimanja u skladu sa zakonom o bezbednosti." },
          { h3: "Komplet za poslovni prostor", text: "Za prodavnice, restorane i manje poslovne prostore preporucujemo komplet sa 4 do 8 IP kamera rezolucije 4MPX ili 8MPX i NVR snimac. IP kamere pruzaju bolju sliku i smart funkcije kao sto su prepoznavanje lica i brojanje kupaca." },
          { h3: "Komplet za objekat ili parking", text: "Za vece objekte, parkinge i industrijske hale preporucujemo komplet sa 8 do 16 IP kamera visoke rezolucije (8MPX ili 4K) i NVR snimac sa vecim kapacitetom diska (2TB ili vise). PTZ kamere mogu pokriti veliku povrsinu sa jednom kamerom." },
        ],
      },
      {
        h2: "Ugradnja i montaza kompleta video nadzora",
        text: "IT Security nudi kompletnu uslugu ugradnje i montaze sistema video nadzora u Beogradu i okolini. Nase iskusne ekipe tehnicara instaliraju kompletan sistem: montaza kamera, razvlacenje kablova, podesavanje snimaca i mobilne aplikacije. Uz kupovinu kompleta kod nas, ugradnja je po povlascenim cenama.",
      },
      {
        h2: "Garancija i servis",
        text: "Svi kompleti video nadzora koje ugradimo imaju garanciju 3 godine na opremu i 1 godinu na instalaciju. Pruzamo i servis i odrzavanje sistema video nadzora. Pozovite nas na kontakt 063224651 za besplatnu procenu i ponudu. Dostupni smo 7 dana u nedelji.",
      },
    ],
  },
  "zicani-alarmi": {
    h1: "Zicani alarmi za kucu i stan - povoljne cene | IT Security Beograd",
    sections: [
      {
        h2: "Sta su zicani alarmi i kako funkcionisu?",
        image: "/uploads/povezivanje-zicanog-alarmnog-sistema.gif",
        text: "Zicani alarmi su alarmni sistemi koji stite i vrse kontrolu ulaska u vas prostor. Svi delovi zicanog alarmnog sistema su povezani kablom - detektor pokreta, sirena, pozarni senzor, senzor poplave i sifrator su zicano povezani na alarmnu centralu. Zbog zicane veze elementi su pouzdaniji i jeftiniji od bezicnih. Zicani alarmi ne zahtevaju punjenje baterija i rade bez prekida.",
        subsections: [
          { h3: "Detektori pokreta i senzori za zicani alarm", text: "Detektor pokreta za zicani alarm moze biti spoljni ili unutrasnji. Za prostoriju od oko 20m2 dovoljan je jedan PIR senzor, a za vrata jedan magnetni kontakt. Spoljni detektor se ne postavlja prema otvorenom prostoru sa drvecern jer mogu izazvati lazni alarm." },
          { h3: "GSM modul i upravljanje alarmom putem mobilnog telefona", text: "GSM modul omogucava telefonsku komunikaciju i slanje SMS poruka o stanju alarmnog sistema bez telefonske linije. Internet IP modul vam omogucava da putem aplikacije na pametnom telefonu palite i gasite zicani alarm i primate obavestenja u realnom vremenu." },
          { h3: "Zicani alarm za stan - unutrasnja sirena", text: "Zicani alarm za stan koristi unutrasnju sirenu. Cena zicanog alarma za stan je znatno niza od bezicnog resenja. Sistem stiti ulaze, prozore i unutrasnje prostorije sa PIR detektorima. Uz nasu ugradnju dobijate projekat i prijavu u MUP-u." },
          { h3: "Zicani alarm za kucu - spoljna sirena i veca zastita", text: "Zicani alarm za kucu koristi spoljnu sirenu koja je vidljivo postavljena i sluzi kao vizuelno odvracanje. Moze da stiti dvoriste spoljnim PIR detektorima, ulaze sa magnetnim kontaktima i unutrasnjost kuce. Moze biti prosiren do 64 zone zastite.", image: "/uploads/paradox-sifratori.gif" },
        ],
      },
      {
        h2: "Hibridni zicani alarm - Paradox Magellan",
        text: "Paradox Magellan centrale su hibridne alarmne centrale koje primaju i zicane i bezicne elemente. Paradox je kanadska firma i na nasem trzistu najzastupljeniji i najprodavaniji brend alarma. Pored Paradox-a, u ponudi imamo i Jablotron, Ajax, Risco, Teletek i Texacom - sve po konkurentnim cenama.",
      },
      {
        h2: "Ugradnja zicanih alarma u Beogradu - projekat i prijava u MUP",
        text: "IT Security vrsi profesionalnu ugradnju zicanih alarmnih sistema u Beogradu i okolini. Uz ugradnju dobijate: plan i projekat alarmnog sistema, ugovor o tehnickom odrzavanju i prijavu u MUP-u. Kao licencirani projektant za sigurnosne sisteme, garantujemo da ce vas zicani alarm biti projektovan na najvisom nivou. Pozovite za besplatnu procenu: 063224651, dostupni smo 7 dana u nedelji.",
      },
    ],
  },
  "wifi-kamere-bezicne": {
    h1: "WiFi bezicne kamere za video nadzor - Prodaja i ugradnja Beograd",
    sections: [
      { h2: "Sta su WiFi kamere?", image: "/uploads/wifi-kamera-video-nadzor-princip-rada.gif", text: "WiFi kamere za video nadzor su IP kamere koje se povezuju putem WiFi mreze. Upotreba WiFi kamera smanjuje potrosnju kablova jer se napajanje moze dovesti sa najblize naponske uticnice.", subsections: [
        { h3: "Instalacija na vecim udaljenostima", text: "WiFi kamere se mogu instalirati na vecim udaljenostima primenom usmerenih WiFi antena. Idealne za mesta gde je tesko razvlaciti kablove." },
        { h3: "Smart funkcije", text: "WiFi kamere imaju sve smart funkcije kao IP kamere: snimanje na pokret, perimetarska zastita, prepoznavanje lica i vozila, snimanje na SD karticu do 256GB." },
        { h3: "Kvalitet WiFi signala", image: "/uploads/Wifi-IP-kamera-signal-konekcije.gif", text: "Kamera mora imati odlican ili dobar WiFi signal na mestu instalacije. Ako signal nije dovoljan, instalirati dodatni access point ili mesh ruter." },
      ]},
      { h2: "Ugradnja WiFi kamera u Beogradu", text: "WiFi bezicne kamere su idealne za vikendice, iznajmljene prostore i dvorista. Kontakt: 063224651 - dostupni 7 dana u nedelji." },
    ],
  },
  "bezicni-alarmi": {
    h1: "Bezicni alarmi za stan i kucu bez razvlacenja kablova | IT Security Beograd",
    sections: [
      { h2: "Sta su bezicni alarmni sistemi?", image: "/uploads/wireless-bezicni-alarm.gif", text: "Bezicni alarmni sistemi nam omogucavaju zastitu objekta bez razvlacenja kablova. Bezicni alarmi imaju jednaku detekciju kao zicani, ali su pogodniji za objekte gde ne zelimo da busimo zidove.", subsections: [
        { h3: "Bezicni alarmni hub", text: "Hub je centrala koja radi preko interneta i cloud servisa. Na hub se bezicno dodaju senzori, sirena i magnetni kontakti. Korisnik putem aplikacije pali, gasi alarm i dobija obavestenja." },
        { h3: "Baterije do 3 godine", text: "Bezicni senzor ima bateriju koja traje do tri godine. Kada se baterija isprazni korisnik dobija poruku putem aplikacije o potrebnoj zameni." },
        { h3: "Alarm bez sifratora", image: "/uploads/bezicni-alarm-bez-sifratora.gif", text: "Bezicni alarm radi i bez sifratora - alarm se pali i gasi daljinskim upravljacem ili putem mobilnog telefona. Na ovaj nacin se dobija povoljnija cena sistema." },
      ]},
      { h2: "Brendovi bezicnih alarma - Ajax, Paradox, Dahua", text: "Najpoznatiji bezicni alarmi su Ajax, Paradox, Jablotron, Risco i Dahua. Ajax je trenutno najbolji bezicni alarm u Evropi. U ponudi imamo sve navedene brendove." },
      { h2: "Ugradnja bezicnih alarma u Beogradu", text: "IT Security vrsi profesionalnu ugradnju bezicnih alarmnih sistema. Uz ugradnju dobijate plan, projekat i prijavu u MUP-u. Kontakt: 063224651 - dostupni 7 dana u nedelji." },
    ],
  },
  "alarmi": {
    h1: "Alarmni sistemi za zastitu doma i poslovnog prostora | Beograd",
    sections: [
      { h2: "Zasto vam treba alarmni sistem?", text: "Alarmni sistem je prva linija odbrane vaseg doma ili poslovnog prostora. Moderni alarmni sistemi kombinuju senzore pokreta, magnetne kontakte na vratima i prozorima, glasne sirene i GSM module za slanje obavestenja na mobilni telefon u realnom vremenu." },
      { h2: "Zicani vs bezicni alarmi", text: "Zicani alarmi su pouzdaniji i ne zahtevaju punjenje baterija, ali montaza je kompleksnija. Bezicni alarmi su idealni za objekte gde nije moguce provlacenje kablova - stanovi, iznajmljeni prostori, vikendice. Nude brzu instalaciju i fleksibilnost u postavljanju senzora." },
      { h2: "Montaza alarmnih sistema", text: "IT Security ekipa instalira alarmne sisteme vodecih brendova (Dahua, Ajax, Paradox, HikVision) u Beogradu i okolini. Nudimo projektovanje, instalaciju, servis i 24/7 tehnicku podrsku." },
    ],
  },
  "interfoni": {
    h1: "Interfoni i video interfoni - Dahua, Comelit | IT Security Beograd",
    sections: [
      { h2: "Audio i video interfoni za kontrolu ulaska", text: "Interfoni omogucavaju komunikaciju sa posetiocem pre nego sto otvorite vrata. Audio interfoni su najzastupljeniji i najstariji oblik kontrole ulaska u branjeni prostor. Video interfoni dodatno pruzaju sliku u realnom vremenu - znate tacno ko je na vratima pre nego sto ih otvorite. Moderni video interfoni podrzavaju mobilne aplikacije i otkljucavanje vrata sa pametnog telefona." },
    ],
  },
  "video-interfoni": {
    h1: "Video interfoni za stanove i zgrade - IP i analogni | IT Security Beograd",
    sections: [
      {
        h2: "Sta su video interfoni i kako funkcionisu?",
        image: "/uploads/video-interfon-povezivanje.gif",
        text: "Video interfon je danas prva linija kontrole naseg zivotnog prostora. Interfoni mogu biti analogni i digitalni tj. IP video interfoni. Analogni video interfoni omogucavaju vizuelnu identifikaciju korisnika, audio komunikaciju, otvaranje brave i video nadzor ispred spoljne jedinice. Oprema video interfona se sastoji od spoljne jedinice (pozivne table) i unutrasnje jedinice (monitora).",
        subsections: [
          { h3: "Analogni video interfoni - povoljniji i jednostavniji", text: "Analogni video interfoni imaju tehnicki jednostavniju opremu od IP video interfona i zbog toga su cenovno povoljniji, ali imaju i manje funkcionalnosti. Za vise korisnika mogu imati vise pozivnih tastera. Kablovi koji se koriste za povezivanje su visezilni kablovi. Pozivne jedinice imaju kamere od 720p do Full HD rezolucije." },
          { h3: "IP digitalni video interfoni - vise funkcija", text: "Digitalni ili IP video interfoni osim standardne video identifikacije, audio komunikacije i otvaranja brave omogucavaju: snimanje korisnika koji zvoni, snimanje osoba koje prolaze ispred table, upravljanje putem aplikacije na mobilnom telefonu i dodavanje IP kamera za dodatno obezbedjenje." },
          { h3: "SD kartica i lokalno snimanje", text: "Unutrasnja jedinica monitor ima slot za SD memorijsku karticu. Na SD karticu se vrsi lokalno snimanje, a putem aplikacije ili monitora mozemo pristupiti snimcima u svakom trenutku." },
        ],
      },
      {
        h2: "Upravljanje video interfonom putem mobilnog telefona",
        image: "/uploads/IP-VIDEO-INTERFON.gif",
        text: "IP video interfon nam omogucava da kada neko zvoni na interfon dobijemo na mobilnom telefonu video poziv. Putem aplikacije mozemo da razgovaramo sa osobom, otkljucamo interfonsku bravu ili pregledamo snimak koji je interfon sacuvao kada je neko prosao ispred spoljne jedinice. Takodje u svakom trenutku mozemo izvrsiti video nadzor ispred pozivne jedinice.",
        subsections: [
          { h3: "Video interfoni za zgrade - dvoziCni sistem", text: "Kod nas mozete dobiti najpovoljnije video interfone za zgrade vrhunskog kvaliteta. Savremeni ravni veliki monitori od 7 inca dijagonale. Dvozilni sistem smanjuje troskove razvlacenja kablova, a uz sve to garancija od 3 godine na ugradene sisteme." },
          { h3: "Dahua IP video interfoni - preporucujemo", text: "Dahua IP video interfon komplet ce zadovoljiti vase potrebe za vizuelnom identifikacijom, audio komunikacijom i upravljanjem putem mobilnog telefona. Dahua video interfoni su dostupni za stanove, kuce i poslovne objekte." },
        ],
      },
      {
        h2: "Ugradnja video interfona u Beogradu - projekat i garancija",
        text: "IT Security vrsi profesionalnu ugradnju audio i video interfona za stanove, kuce, zgrade i poslovne prostore u Beogradu i okolini. Kao licencirani projektant sistema tehnicke zastite garantujemo da ce vas interfonski sistem biti projektovan na najvisom nivou. Nudimo servisiranje, zamenu interfonskih brava i magnetnih brava. Cena nase opreme je najpovoljnija jer smo diskontna prodaja sa minimalnim marzama. Kontakt: 063224651 - dostupni 7 dana u nedelji.",
      },
    ],
  },
  "audio-interfoni": {
    h1: "Audio interfoni za stanove i zgrade - povoljne cene | IT Security Beograd",
    sections: [
      {
        h2: "Sta su audio interfoni i kako funkcionisu?",
        image: "/uploads/interfonske-slusalice-modeli.gif",
        text: "Audio interfoni su najzastupljeniji i najstariji oblik kontrole ulaska u branjeni prostor. Audio interfon se sastoji od spoljne jedinice (pozivne table) i unutrasnje jedinice (slusalice). Na spoljnoj jedinici imamo tastere koji sluze za pozivanje korisnika. Audio interfoni omogucavaju jedino glasovnu verifikaciju pozivaoca - za vizuelnu identifikaciju potrebni su video interfoni.",
        subsections: [
          { h3: "Karakteristike audio interfona", text: "Audio interfoni za vise korisnika imaju vise pozivnih tastera. Jedan poziv moze da komunicira sa maksimalno 3 slusalice. Slusalica osim za audio komunikaciju sluzi i za otvaranje interfonske brave. Danasnji audio interfoni imaju savremeno dizajnirane slusalice u razlicitim oblicima." },
          { h3: "Kablovanje i napajanje audio interfona", text: "Kablovi se moraju upotrebiti za povezivanje spoljne i unutrasnje jedinice. Za otvaranje brave neophodno je napajanje koje moze biti na samoj interfonskoj centrali ili posebno napajanje samo za bravu. Audio interfoni su cenovno veoma pristupacni." },
          { h3: "Dvozicni bus sistem za zgrade", text: "Za zgrade nudimo najkvalitetnije audio interfone po povoljnim cenama. Dvozicni bus sistem smanjuje kabliranje a time i cenu sistema za zgrade. Mogucnost zamene starih interfona na zgradama savremenim dvozilnim sistemima ili uvodjenje interfonskih sistema u nove zgrade." },
        ],
      },
      {
        h2: "Povezivanje audio interfona",
        image: "/uploads/audio-interfon-povezivanje.gif",
        text: "Povezivanje slusalice i pozivne table moze biti sa dvozilnim kablom ili 4+n (broj zica gde je n broj poziva na tabli), sto zavisi od vrste samog interfona. Za otvaranje interfonske brave neophodno je posebno napajanje za bravu ili napajanje integrisano u interfonsku centralu.",
      },
      {
        h2: "Servis i ugradnja audio interfona u Beogradu",
        text: "IT Security nudi ugradnju, servisiranje interfona u zgradama, zamenu interfonskih brava, slusalica, kontrolu linija i zamenu magnetnih brava. Kao licencirani projektant sistema tehnicke zastite, garantujemo da ce vas interfonski sistem biti projektovan na najvisom nivou. Cena nase opreme za interfone je najpovoljnija jer smo diskontna prodaja sa minimalnim marzama. Kontakt: 063224651 - dostupni 7 dana u nedelji.",
      },
    ],
  },
};


type SeoSection = {
  h2: string;
  text: string;
  image?: string;
  subsections?: { h3: string; text: string; image?: string }[];
};

type SeoData = {
  h1: string;
  intro?: string;
  sections: SeoSection[];
};

function SeoBlock({ seo }: { seo: SeoData }) {
  return (
    <div className="seo-block">
      {seo.sections.map((section, i) => (
        <div key={i}>
          <h2 className="seo-h2">{section.h2}</h2>
          {section.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={section.image} alt={section.h2} className="seo-img" />
          )}
          <p className="seo-p">{section.text}</p>
          {section.subsections && (
            <div className="seo-subsections">
              {section.subsections.map((sub, j) => (
                <div key={j} className="seo-sub">
                  <h3 className="seo-h3">{sub.h3}</h3>
                  {sub.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sub.image} alt={sub.h3} className="seo-img" />
                  )}
                  <p className="seo-p">{sub.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string | string[];
    rezolucija?: string | string[];
    sort?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const meta = params.category ? META_DESCRIPTIONS[params.category] : null;
  return {
    title: meta?.title ?? "Prodavnica - IT Security video nadzor Beograd",
    description: meta?.description ?? "Kamere za video nadzor, alarmi, interfoni. Prodaja i montaza u Beogradu. IT Security - iskustvo od 2008. Pozovite 063224651.",
  };
}

async function getProducts(params: {
  category?: string;
  brand?: string | string[];
  rezolucija?: string | string[];
  sort?: string;
  page?: string;
}) {
  const where: Record<string, unknown> = { active: true, category: { slug: { notIn: ["dodatna-oprema-za-videonadzor"] } } };

  const VIDEO_NADZOR_SLUGS = ["hd-kamere","ip-kamere","wifi-kamere-bezicne","dvr-digitalni-snimaci","nvr-mrezni-snimaci"];
  const ALARMI_SLUGS = ["zicani-alarmi","bezicni-alarmi"];
  if (params.category === "video-nadzor") {
    where.category = { slug: { in: VIDEO_NADZOR_SLUGS } };
  } else if (params.category === "alarmi") {
    where.category = { slug: { in: ALARMI_SLUGS } };
  } else if (params.category) {
    where.category = { slug: params.category };
  }

  const brands = [params.brand ?? []].flat().filter(Boolean);
  if (brands.length) {
    where.brand = { in: brands };
  }

  const rezolucije = [params.rezolucija ?? []].flat().filter(Boolean);
  if (rezolucije.length) {
    where.OR = rezolucije.map((r) => ({
      attributes: { path: ["rezolucija"], equals: r },
    }));
  }

  if (params.sort === "price_asc" || params.sort === "price_desc") {
    where.price = { not: null };
  }

  type OB = { price?: "asc" | "desc"; createdAt?: "asc" | "desc" };
  let orderBy: OB = { price: "asc" };
  if (params.sort === "price_desc") orderBy = { price: "desc" };
  if (params.sort === "newest")     orderBy = { createdAt: "desc" };

  const page = Math.max(1, parseInt(params.page ?? "1"));
  const skip = (page - 1) * PER_PAGE;

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take: PER_PAGE }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, totalPages: Math.ceil(total / PER_PAGE) };
}

function buildUrl(base: URLSearchParams, page: number) {
  const p = new URLSearchParams(base);
  p.set("page", String(page));
  return `/shop?${p.toString()}`;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const { products, total, page, totalPages } = await getProducts(params);

  const categoryLabel = params.category
    ? params.category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Svi proizvodi";

  const baseParams = new URLSearchParams();
  if (params.category) baseParams.set("category", params.category);
  if (params.sort)     baseParams.set("sort", params.sort);
  [params.brand ?? []].flat().filter(Boolean).forEach((b) => baseParams.append("brand", b));
  [params.rezolucija ?? []].flat().filter(Boolean).forEach((r) => baseParams.append("rezolucija", r));

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const currentSeo = params.category ? SEO_CONTENT[params.category] : null;

  return (
    <div className="shop-page">
      <div className="shop-page__toolbar">
        <h1 className="shop-page__heading">
          {(params.category && SEO_CONTENT[params.category]?.h1) ?? categoryLabel}
          <span className="shop-page__count">{total} proizvoda</span>
        </h1>
        <SortSelect current={params.sort ?? ""} />
      </div>

      {products.length === 0 ? (
        <div className="shop-page__empty">
          <p>Nema proizvoda za odabrane filtere.</p>
        </div>
      ) : (
        <div className="shop-page__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 ? (
            <Link href={buildUrl(baseParams, page - 1)} className="pg-btn pg-btn--arrow">&larr;</Link>
          ) : (
            <span className="pg-btn pg-btn--arrow pg-btn--disabled">&larr;</span>
          )}
          {pages.map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="pg-dots">...</span>
            ) : (
              <Link
                key={p}
                href={buildUrl(baseParams, p as number)}
                className={`pg-btn${p === page ? " pg-btn--active" : ""}`}
              >
                {p}
              </Link>
            )
          )}
          {page < totalPages ? (
            <Link href={buildUrl(baseParams, page + 1)} className="pg-btn pg-btn--arrow">&rarr;</Link>
          ) : (
            <span className="pg-btn pg-btn--arrow pg-btn--disabled">&rarr;</span>
          )}
          <span className="pg-info">Strana {page} od {totalPages} &nbsp;({total} proizvoda)</span>
        </div>
      )}

      {currentSeo && <SeoBlock seo={currentSeo} />}

      <style>{`
        .shop-page__toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 12px; }
        .shop-page__heading { font-size: 18px; font-weight: 600; color: var(--ink); display: flex; align-items: baseline; gap: 10px; }
        .shop-page__count { font-size: 13px; font-weight: 400; color: var(--ink-muted); }
        .shop-page__sort { font-size: 13px; border: 1px solid rgba(0,0,0,0.12); border-radius: 6px; padding: 6px 12px; background: #fff; color: var(--ink); cursor: pointer; }
        .shop-page__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
        .shop-page__empty { text-align: center; padding: 60px 20px; color: var(--ink-muted); font-size: 15px; }
        .pagination { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding: 8px 0 24px; border-top: 1px solid rgba(0,0,0,0.07); margin-top: 8px; }
        .pg-btn { min-width: 36px; height: 36px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 13px; font-weight: 500; text-decoration: none; color: var(--ink); background: #fff; border: 1px solid rgba(0,0,0,0.12); transition: all 0.15s; }
        .pg-btn:hover { border-color: var(--brand); color: var(--brand); }
        .pg-btn--active { background: var(--brand); color: #fff; border-color: var(--brand); }
        .pg-btn--disabled { opacity: 0.35; cursor: default; pointer-events: none; }
        .pg-btn--arrow { font-size: 15px; }
        .pg-dots { font-size: 13px; color: var(--ink-muted); padding: 0 4px; }
        .pg-info { margin-left: auto; font-size: 12px; color: var(--ink-muted); }
        .seo-block { margin-top: 40px; padding-top: 32px; border-top: 1px solid rgba(0,0,0,0.08); }
        .seo-h2 { font-size: 20px; font-weight: 700; color: var(--ink); margin: 28px 0 10px; }
        .seo-h3 { font-size: 15px; font-weight: 700; color: var(--brand); margin-bottom: 8px; }
        .seo-p { font-size: 14px; line-height: 1.7; color: var(--ink-muted); margin-bottom: 12px; }
        .seo-img { width: 100%; max-width: 680px; border-radius: 10px; margin: 12px 0 16px; display: block; }
        .seo-subsections { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0 24px; }
        .seo-sub { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; padding: 16px; }
        .seo-sub .seo-p { margin-bottom: 0; }
        @media (max-width: 1200px) { .shop-page__grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 860px) { .shop-page__grid { grid-template-columns: repeat(2, 1fr); } .seo-subsections { grid-template-columns: 1fr; } }
        @media (max-width: 480px) { .shop-page__grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
