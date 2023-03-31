i18next.init({
    lng: ['navigator', 'cookie', 'localStorage', 'querystring', 'htmlTag', 'path', 'subdomain'],
    fallbackLng: 'en',
    detection: {
        order: ['navigator', 'cookie', 'localStorage', 'querystring', 'htmlTag', 'path', 'subdomain'],
        caches: ['localStorage', 'cookie']
    },
    resources: {
        en: {
            translation: {
                "invoices": "Invoices",
                "clients": "Clients",
                "items": "Items",
                "statistics": "Statistics",
                "settings": "Settings",
                "search_input_text": "Search...",
                "a_z_sort": "A-Z by name",
                "add_client": "Add client",
                "new_client": "New client",
                "edit_client": "Edit client",
                "client_edit": "Client edit",
                "save_changes": "Save changes",
                "client_info": "Client info",
                "name": "Name",
                "surname": "Surname",
                "country": "Country",
                "telephone_number": "Telephone number",
                "zip_code": "ZIP code",
                "city": "City",
                "address": "Address",
                "empty_field_error": "This field can't be empty",
                "no_whitespaces_error": "No whitespaces",
                "max_length_error": "Max length – {{maxLength}} chars",
                "capital_letter_error": "Has to begin with capital",
                "lowercase_error": "At least one lowercase",
                "special_characters_error": "Special characters aren't allowed",
                "invalid_format_error": "Invalid format",
                "range_error": "Amount of digits must be in [{{min}}, {{max}}]",
                "Select country": "Select country",
            }
        },
        uk: {
            translation: {
                "invoices": "Накладні",
                "clients": "Клієнти",
                "items": "Товари",
                "statistics": "Статистика",
                "settings": "Налаштування",
                "search_input_text": "Пошук...",
                "a_z_sort": "А-Я",
                "add_client": "Додати клієнта",
                "new_client": "Новий клієнт",
                "edit_client": "Внести зміни",
                "client_edit": "Редагування клієнта",
                "save_changes": "Зберегти",
                "client_info": "Інформація про клієнта",
                "name": "Імʼя",
                "surname": "Прізвище",
                "country": "Країна",
                "telephone_number": "Номер телефону",
                "zip_code": "Поштовий індекс",
                "city": "Місто",
                "address": "Адреса",
                "empty_field_error": "Поле не може бути порожнім",
                "no_whitespaces_error": "Без пробілів",
                "max_length_error": "Максимальна довжина – {{maxLength}} символів",
                "capital_letter_error": "Повинно починатися з великої літери",
                "lowercase_error": "Повинно містити хоча б одну малу літеру",
                "special_characters_error": "Спецсимволи заборонені",
                "invalid_format_error": "Некоректний формат",
                "range_error": "Кількість цифр має бути від {{min}} до {{max}}",
                "Afghanistan": "Афганістан",
                "Aland Islands": "Аландські острови",
                "Albania": "Албанія",
                "American Samoa": "Американське Самоа",
                "Antigua": "Антигуа",
                "Bosnia": "Боснія і Герцеговина",
                "Austria": "Австрія",
                "Algeria": "Алжир",
                "Andorra": "Андорра",
                "Angola": "Ангола",
                "Anguilla": "Ангілья",
                "Antarctica": "Антарктида",
                "Antigua and Barbuda": "Антигуа і Барбуда",
                "Argentina": "Аргентина",
                "Armenia": "Вірменія",
                "Aruba": "Аруба",
                "Australia": "Австралія",
                "Azerbaijan": "Азербайджан",
                "Bahamas": "Багамські Острови",
                "Bahrain": "Бахрейн",
                "Bangladesh": "Бангладеш",
                "Barbados": "Барбадос",
                "Belarus": "Білорусь",
                "Belgium": "Бельгія",
                "Belize": "Беліз",
                "Benin": "Бенін",
                "Bermuda": "Бермудські Острови",
                "Bhutan": "Бутан",
                "Bolivia": "Болівія",
                "Botswana": "Ботсвана",
                "Bouvet Island": "Острів Буве",
                "Brazil": "Бразилія",
                "British Virgin Islands": "Віргінські острови",
                "Brunei": "Бруней",
                "Burma": "Бурма",
                "Bulgaria": "Болгарія",
                "Burkina Faso": "Буркіна-Фасо",
                "Burundi": "Бурунді",
                "Cabo Verde": "Кабо-Верде",
                "Cambodia": "Камбоджа",
                "Cameroon": "Камерун",
                "Canada": "Канада",
                "Cayman Islands": "Кайманові Острови",
                "Caicos Islands": "Острів Теркс",
                "Central African Republic": "ЦАР",
                "Chad": "Чад",
                "Chile": "Чилі",
                "China": "Китай",
                "Christmas Island": "Острів Різдва",
                "Cocos Islands": "Кокосові Острови",
                "Colombia": "Колумбія",
                "Comoros": "Коморські Острови",
                "Congo": "Конго",
                "Congo Brazzaville": "Республіка Конго",
                "Cook Islands": "Острови Кука",
                "Costa Rica": "Коста-Рика",
                "Cote Divoire": "Кот-д'Івуар",
                "Croatia": "Хорватія",
                "Cuba": "Куба",
                "Curaçao": "Кюрасао",
                "Cyprus": "Кіпр",
                "Czech Republic": "Чехія",
                "Denmark": "Данія",
                "Dominica": "Домініка",
                "Dominican Republic": "Домініканська Республіка",
                "Djibouti": "Джибуті",
                "Ecuador": "Еквадор",
                "Egypt": "Єгипет",
                "El Salvador": "Сальвадор",
                "Equatorial Guinea": "Екваторіальна Гвінея",
                "Eritrea": "Еритрея",
                "Estonia": "Естонія",
                "Eswatini": "Есватіні",
                "Ethiopia": "Ефіопія",
                "Falkland Islands": "Фолклендські острови",
                "Faroe Islands": "Фарерські острови",
                "Fiji": "Фіджі",
                "Finland": "Фінляндія",
                "France": "Франція",
                "French Guiana": "Французька Гвіана",
                "French Polynesia": "Французька Полінезія",
                "French Territories": "Французькі Південні Території",
                "Gabon": "Габон",
                "Gambia": "Гамбія",
                "Georgia": "Грузія",
                "Germany": "Німеччина",
                "Ghana": "Гана",
                "Gibraltar": "Гібралтар",
                "Greece": "Греція",
                "Greenland": "Гренландія",
                "Grenada": "Гренада",
                "Guadeloupe": "Гваделупа",
                "Guam": "Гуам",
                "Guatemala": "Гватемала",
                "Guernsey": "Гернсі",
                "Guinea": "Гвінея",
                "Guinea-Bissau": "Гвінея-Бісау",
                "Guyana": "Гайяна",
                "Haiti": "Гаїті",
                "Heard Island": "Острів Херд",
                "Holy See": "Святий Престол",
                "Honduras": "Гондурас",
                "Hong Kong": "Гонконг",
                "Hungary": "Угорщина",
                "Iceland": "Ісландія",
                "India": "Індія",
                "Indian Ocean Territory": "Британська територія в Індійському океані",
                "Indonesia": "Індонезія",
                "Iran": "Іран",
                "Iraq": "Ірак",
                "Ireland": "Ірландія",
                "Isle of Man": "Острів Мен",
                "Israel": "Ізраїль",
                "Italy": "Італія",
                "Jamaica": "Ямайка",
                "Japan": "Японія",
                "Jersey": "Джерсі",
                "Jordan": "Йорданія",
                "Kazakhstan": "Казахстан",
                "Kenya": "Кенія",
                "Kiribati": "Кірибаті",
                "Korea, Republic of": "Республіка Корея",
                "Kuwait": "Кувейт",
                "Kyrgyzstan": "Киргизстан",
                "Laos": "Лаоська Народна Демократична Республіка",
                "Latvia": "Латвія",
                "Lebanon": "Ліван",
                "Lesotho": "Лесото",
                "Liberia": "Ліберія",
                "Libya": "Лівія",
                "Liechtenstein": "Ліхтенштейн",
                "Lithuania": "Литва",
                "Luxembourg": "Люксембург",
                "Macau": "Макао",
                "Madagascar": "Мадагаскар",
                "Malawi": "Малаві",
                "Malaysia": "Малайзія",
                "Maldives": "Мальдіви",
                "Mali": "Малі",
                "Malta": "Мальта",
                "Marshall Islands": "Маршаллові Острови",
                "Martinique": "Мартиніка",
                "Mauritania": "Мавританія",
                "Mauritius": "Маврикій",
                "Mayotte": "Майот",
                "Mexico": "Мексика",
                "Micronesia": "Федеративні Штати Мікронезії",
                "Moldova": "Молдова",
                "Monaco": "Монако",
                "Mongolia": "Монголія",
                "Montenegro": "Чорногорія",
                "Montserrat": "Монтсеррат",
                "Morocco": "Марокко",
                "Mozambique": "Мозамбік",
                "Myanmar": "М'янма",
                "Namibia": "Намібія",
                "Nauru": "Науру",
                "Nepal": "Непал",
                "Netherlands": "Нідерланди",
                "Netherlands Antilles": "Антильські острови́",
                "New Caledonia": "Нова Каледонія",
                "New Zealand": "Нова Зеландія",
                "Nicaragua": "Нікарагуа",
                "Niger": "Нігер",
                "Nigeria": "Нігерія",
                "Niue": "Ніуе",
                "Norfolk Island": "Острів Норфолк",
                "Macedonia": "Північна Македонія",
                "Northern Mariana Islands": "Північні Маріанські Острови",
                "Norway": "Норвегія",
                "Oman": "Оман",
                "Vatican City": "Ватикан",
                "Pakistan": "Пакистан",
                "Palau": "Палау",
                "Palestine": "Палестина",
                "Panama": "Панама",
                "New Guinea": "Папуа-Нова Гвінея",
                "Paraguay": "Парагвай",
                "Peru": "Перу",
                "Philippines": "Філіппіни",
                "Pitcairn Islands": "Піткерн",
                "Poland": "Польща",
                "Portugal": "Португалія",
                "Puerto Rico": "Пуерто-Ріко",
                "Qatar": "Катар",
                "Réunion": "Реюньйон",
                "Romania": "Румунія",
                "Russian Federation": "Російська Федерація",
                "Rwanda": "Руанда",
                "Saint Barthélemy": "Сен-Бартельмі",
                "Saint Helena": "Острів Святої Єлени",
                "Saint Kitts and Nevis": "Сент-Кітс і Невіс",
                "Saint Lucia": "Сент-Люсія",
                "Saint Martin (French part)": "Сен-Мартен (Французька частина)",
                "Saint Pierre": "Сен-П'єр",
                "Saint Vincent": "Сент-Вінсент",
                "Samoa": "Самоа",
                "San Marino": "Сан-Марино",
                "Sao Tome": "Сан-Томе",
                "Saudi Arabia": "Саудівська Аравія",
                "Senegal": "Сенегал",
                "Serbia": "Сербія",
                "Seychelles": "Сейшельські Острови",
                "Sierra Leone": "Сьєрра-Леоне",
                "Singapore": "Сінгапур",
                "Sint Maarten (Dutch part)": "Сінт-Мартен (Нідерландська частина)",
                "Slovakia": "Словаччина",
                "Slovenia": "Словенія",
                "Solomon Islands": "Соломонові Острови",
                "Somalia": "Сомалі",
                "South Africa": "Південна Африка",
                "South Korea": "Південна Корея",
                "Sandwich Islands": "Сандвічеві Острови",
                "South Sudan": "Південний Судан",
                "Spain": "Іспанія",
                "Sri Lanka": "Шрі-Ланка",
                "Sudan": "Судан",
                "Suriname": "Суринам",
                "Svalbard": "Шпіцберген",
                "Sweden": "Швеція",
                "Switzerland": "Швейцарія",
                "Syria": "Сирія",
                "Taiwan": "Тайвань",
                "Tajikistan": "Таджикистан",
                "Tanzania": "Танзанія",
                "Thailand": "Таїланд",
                "Timorleste": "Східний Тимор",
                "Tokelau": "Токелау",
                "Togo": "Того",
                "Tonga": "Тонга",
                "Trinidad": "Тринідад",
                "Tunisia": "Туніс",
                "Turkey": "Туреччина",
                "Turkmenistan": "Туркменістан",
                "Turks and Caicos Islands": "Острови Теркс і Кайкос",
                "Tuvalu": "Тувалу",
                "Uganda": "Уганда",
                "Ukraine": "Україна",
                "United Arab Emirates": "Об'єднані Арабські Емірати",
                "England": "Англія",
                "European Union": "Європейський союз",
                "United States": "США",
                "Us Minor Islands": "Віддалені Острови США",
                "Uruguay": "Уругвай",
                "Uzbekistan": "Узбекистан",
                "Vanuatu": "Вануату",
                "Venezuela": "Венесуела",
                "Vietnam": "В'єтнам",
                "Virgin Islands, British": "Віргінські Острови, Британські",
                "Us Virgin Islands": "Віргінські Острови, США",
                "Wallis and Futuna": "Уолліс і Футуна",
                "Western Sahara": "Західна Сахара",
                "Yemen": "Ємен",
                "Zambia": "Замбія",
                "Zimbabwe": "Зімбабве",
                "Select country": "Оберіть країну",
            }
        }
    }
}, function (err, t) {
    updateContent();
});

