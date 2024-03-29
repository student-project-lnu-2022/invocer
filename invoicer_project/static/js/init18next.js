import {updateContentItems} from "./items_section_translation.js";

i18next.init({
        lng: navigator.language,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    "price_per_unit_text": "Price per unit",
                    "basic_unit_text": "Basic unit",
                    "piece": "piece",
                    "kg.": "kg.",
                    "g.": "g.",
                    "pack": "pack",
                    "l.": "l.",
                    "box": "box",
                    "ctn.": "ctn.",
                    "pallet": "pallet",
                    "dz.": "dz.",
                    "pair": "pair",
                    "ream": "ream",
                    "bundle": "bundle",
                    "barrel": "barrel",
                    "gal.": "gal.",
                    "lb.": "lb.",
                    "oz.": "oz.",
                    "invoices":
                        "Invoices",
                    "clients":
                        "Clients",
                    "items":
                        "Items",
                    "statistics":
                        "Statistics",
                    "settings":
                        "Settings",
                    "search_input_text":
                        "Search...",
                    "a_z_sort":
                        "A-Z by name",
                    "add_item":
                        "Add item",
                    "new_item":
                        "New item",
                    "edit_item":
                        "Edit item",
                    "item_edit":
                        "Item edit",
                    "save_changes":
                        "Save changes",
                    "item_info":
                        "Item info",
                    "name":
                        "Name",
                    "edit": "Edit",
                    "delete": "Delete",
                    "name_of_the_item":
                        "Name of the item",
                    "price":
                        "Price",
                    "currency":
                        "Currency",
                    "basic_unit":
                        "Basic unit",
                    "amount_in_stock":
                        "Amount in stock",
                    "barcode":
                        "Barcode",
                    "barcode_":
                        "Barcode: ",
                    "add_new_additional_unit":
                        "Add new additional unit",
                    "additional_unit":
                        "Additional unit",
                    "name_of_the_additional_unit":
                        "Name of the additional unit",
                    "amount_of_the_additional_unit_in_basic":
                        "Amount in basic unit",
                    "empty_field_error":
                        "This field can't be empty",
                    "no_whitespaces_error":
                        "No whitespaces",
                    "max_length_error":
                        "Max length – {{maxLength}} chars",
                    "capital_letter_error":
                        "Has to begin with capital",
                    "lowercase_error":
                        "At least one lowercase",
                    "lower_date_error":
                        "Can\'t be lower than invoice date",
                    "special_characters_error":
                        "Special characters aren't allowed",
                    "invalid_format_error":
                        "Invalid format",
                    "range_error":
                        "Amount of digits must be in [{{min}}, {{max}}]",
                    "add_invoice":
                        "Add invoice",
                    "add_client": "Add client",
                    "new_client": "New client",
                    "edit_client": "Edit client",
                    "client_edit": "Client edit",
                    "client_info": "Client info",
                    "surname": "Surname",
                    "country": "Country",
                    "telephone_number": "Telephone number",
                    "zip_code": "ZIP code",
                    "city": "City",
                    "address": "Address",
                    "Select country": "Select country",
                    "AUD": "AUD",
                    "AZN": "AZN",
                    "BYN": "BYN",
                    "BGN": "BGN",
                    "KRW": "KRW",
                    "HKD": "HKD",
                    "DKK": "DKK",
                    "USD": "USD",
                    "EUR": "EUR",
                    "EGP": "EGP",
                    "JPY": "JPY",
                    "PLN": 'PLN',
                    "INR": "INR",
                    "CAD": "CAD",
                    "RON": "RON",
                    "IDR": "IDR",
                    "UAH": "UAH",
                    "SGD": "SGD",
                    "KZT": "KZT",
                    "TRY": "TRY",
                    "HUF": "HUF",
                    "GBP": "GBP",
                    "CZK": "CZK",
                    "CHF": "CHF",
                    "SEK": "SEK",
                    "CNY": "CNY",
                    "log_in": "Log in",
                    "password": "Password",
                    "forgot_password": "Forgot password?",
                    "create_an_account": "Create an account",
                    "repeat_password": "Repeat password",
                    "create_profile": "Create profile",
                    "have_account": "I have an account. Log in.",
                    "sign_up": "Sign up",
                    "lets_go": "Let's go",
                    "invalid_data": "Invalid data",
                    "incorrect_credentials": "Incorrect credentials",
                    "unknown_error": "Unknown error",
                    "Personal information": "Personal information",
                    "*Name": "*Name",
                    "*Surname": "*Surname",
                    "Company name": "Company name",
                    "download_all_data": "Download all data",
                    "Change password": "Change password",
                    "Old password": "Old password",
                    "New password": "New password",
                    "Repeat new password": "Repeat new password",
                    "Confirm changes": "Confirm changes",
                    "at_least_1_lowercase": "At least 1 lowercase character",
                    "at_least_1_uppercase": "At least 1 uppercase character",
                    "at_least_1_digit": "At least 1 digit",
                    "from_8_to_15": "From 8 to 15 characters",
                    "match_error": "Passwords don't match!",
                    "too_much_symbols_error": "Max length - {{passwordMaxLength}} symbols",
                    "few_symbols_error": "Min length - {{passwordMinLength}} symbols",
                    "only_a_z_and_digits_error": "Only A-Z, a-z and 0-9 are allowed",
                    "digit_in_name_or_surname_error": "Should not contain digits",
                    "invalid_old_password": "Invalid old password",
                    "restore_password": "Restore password",
                    "send_code": "Send code",
                    "confirmation_sent": "Confirmation of changing password was sent to ",
                    "resend_confirmation_code": "Resend confirmation code",
                    "confirm": "Confirm",
                    "confirmation_code": "Confirmation code",
                    "wrong_confirmation_code": "Wrong confirmation code",
                    "resend_code_text": "The code has been sent again. Wait {{seconds}} seconds to receive a new one",
                    "wait_to_receive": "Wait {{seconds}} seconds to receive a new code",
                    "error_message_invoices": "PDF was sent",
                    "recipient_email_input": "Recipient email",
                    "send_pdf": "Send PDF",
                    "empty_field": "Field is empty",
                    "success_message_field": "PDF was sent",
                    "error_message_field": "PDF was not sent",
                    "invalid_date": "invalid date",
                    "new_invoice": "New invoice",
                    "name_for_ii": "Name",
                    "select_client": "Select client",
                    "date_invoice": "Date of invoice",
                    "date_payment": "Date of payment",
                    "select_item": "Select item",
                    "add_items": "Add item",
                    "amount": "Amount",
                    "add_item_to_invoice": "Add item to invoice",
                    "invoice_name": "Invoice name",
                    "client_name": "Client name:",
                    "client_phone": "Client phone:",
                    "client_email": "Client email:",
                    "total": "Total:",
                    "date_invoice_": "Date of invoice:",
                    "date_payment_": "Date of payment:",
                    "unit": "Unit",
                    "add_invoice_btn": "Add invoice",
                    "upload": "Send",
                    "download": "Download",
                    "Invalid_date": "Invalid date",
                    "insufficient_amount": "Insufficient amount in stock",
                    "zero_amount_error": "Amount can't be 0",
                    "symbols_eror_field": "Invalid email",
                    "no_invoices_text": "No invoices have been added yet...",
                    "no_clients_text": "No clients have been added yet....",
                    "no_items_text": "No items have been added yet...",
                    "logout": "Logout"
                }
            },
            uk: {
                translation: {
                    "price_per_unit_text": "Ціна за од.",
                    "basic_unit_text": "Одиниця к-сті",
                    "piece": "шт",
                    "kg": "кг",
                    "g": "г",
                    "pack": "уп",
                    "l": "л",
                    "box": "кор",
                    "ctn": "ящ",
                    "pallet": "палета",
                    "dz": "десяток",
                    "pair": "пара",
                    "ream": "пачка",
                    "bundle": "набір",
                    "barrel": "боч",
                    "gal": "гал",
                    "lb": "фунт",
                    "oz": "унц",
                    "add_item": "Додати продукт",
                    "new_item": "Новий продукт",
                    "edit_item": "Внести зміни",
                    "item_edit": "Редагування продукту",
                    "edit": "Редагувати",
                    "delete": "Видалити",
                    "item_info": "Інформація про продукт",
                    "name_of_the_item": "Назва продукту",
                    "price": "Ціна",
                    "currency": "Валюта",
                    "basic_unit": "Основна одиниця",
                    "amount_in_stock": "К-cть в наявності",
                    "barcode": "Артикул",
                    "barcode_": "Артикул: ",
                    "add_new_additional_unit": "Створити додаткову одиницю к-сті",
                    "additional_unit": "Додаткова одиниця кількості",
                    "name_of_the_additional_unit": "Назва додаткової одиниці",
                    "amount_of_the_additional_unit_in_basic": "Кількість в основній одиниці",
                    "Select currency": "Оберіть валюту",
                    "Select unit": "Оберіть основну од. к-сті.",
                    "AUD": "AUD",
                    "AZN": "AZN",
                    "BYN": "BYN",
                    "BGN": "BGN",
                    "KRW": "KRW",
                    "HKD": "HKD",
                    "DKK": "DKK",
                    "USD": "USD | Долар",
                    "EUR": "EUR | Євро",
                    "EGP": "EGP",
                    "JPY": "JPY | Єна",
                    "PLN": 'PLN | Злотий',
                    "INR": "INR",
                    "CAD": "CAD",
                    "RON": "RON | Лей",
                    "IDR": "IDR",
                    "UAH": "UAH | Грн",
                    "SGD": "SGD",
                    "KZT": "KZT",
                    "TRY": "TRY",
                    "HUF": "HUF",
                    "GBP": "GBP | Фунт",
                    "CZK": "CZK",
                    "CHF": "CHF",
                    "SEK": "SEK",
                    "CNY": "CNY | Юань",
                    "log_in": "Вхід",
                    "password": "Пароль",
                    "forgot_password": "Забули пароль?",
                    "create_an_account": "Створити профіль",
                    "surname": "Прізвище",
                    "repeat_password": "Повторити пароль",
                    "create_profile": "Зареєструватися",
                    "have_account": "У мене вже є акаунт. Увійти.",
                    "sign_up": "Реєстрація",
                    "lets_go": "Увійти",
                    "invalid_data": "Некоректні дані",
                    "incorrect_credentials": "Неправильний пароль або email",
                    "unknown_error": "Невідома помилка. Оновіть сторінку",
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
                    "range_error": "Кількість символів має бути від {{min}} до {{max}}",
                    "too_much_symbols_error": "Кількість цифр повинна не перевищувати {{passwordMaxLength}}",
                    "few_symbols_error": "Кількість цифр повинна бути не менше {{passwordMinLength}}",
                    "only_a_z_and_digits_error": "Лише латинські літери та цифри",
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
                    "Personal information": "Особиста інформація",
                    "*Name": "*Імʼя",
                    "*Surname": "*Прізвище",
                    "Company name": "Компанія",
                    "download_all_data": "Завантажити всі дані",
                    "Change password": "Змінити пароль",
                    "Old password": "Старий пароль",
                    "New password": "Новий пароль",
                    "Repeat new password": "Повторити новий пароль",
                    "Confirm changes": "Підтвердити зміни",
                    "at_least_1_lowercase": "Щонайменше 1 мала літера",
                    "at_least_1_uppercase": "Щонайменше 1 велика літера",
                    "at_least_1_digit": "Щонайменше 1 цифра",
                    "from_8_to_15": "Довжина паролю від 8 до 15 символів",
                    "match_error": "Паролі не збігаються",
                    "digit_in_name_or_surname_error": "Не повинно містити цифр",
                    "invalid_old_password": "Неправильний пароль",
                    "restore_password": "Відновлення паролю",
                    "send_code": "Отримати код",
                    "confirmation_sent": "Код було надіслано на пошту ",
                    "confirm": "Підтвердити",
                    "confirmation_code": "Код підтвердження",
                    "resend_confirmation_code": "Отримати код знову",
                    "wrong_confirmation_code": "Неправильний код підтвердження",
                    "resend_code_text": "Код було надіслано знову. Почекайте {{seconds}}с., щоб отримати новий",
                    "wait_to_receive": "Почекайте {{seconds}}с., щоб отримати новий код",
                    "add_invoice": "Додати накладну",
                    "error_message_invoices": "Успішно надіслано на пошту",
                    "recipient_email_input": "Введіть пошту отримувача",
                    "send_pdf": "Надіслати пдф",
                    "empty_field": "Поле є порожнім",
                    "success_message_field": "ПДФ успішно надіслано",
                    "error_message_field": "Не вдалося надіслати пдф",
                    // нові функції
                    "new_invoice": "Нова накладна",
                    "name_for_ii": "Назва",
                    "select_client": "Оберіть клієнта",
                    "date_invoice": "Дата створення",
                    "date_payment": "Дата оплати",
                    "select_item": "Виберіть продукт",
                    "add_items": "Додати товар",
                    "amount": "Кількість",
                    "add_item_to_invoice": "Додати товар до накладної",
                    "invoice_name": "Назва накладної",
                    "client_name": "Ім'я клієнта",
                    "client_phone": "Номер клієнта",
                    "client_email": "Email клієнта",
                    "total": "Сума:",
                    "date_invoice_": "Дата створення:",
                    "date_payment_": "Дата оплати:",
                    "unit": "Од.",
                    "add_invoice_btn": "Додати накладну",
                    "upload": "Відправити",
                    "download": "Завантажити",
                    "invalid_date": " некоректна дата",
                    "Invalid_date": "Некоректна дата",
                    "lower_date_error":
                        "Повинна бути пізніше ніж дата створення",
                    "insufficient_amount": "Товару недостатньо на складі",
                    "zero_amount_error": "К-сть не може бути 0",
                    "symbols_eror_field": "Некоректна пошта",
                    "no_invoices_text": "Ще не було додано жодної накладної...",
                    "no_clients_text": "Ще не було додано жодного клієнта...",
                    "no_items_text": "Ще не було додано жодного товару...",
                    "logout": "Вийти",
                }
            }
        }
    },

    function (err, t) {
        if (err) {
            console.error('Error initializing i18next:', err);
        }
    }
);

