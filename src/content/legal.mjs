// Polityka prywatności, cookies i teksty banera. SZKIC do weryfikacji prawnej (RODO / islandzka ustawa o ochronie danych).
// Administrator: osoba prywatna Adrian Nowicki. Gdy powstanie firma, zmień sekcję „controller”.
const DATE = { pl: '21.10.2026', en: '21 October 2026', is: '21. október 2026' };

export default {
  pl: {
    title: 'Polityka prywatności i cookies',
    seo: ['Polityka prywatności i cookies | Prime Verk', 'Jak przetwarzamy dane z formularza i e-maili oraz z jakich plików cookies i zewnętrznych usług korzysta strona.'],
    updated: 'Aktualizacja: ' + DATE.pl,
    banner: { text: 'Strona używa tylko niezbędnych zapisów w przeglądarce. Statystyki włączymy wyłącznie za Twoją zgodą.', accept: 'Zgadzam się na statystyki', reject: 'Tylko niezbędne', more: 'Polityka prywatności' },
    footer: { privacy: 'Polityka prywatności i cookies', settings: 'Ustawienia cookies' },
    sections: [
      ['Kto odpowiada za dane', ['Administratorem danych jest Adrian Nowicki, osoba prywatna prowadząca usługi wykończeniowe pod nazwą Prime Verk.', 'Kontakt w sprawach danych: {EMAIL}, tel. {PHONE}.']],
      ['Jakie dane przetwarzamy i po co', [
        'Wiadomość przez formularz lub e-mail: imię i nazwisko, numer telefonu, adres e-mail oraz treść zapytania. Używamy ich, żeby odpowiedzieć na zapytanie i przygotować wycenę. Podstawa: Twoja prośba o kontakt przed zawarciem umowy oraz nasz uzasadniony interes w odpowiedzi na zapytania.',
        'Formularz na stronie nie wysyła danych na serwer. Otwiera Twój program pocztowy z gotową wiadomością, którą wysyłasz sam. Dane trafiają do nas dopiero wtedy.',
        'Kalkulator liczy koszt w Twojej przeglądarce. Wyliczenie zapisuje się tymczasowo w pamięci karty przeglądarki (sessionStorage), żeby przenieść je do formularza, i znika po zamknięciu karty.',
        'Dane techniczne (np. adres IP, typ przeglądarki) mogą być przetwarzane przez dostawców usług, z których korzysta strona (zob. niżej).'
      ]],
      ['Komu przekazujemy dane', [
        'Hosting strony: GitHub Pages (GitHub, Inc., USA). Serwer może zapisywać adresy IP odwiedzających w logach.',
        'Czcionki: strona pobiera czcionki z Google Fonts (Google, USA), co ujawnia Google adres IP odwiedzającego.',
        'Poczta e-mail: dostawca skrzynki, na którą wysyłasz wiadomości.',
        'Dane z zapytań nie są sprzedawane ani wykorzystywane do reklamy.'
      ]],
      ['Jak długo przechowujemy dane', ['Zapytania i korespondencję przechowujemy tak długo, jak trwa kontakt w sprawie wyceny lub zlecenia, a potem do czasu, gdy mogą być potrzebne do ewentualnych roszczeń lub obowiązków księgowych. Na Twoją prośbę usuwamy je wcześniej, jeśli nie ma przeszkód prawnych.']],
      ['Twoje prawa', ['Możesz żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz wnieść sprzeciw. Napisz na adres e-mail podany wyżej.', 'Masz prawo złożyć skargę do organu nadzorczego. Na Islandii jest to Persónuvernd (www.personuvernd.is), a w kraju Twojego zamieszkania właściwy krajowy organ ochrony danych.']],
      ['Cookies i zapisy w przeglądarce', [
        'Niezbędne (nie wymagają zgody): pamięć wyboru dotyczącego cookies (localStorage, klucz pv-consent) oraz tymczasowy zapis wyliczenia z kalkulatora (sessionStorage, klucz pv-calc).',
        'Statystyka: obecnie strona nie używa żadnych narzędzi analitycznych ani reklamowych. Jeśli je dodamy, uruchomią się wyłącznie po Twojej zgodzie w banerze, a tę politykę zaktualizujemy.',
        'Wybór możesz zmienić w każdej chwili przyciskiem „Ustawienia cookies” w stopce strony.'
      ]],
      ['Zmiany polityki', ['Politykę możemy aktualizować, np. gdy zmienią się usługi, z których korzysta strona. Aktualna wersja jest zawsze pod tym adresem.']]
    ]
  },
  en: {
    title: 'Privacy and cookie policy',
    seo: ['Privacy and cookie policy | Prime Verk', 'How we handle details from enquiries and emails, and which cookies and third-party services this website uses.'],
    updated: 'Updated: ' + DATE.en,
    banner: { text: 'This site only uses what is strictly necessary in your browser. We will turn on statistics only with your consent.', accept: 'Allow statistics', reject: 'Necessary only', more: 'Privacy policy' },
    footer: { privacy: 'Privacy and cookie policy', settings: 'Cookie settings' },
    sections: [
      ['Who is responsible for your data', ['The data controller is Adrian Nowicki, a private individual providing finishing services under the name Prime Verk.', 'Contact for data matters: {EMAIL}, tel. {PHONE}.']],
      ['What we collect and why', [
        'Messages sent by form or email: your name, phone number, email address and the content of your enquiry. We use them to reply and prepare a quote. Basis: your request to be contacted before a contract, and our legitimate interest in answering enquiries.',
        'The form on this site does not send data to a server. It opens your email app with a prepared message that you send yourself. We receive your details only then.',
        'The calculator works out the cost in your browser. The result is kept temporarily in the browser tab (sessionStorage) so it can be carried over to the form, and disappears when you close the tab.',
        'Technical data (such as IP address and browser type) may be processed by the providers the site relies on (see below).'
      ]],
      ['Who receives data', [
        'Website hosting: GitHub Pages (GitHub, Inc., USA). The server may record visitors’ IP addresses in logs.',
        'Fonts: the site loads fonts from Google Fonts (Google, USA), which reveals the visitor’s IP address to Google.',
        'Email: the provider of the mailbox you write to.',
        'Enquiry data is not sold or used for advertising.'
      ]],
      ['How long we keep data', ['We keep enquiries and correspondence for as long as the quote or job is being discussed, and afterwards for as long as they may be needed for claims or accounting duties. On request we delete them sooner where the law allows.']],
      ['Your rights', ['You can ask for access, correction, deletion, restriction or portability of your data, and you can object to processing. Write to the email address above.', 'You may complain to a supervisory authority. In Iceland this is Persónuvernd (www.personuvernd.is), or the data protection authority in your own country.']],
      ['Cookies and browser storage', [
        'Necessary (no consent needed): the remembered cookie choice (localStorage, key pv-consent) and the temporary calculator result (sessionStorage, key pv-calc).',
        'Statistics: the site currently uses no analytics or advertising tools. If we add them, they will start only after you agree in the banner, and we will update this policy.',
        'You can change your choice at any time with the “Cookie settings” button in the footer.'
      ]],
      ['Changes to this policy', ['We may update this policy, for example when the services the site uses change. The current version is always at this address.']]
    ]
  },
  is: {
    title: 'Persónuverndarstefna og vafrakökur',
    seo: ['Persónuverndarstefna og vafrakökur | Prime Verk', 'Hvernig við förum með upplýsingar úr fyrirspurnum og tölvupósti og hvaða vafrakökur og þjónustu þriðja aðila vefurinn notar.'],
    updated: 'Uppfært: ' + DATE.is,
    banner: { text: 'Vefurinn notar aðeins það sem er nauðsynlegt í vafranum þínum. Tölfræði kveikjum við aðeins með samþykki þínu.', accept: 'Leyfa tölfræði', reject: 'Aðeins nauðsynlegt', more: 'Persónuverndarstefna' },
    footer: { privacy: 'Persónuverndarstefna og vafrakökur', settings: 'Stillingar vafrakaka' },
    sections: [
      ['Hver ber ábyrgð á gögnunum', ['Ábyrgðaraðili er Adrian Nowicki, einstaklingur sem veitir frágangsþjónustu undir nafninu Prime Verk.', 'Samskipti vegna persónuupplýsinga: {EMAIL}, sími {PHONE}.']],
      ['Hvaða upplýsingar við vinnum og hvers vegna', [
        'Skilaboð í gegnum eyðublað eða tölvupóst: nafn, símanúmer, netfang og efni fyrirspurnar. Við notum þær til að svara og útbúa tilboð. Lagagrundvöllur: beiðni þín um samband fyrir samningsgerð og lögmætir hagsmunir okkar af því að svara fyrirspurnum.',
        'Eyðublaðið á vefnum sendir ekki gögn á netþjón. Það opnar póstforritið þitt með tilbúnum skilaboðum sem þú sendir sjálf(ur). Við fáum upplýsingarnar fyrst þá.',
        'Reiknivélin reiknar kostnaðinn í vafranum þínum. Niðurstaðan geymist tímabundið í vafraflipanum (sessionStorage) til að flytja hana í eyðublaðið og hverfur þegar flipanum er lokað.',
        'Tæknilegar upplýsingar (t.d. IP-tala og gerð vafra) geta verið unnar af þjónustuaðilum sem vefurinn notar (sjá hér á eftir).'
      ]],
      ['Hverjir fá upplýsingar', [
        'Vefhýsing: GitHub Pages (GitHub, Inc., Bandaríkin). Netþjónninn getur skráð IP-tölur gesta í annála.',
        'Letur: vefurinn sækir letur frá Google Fonts (Google, Bandaríkin), sem gerir Google kleift að sjá IP-tölu gestsins.',
        'Tölvupóstur: þjónustuaðili pósthólfsins sem þú skrifar í.',
        'Upplýsingar úr fyrirspurnum eru hvorki seldar né notaðar í auglýsingar.'
      ]],
      ['Hve lengi við geymum upplýsingar', ['Fyrirspurnir og samskipti geymum við meðan verið er að ræða tilboð eða verk og eftir það á meðan þau geta þurft vegna krafna eða bókhaldsskyldu. Að beiðni eyðum við þeim fyrr ef lög leyfa.']],
      ['Réttindi þín', ['Þú getur óskað eftir aðgangi, leiðréttingu, eyðingu, takmörkun eða flutningi upplýsinga og mótmælt vinnslu. Skrifaðu á netfangið hér að ofan.', 'Þú getur kvartað til eftirlitsstjórnvalds. Á Íslandi er það Persónuvernd (www.personuvernd.is), eða persónuverndaryfirvald í þínu landi.']],
      ['Vafrakökur og vistun í vafra', [
        'Nauðsynlegt (krefst ekki samþykkis): vistað val um vafrakökur (localStorage, lykill pv-consent) og tímabundin niðurstaða reiknivélar (sessionStorage, lykill pv-calc).',
        'Tölfræði: vefurinn notar nú engin greiningar- eða auglýsingatól. Ef við bætum þeim við fara þau aðeins í gang eftir að þú samþykkir í borðanum og við uppfærum þessa stefnu.',
        'Þú getur breytt valinu hvenær sem er með hnappnum „Stillingar vafrakaka“ neðst á síðunni.'
      ]],
      ['Breytingar á stefnunni', ['Við getum uppfært stefnuna, t.d. þegar þjónusta sem vefurinn notar breytist. Núgildandi útgáfa er alltaf á þessari slóð.']]
    ]
  }
};