function updateContent() {
    translateMenu();

    translateClientsList();

    translateClientAdd();

    translateClientInfo();

    translateClientEdit();
}

function getI18NDataFromAttribute(element) {
    if (element) {
        return i18next.t(element.getAttribute("data-i18n"));
    }
}

function translateMenu() {
    const menuItemsList = document.querySelectorAll("span.translation");
    if (menuItemsList) {
        for (let menuItem of menuItemsList) {
            menuItem.textContent = getI18NDataFromAttribute(menuItem);
        }
    }
}

function translateClientsList() {
    const searchInput = document.querySelector("#search_bar");
    if (searchInput) {
        searchInput.placeholder = getI18NDataFromAttribute(searchInput);
    }

    const sortAscendingOrder = document.querySelector("#sort_asc");
    if (sortAscendingOrder) {
        sortAscendingOrder.textContent = getI18NDataFromAttribute(sortAscendingOrder);
    }

    const addClientButton = document.querySelector("#adder");
    if (addClientButton) {
        addClientButton.label = getI18NDataFromAttribute(addClientButton);
    }
}

function translateClientAdd() {
    const addClientHeaderText = document.querySelector("#client_new_text");
    if (addClientHeaderText) {
        addClientHeaderText.textContent = getI18NDataFromAttribute(addClientHeaderText);
    }

    const nameInput = document.querySelector("#name_input_client_edit_page");
    if (nameInput) {
        nameInput.label = getI18NDataFromAttribute(nameInput);
    }

    const surnameInput = document.querySelector("#surname_input_client_edit_page");
    if (surnameInput) {
        surnameInput.label = getI18NDataFromAttribute(surnameInput);
    }

    const telephoneInput = document.querySelector("#telephone_input_client_edit_page");
    if (telephoneInput) {
        telephoneInput.label = getI18NDataFromAttribute(telephoneInput);
    }

    const zipInput = document.querySelector("#zip_input_client_edit_page");
    if (zipInput) {
        zipInput.label = getI18NDataFromAttribute(zipInput);
    }

    const countryInput = document.querySelector("#country_input_client_edit_page");
    if (countryInput) {
        countryInput.label = getI18NDataFromAttribute(countryInput);
    }

    const cityInput = document.querySelector("#city_input_client_edit_page");
    if (cityInput) {
        cityInput.label = getI18NDataFromAttribute(cityInput);
    }

    const addressInput = document.querySelector("#address_input_client_edit_page");
    if (addressInput) {
        addressInput.label = getI18NDataFromAttribute(addressInput);
    }

    const addClientButton = document.querySelector("#request_sender");
    if (addClientButton) {
        addClientButton.label = getI18NDataFromAttribute(addClientButton);
    }

    const countryDivs = document.querySelectorAll('.item');

    if (countryDivs) {
        for (let i = 0; i < countryDivs.length; i++) {
            countryDivs[i].childNodes[1].textContent = i18next.t(countryDivs[i].getAttribute('data-value'));
        }
    }

    const selectCountryText = document.querySelector("#select_country_div");
    if (selectCountryText) {
        selectCountryText.textContent = getI18NDataFromAttribute(selectCountryText)
    }

    const dropdownCountryErrorText = document.querySelector('.error_country_dropdown');
    if (dropdownCountryErrorText) {
        dropdownCountryErrorText.textContent = getI18NDataFromAttribute(dropdownCountryErrorText);
    }
}

function translateClientInfo() {
    const infoClientHeaderText = document.querySelector("#client_info_text");
    if (infoClientHeaderText) {
        infoClientHeaderText.textContent = getI18NDataFromAttribute(infoClientHeaderText);
    }

    const editClientButton = document.querySelector("#request_edit_sender");
    if (editClientButton) {
        editClientButton.label = getI18NDataFromAttribute(editClientButton);
    }
}

function translateClientEdit() {
    const editClientHeaderText = document.querySelector("#client_edit_text");
    if (editClientHeaderText) {
        editClientHeaderText.textContent = getI18NDataFromAttribute(editClientHeaderText);
    }
}